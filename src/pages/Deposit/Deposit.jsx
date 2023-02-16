import styles from "./Deposit.module.css";
import { Button, Form, Modal } from "antd";
import { Plans } from "./Plans";
import { EnterAmount } from "components/Enter-Amount/Enter-Amount";
import { ChoosePaymentMethod } from "components/Choose-Payment-Method/Choose-Payment-Method";
import { AdditionalInformation } from "components/Additional-Information/Additional-Information";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getRandomArbitrary, hideDigitsInWallet, secondsToStringDays } from "utils/helpers";
import Lottie from "lottie-react";
import withdrawnAnimation from "../../assets/lottie-animations/withdrawn-animation2.json";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  increment,
  query,
  where,
  getDocs,
  setDoc,
  getCountFromServer,
} from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { ConfirmedWindow } from "../../components/ConfirmedWindow/ConfirmedWindow";
import { PERCENTAGE_BY_LVL, PERFECT_MONEY } from "../../utils/consts";
import { v4 as uuidv4 } from "uuid";

const REFERRALS_TOTAL_LEVELS = 6;

const Deposit = () => {
  const navigate = useNavigate();
  const [tariffPlan, setTariffPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(PERFECT_MONEY);
  const [amount, setAmount] = useState(0);
  const [payFrom, setPayFrom] = useState("card");
  const { firestore } = useContext(FirebaseContext);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const [enoughMoneyError, setEnoughMoneyError] = useState(false);
  const totalIncome = tariffPlan ? ((amount / 100) * tariffPlan.percent * tariffPlan.days).toFixed(2) : 0;
  const inDayIncome = tariffPlan ? ((amount / 100) * tariffPlan.percent).toFixed(2) : 0;
  const [form] = Form.useForm();

  const { userData } = useOutletContext();

  const addReferralReward = (referredBy, limit, amount) => {
    if (referredBy.trim() !== "" && --limit) {
      const getReferral = async () => {
        const q1 = query(collection(firestore, "users"), where("nickname", "==", referredBy));
        await getDocs(q1).then(async (querySnap) => {
          const referralLevel = querySnap.docs[0].data();

          await updateDoc(doc(firestore, "users", referralLevel.email), {
            referals: increment((amount / 100) * PERCENTAGE_BY_LVL[REFERRALS_TOTAL_LEVELS - limit]),
          });

          await addDoc(collection(firestore, "transactions"), {
            account_id: referralLevel.uid,
            amount: ((amount / 100) * PERCENTAGE_BY_LVL[REFERRALS_TOTAL_LEVELS - limit]).toFixed(2),
            status: "Выполнено",
            type: "Реферальные",
            date: new Date(),
            email: referralLevel.email,
            paymentMethod: paymentMethod,
            executor: userData.nickname,
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

    const sendTransaction = async () => {
      await addDoc(collection(firestore, "transactions"), {
        account_id: userData.uid,
        amount: amount,
        status: payFrom === "balance" ? "Выполнено" : "Ожидание",
        type: payFrom === "balance" ? "Вклад" : "Пополнение",
        date: new Date(),
        email: userData.email,
        paymentMethod: paymentMethod,
        executor: paymentMethod,
      });
    };

    if (payFrom === "balance") {
      const updateData = async () => {
        const q = query(collection(firestore, "users", userData.email, "deposits"));
        const queryCount = await getCountFromServer(q);

        await updateDoc(doc(firestore, "users", userData.email), {
          [`paymentMethods.${paymentMethod}.available`]: increment(-amount),
          invested: increment(amount),
        });

        // const depositsCount = queryCount.data().count > 9 ? `${queryCount.data().count}`

        const depositID = `900${queryCount.data().count}`;

        await setDoc(doc(firestore, "users", userData.email, "deposits", depositID), {
          planNumber: `#${tariffPlan.title[tariffPlan.title.length - 1]}`,
          days: tariffPlan.days,
          amount: amount,
          willReceived: +totalIncome,
          date: new Date(),
          charges: 0,
          received: 0,
          status: "active",
          paymentMethod: paymentMethod,
          deposit_id: depositID,
        });
      };

      updateData().then(async () => {
        addReferralReward(userData.referredBy, REFERRALS_TOTAL_LEVELS, amount);
      });
    }

    if (payFrom === "card") {
    }

    sendTransaction();
  };

  const showConfirmModal = async () => {
    const enoughMoney = amount <= userData.paymentMethods[paymentMethod].available;

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
    form.validateFields().then((values) => {
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
    });

    if (payFrom === "balance") {
      showConfirmModal();
    }
  };

  if (!userData) {
    return null;
  }

  return (
    <div className={styles["deposit"]}>
      <h2 className={"my-account-title"}>Сделать депозит</h2>
      <Form
        form={form}
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

            <EnterAmount stepNumber={"03"} amountHandler={setAmount} min={tariffPlan?.min} max={tariffPlan?.max} />
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
            <span>{hideDigitsInWallet(userData.paymentMethods[paymentMethod].number)}</span>
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
