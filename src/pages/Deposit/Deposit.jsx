import styles from "./Deposit.module.css";
import { Button, Form, Modal } from "antd";
import { Plans } from "./Plans";
import { EnterAmount } from "components/Enter-Amount/Enter-Amount";
import { ChoosePaymentMethod } from "components/Choose-Payment-Method/Choose-Payment-Method";
import { AdditionalInformation } from "components/Additional-Information/Additional-Information";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useContext, useState } from "react";
import {
  getPaymentMethod,
  getRandomArbitrary,
  hideDigitsInWallet,
  secondsToStringDays,
} from "utils/helpers";
import Lottie from "lottie-react";
import withdrawnAnimation from "../../assets/lottie-animations/withdrawn-animation2.json";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { ConfirmedWindow } from "../../components/ConfirmedWindow/ConfirmedWindow";
import AuthContext from "../../components/Auth-Provider/AuthContext";
import { PAYMENT_METHODS_MAP, PERFECT_MONEY } from "../../utils/consts";

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
  const [transactionID, setTransactionID] = useState(getRandomArbitrary());

  const [enoughMoneyError, setEnoughMoneyError] = useState(false);

  const totalIncome = tariffPlan
    ? ((amount / 100) * tariffPlan.percent * tariffPlan.days).toFixed(2)
    : 0;

  const inDayIncome = tariffPlan
    ? ((amount / 100) * tariffPlan.percent).toFixed(2)
    : 0;

  const handleConfirmOk = () => {
    setIsConfirmModalOpen(false);
    setIsConfirmedModalOpen(true);

    if (payFrom === "balance") {
      const sendData = async () => {
        const userRef = await getDoc(
          doc(collection(firestore, "users"), currentUser.email)
        );

        const userData = userRef.data();
        const userPaymentMethods = userData.paymentMethods;
        const userPaymentMethod = userPaymentMethods.find(
          (item) => item.name === PAYMENT_METHODS_MAP[paymentMethod]
        );
        let invested = userData.invested;

        console.log(userData);
        userPaymentMethod.available -= Number(amount);
        invested += Number(amount);

        updateDoc(doc(firestore, "users", currentUser.email), {
          paymentMethods: userPaymentMethods,
          invested: invested,
        });
      };
      sendData();
    }

    const sendDepositInfo = async () => {
      await updateDoc(doc(firestore, "users", currentUser.email), {
        "deposits.active": arrayUnion({
          planNumber: `#${tariffPlan.title[tariffPlan.title.length - 1]}`,
          progress: 0,
          days: tariffPlan.days,
          amount: amount,
          willReceived: totalIncome,
          date: new Date(),
          charges: 0,
          received: 0,
        }),
      });
    };

    sendDepositInfo();

    const sendTransaction = async () => {
      await addDoc(collection(firestore, "transactions"), {
        account_id: currentUser.uid,
        amount: amount,
        status: payFrom === "balance" ? "Выполнено" : "Ожидание",
        type: payFrom === "balance" ? "Вклад" : "Пополнение",
        date: new Date(),
        email: currentUser.email,
        paymentMethod: paymentMethod,
        executor: PAYMENT_METHODS_MAP[paymentMethod],
      });
    };

    sendTransaction();
  };

  const showConfirmModal = async () => {
    const enoughMoney =
      amount <=
      getPaymentMethod(
        currentUser.paymentMethods,
        PAYMENT_METHODS_MAP[paymentMethod]
      ).available;

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
          paymentMethod: PAYMENT_METHODS_MAP[paymentMethod],
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
            <Button
              type="primary"
              htmlType="submit"
              disabled={!tariffPlan || amount <= 0}
            >
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
          <Lottie
            animationData={withdrawnAnimation}
            className={styles["withdraw-animation"]}
          />
          <p>
            Сумма: <span>{amount} USD</span>
          </p>
          <p>
            Комиссия: <span>0 USD</span>
          </p>
          <p>
            Платёжная система: <span>{PAYMENT_METHODS_MAP[paymentMethod]}</span>
          </p>
          <p>
            Кошелёк:
            <span>
              {hideDigitsInWallet(currentUser.wallets[paymentMethod])}
            </span>
          </p>
          <p>
            Дата:{" "}
            <span>{secondsToStringDays(Math.floor(Date.now() / 1000))}</span>
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
        <ConfirmedWindow transactionID={transactionID} />
      </Modal>
    </div>
  );
};

export { Deposit };
