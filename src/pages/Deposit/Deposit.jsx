import styles from "./Deposit.module.css";
import { Button, Form, Modal } from "antd";
import { Plans } from "./Plans";
import { EnterAmount } from "components/Enter-Amount/Enter-Amount";
import { ChoosePaymentMethod } from "components/Choose-Payment-Method/Choose-Payment-Method";
import { AdditionalInformation } from "components/Additional-Information/Additional-Information";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getRandomArbitrary, hideDigitsInWallet, secondsToStringDays } from "utils/helpers";
import Lottie from "lottie-react";
import withdrawnAnimation from "../../assets/lottie-animations/withdrawn-animation2.json";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  arrayUnion,
  increment,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { ConfirmedWindow } from "../../components/ConfirmedWindow/ConfirmedWindow";
import AuthContext from "../../components/Auth-Provider/AuthContext";
import { PERCENTAGE_BY_LVL, PERFECT_MONEY } from "../../utils/consts";

const REFERRALS_TOTAL_LEVELS = 6;

const Deposit = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [tariffPlan, setTariffPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(PERFECT_MONEY);
  const [amount, setAmount] = useState(0);
  const [payFrom, setPayFrom] = useState("card");
  const { firestore } = useContext(FirebaseContext);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const [referralsList, setReferralsList] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  });
  const [enoughMoneyError, setEnoughMoneyError] = useState(false);
  const totalIncome = tariffPlan ? ((amount / 100) * tariffPlan.percent * tariffPlan.days).toFixed(2) : 0;
  const inDayIncome = tariffPlan ? ((amount / 100) * tariffPlan.percent).toFixed(2) : 0;

  const addReferralReward = (referredBy, limit, amount) => {
    if (referredBy.trim() !== "" && --limit) {
      const getReferral = async () => {
        const q1 = query(collection(firestore, "users"), where("nickname", "==", referredBy));
        await getDocs(q1).then(async (querySnap) => {
          const referralLevel = querySnap.docs[0].data();

          await updateDoc(doc(firestore, "users", referralLevel.email), {
            referals: increment((amount / 100) * PERCENTAGE_BY_LVL[REFERRALS_TOTAL_LEVELS - limit]),
          });

          return addReferralReward(referralLevel.referredBy, limit, amount);
        });
      };

      getReferral();
    } else {
      return null;
    }
  };

  const handleConfirmOk = () => {
    setIsConfirmModalOpen(false);
    setIsConfirmedModalOpen(true);

    if (payFrom === "balance") {
      const updateData = async () => {
        await updateDoc(doc(firestore, "users", currentUser.email), {
          [`paymentMethods.${paymentMethod}.available`]: increment(-amount),
          invested: increment(amount),
          "deposits.active": arrayUnion({
            planNumber: `#${tariffPlan.title[tariffPlan.title.length - 1]}`,
            progress: 0,
            days: tariffPlan.days,
            amount: amount,
            willReceived: +totalIncome,
            date: new Date(),
            charges: 0,
            received: 0,
          }),
        });
      };

      updateData().then(() => {
        addReferralReward(currentUser.referredBy, REFERRALS_TOTAL_LEVELS, amount);
      });
    }

    if (payFrom === "card") {
    }

    const sendTransaction = async () => {
      await addDoc(collection(firestore, "transactions"), {
        account_id: currentUser.uid,
        amount: amount,
        status: payFrom === "balance" ? "Выполнено" : "Ожидание",
        type: payFrom === "balance" ? "Вклад" : "Пополнение",
        date: new Date(),
        email: currentUser.email,
        paymentMethod: paymentMethod,
        executor: paymentMethod,
      });
    };

    sendTransaction();
  };

  useEffect(() => {
    if (currentUser.referredBy.trim() === "") return;

    // const getReferralsFromReferral = async () => {
    //   const q = query(collection(firestore, "users"), where("nickname", "==", currentUser.referredBy));
    //   await getDocs(q).then((doc) => {
    //     console.log(doc.docs[0].data().referredTo, "doc.docs[0].data().referredTo");
    //     getReferrals(doc.docs[0].data().referredTo);
    //   });
    // };

    // getReferralsFromReferral();
  }, []);

  const showConfirmModal = async () => {
    const enoughMoney = amount <= currentUser.paymentMethods[paymentMethod].available;

    if (enoughMoney) {
      setIsConfirmModalOpen(true);
    } else {
      setEnoughMoneyError(true);
    }
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmedOk = () => {
    setIsConfirmedModalOpen(false);
  };

  const handleConfirmedCancel = () => {
    setIsConfirmedModalOpen(false);
  };

  const onFinish = () => {
    if (payFrom === "card") {
      navigate("/my-account/replenishment", {
        state: {
          tariffPlan,
          paymentMethod: paymentMethod,
          amount,
          date: secondsToStringDays(Math.floor(Date.now() / 1000)),
        },
      });
    }

    if (payFrom === "balance") {
      showConfirmModal();
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className={styles["deposit"]}>
      <h2 className={"my-account-title"}>Сделать депозит</h2>
      <Form
        onFinish={onFinish}
        initialValues={{
          "payment-method": "Perfect Money",
        }}
      >
        <h3>
          <span>01</span> Выберите план
        </h3>
        <Form.Item>
          <Plans tariffHandler={setTariffPlan} />
        </Form.Item>

        <div>
          <div className={styles["payment-details"]}>
            <ChoosePaymentMethod
              paymentMethodHandler={setPaymentMethod}
              setPayFrom={setPayFrom}
              stepNumber={"02"}
              toggleButton
              status={enoughMoneyError}
            />

            <EnterAmount stepNumber={"03"} amountHandler={setAmount} />
            <AdditionalInformation
              infoLabel1={"Доход в день"}
              infoValue1={inDayIncome}
              infoLabel2={"Общий доход"}
              infoValue2={totalIncome}
            />
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={!tariffPlan || amount <= 0}>
              Сделать депозит
            </Button>
          </Form.Item>
        </div>
      </Form>

      <Modal
        open={isConfirmModalOpen}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        className={"withdraw-modal"}
        cancelText={"Отмена"}
        title={<p className={styles["title-modal"]}>Сделать депозит</p>}
      >
        <div className={styles["modal-content"]}>
          <Lottie animationData={withdrawnAnimation} className={styles["withdraw-animation"]} />
          <p>
            Сумма: <span>{amount} USD</span>
          </p>
          <p>
            Комиссия: <span>0 USD</span>
          </p>
          <p>
            Платёжная система: <span>{paymentMethod}</span>
          </p>
          <p>
            Кошелёк:
            <span>{hideDigitsInWallet(currentUser.paymentMethods[paymentMethod].number)}</span>
          </p>
          <p>
            Дата: <span>{secondsToStringDays(Math.floor(Date.now() / 1000))}</span>
          </p>
        </div>
      </Modal>
      <Modal
        open={isConfirmedModalOpen}
        onOk={handleConfirmedOk}
        onCancel={handleConfirmedCancel}
        cancelText={"Отмена"}
        title={<p className={styles["title-modal"]}>Подтверждение вывода</p>}
        footer={null}
      >
        <ConfirmedWindow transactionID={getRandomArbitrary()} />
      </Modal>
    </div>
  );
};

export { Deposit };
