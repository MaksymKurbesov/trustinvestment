import styles from "./Withdraw.module.css";
import { Button, Form, Modal, Tooltip } from "antd";
import { ChoosePaymentMethod } from "../../components/Choose-Payment-Method/Choose-Payment-Method";
import { EnterAmount } from "../../components/Enter-Amount/Enter-Amount";
import { AdditionalInformation } from "../../components/Additional-Information/Additional-Information";
import { useContext, useState } from "react";
import Lottie from "lottie-react";
import withdrawnAnimation from "assets/lottie-animations/withdrawn-animation2.json";
import { getRandomArbitrary, hideDigitsInWallet, secondsToStringDays } from "../../utils/helpers";
import { ConfirmedWindow } from "../../components/ConfirmedWindow/ConfirmedWindow";
import { useForm } from "@formspree/react";
import { addDoc, collection } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import AuthContext from "../../components/Auth-Provider/AuthContext";
import { PAYMENT_METHODS_MAP, PERFECT_MONEY } from "../../utils/consts";

const Withdraw = () => {
  const { currentUser } = useContext(AuthContext);
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(PERFECT_MONEY);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const [state, handleSubmit] = useForm("mdovaazr");
  const [form] = Form.useForm();
  const { firestore } = useContext(FirebaseContext);

  const showConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmedOk = () => {
    setIsConfirmedModalOpen(false);
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmedCancel = () => {
    setIsConfirmedModalOpen(false);
  };

  const handleConfirmOk = () => {
    setIsConfirmModalOpen(false);
    setIsConfirmedModalOpen(true);

    const sendData = async () => {
      await addDoc(collection(firestore, "transactions"), {
        account_id: currentUser.uid,
        amount: amount,
        status: "Ожидание",
        type: "Вывод",
        date: new Date(),
        email: currentUser.email,
        executor: PAYMENT_METHODS_MAP[paymentMethod],
      });
    };
    sendData();
  };

  const onFinish = () => {
    form.validateFields().then((values) => {
      showConfirmModal();
      handleSubmit({
        ...values,
        email: currentUser.email,
      });
    });
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className={styles["withdraw"]}>
      <h2 className={"my-account-title"}>Вывод средств</h2>
      <p className={styles["withdraw-info"]}>
        Перед тем, как вывести средства на свой кошелек, убедитесь, что на странице «Настройки» вами были введены
        реквизиты для вывода на интересующую вас платежную систему. Обратите внимание что Trust Investment не
        предоставляет услуги обмена, поэтому вывод возможен только на ту платежную систему, с которой заводились
        средства на депозит.
      </p>
      <Form
        form={form}
        initialValues={{
          "payment-method": "Perfect Money",
        }}
      >
        <ChoosePaymentMethod stepNumber={"01"} paymentMethodHandler={setPaymentMethod} />
        <EnterAmount stepNumber={"02"} amountHandler={setAmount} />

        <AdditionalInformation
          infoLabel1={"Комиссия"}
          infoValue1={0}
          infoLabel2={"Будет выведено с учетом комиссии"}
          infoValue2={amount}
        />
        {}

        <Tooltip
          title={"Укажите кошелёк для вывода средств в настройках аккаунта"}
          open={currentUser.wallets[paymentMethod] === undefined || currentUser.wallets[paymentMethod] === ""}
        >
          <Button
            key={"submit"}
            onClick={onFinish}
            disabled={currentUser.wallets[paymentMethod] === undefined || currentUser.wallets[paymentMethod] === ""}
          >
            Вывести средства
          </Button>
        </Tooltip>
      </Form>
      <Modal
        open={isConfirmModalOpen}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        className={"withdraw-modal"}
        cancelText={"Отмена"}
        title={<p className={styles["title-modal"]}>Вывод средств</p>}
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
            Кошелёк: <span>{hideDigitsInWallet(currentUser.wallets[paymentMethod])}</span>
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

export { Withdraw };
