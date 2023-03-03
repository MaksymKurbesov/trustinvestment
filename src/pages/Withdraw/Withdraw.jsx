import styles from "./Withdraw.module.css";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Modal from "antd/lib/modal";
import Tooltip from "antd/lib/tooltip";
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
import { PERFECT_MONEY } from "../../utils/consts";
import { useOutletContext } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";

//

const Withdraw = () => {
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(PERFECT_MONEY);
  const [tax, setTax] = useState(0);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const [state, handleSubmit] = useForm("mdovaazr");
  const [form] = Form.useForm();
  const { firestore } = useContext(FirebaseContext);
  const { userData } = useOutletContext();
  const auth = getAuth();
  const { t, i18n } = useTranslation();

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
        account_id: auth.currentUser.uid,
        amount: amount,
        status: "Ожидание",
        type: "Вывод",
        date: new Date(),
        email: auth.currentUser.email,
        executor: paymentMethod,
        paymentMethod: paymentMethod,
        tax: paymentMethod === "TRC20 Tether" ? 1 : 0,
      });
    };
    sendData();
  };

  const onFinish = () => {
    form.validateFields().then((values) => {
      showConfirmModal();
      handleSubmit({
        ...values,
        email: auth.currentUser.email,
      });
    });
  };

  return (
    <div className={styles["withdraw"]}>
      <h2 className={"my-account-title"}>{t("withdrawn.title")}</h2>
      <p className={styles["withdraw-info"]}>{t("withdrawn.notation")}</p>
      <Form
        form={form}
        initialValues={{
          "payment-method": "Perfect Money",
        }}
      >
        <ChoosePaymentMethod stepNumber={"01"} paymentMethodHandler={setPaymentMethod} setTax={setTax} />
        <EnterAmount stepNumber={"02"} amountHandler={setAmount} test={true} />

        <AdditionalInformation
          infoLabel1={t("replenishment.fee")}
          infoValue1={paymentMethod === "TRC20 Tether" ? 1 : 0}
          infoLabel2={t("withdrawn.withdrawn_fee")}
          infoValue2={paymentMethod === "TRC20 Tether" ? amount + 1 : amount}
        />
        {}

        <Tooltip
          title={t("withdrawn.tooltip")}
          open={
            userData.paymentMethods[paymentMethod].number === undefined ||
            userData.paymentMethods[paymentMethod].number === ""
          }
        >
          <Button
            key={"submit"}
            onClick={onFinish}
            disabled={
              userData.paymentMethods[paymentMethod].number === undefined ||
              userData.paymentMethods[paymentMethod].number === ""
            }
          >
            {t("withdrawn.button")}
          </Button>
        </Tooltip>
      </Form>
      <Modal
        open={isConfirmModalOpen}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        className={"withdraw-modal"}
        cancelText={t("replenishment.cancel")}
        title={<p className={styles["title-modal"]}>{t("withdrawn.title")}</p>}
      >
        <div className={styles["modal-content"]}>
          <Lottie animationData={withdrawnAnimation} className={styles["withdraw-animation"]} />
          <p>
            {t("replenishment.amount")}: <span>{amount} USD</span>
          </p>
          <p>
            {t("replenishment.fee")}: <span>{tax} USD</span>
          </p>
          <p>
            {t("replenishment.payment_method")}: <span>{paymentMethod}</span>
          </p>
          <p>
            {t("replenishment.wallet")}:{" "}
            <span>{hideDigitsInWallet(userData.paymentMethods[paymentMethod].number)}</span>
          </p>
          <p>
            {t("replenishment.date")}: <span>{secondsToStringDays(Math.floor(Date.now() / 1000))}</span>
          </p>
        </div>
      </Modal>
      <Modal
        open={isConfirmedModalOpen}
        onOk={handleConfirmedOk}
        onCancel={handleConfirmedCancel}
        cancelText={t("replenishment.cancel")}
        title={<p className={styles["title-modal"]}>{t("withdrawn.confirm_withdrawn")}</p>}
        footer={null}
      >
        <ConfirmedWindow transactionID={getRandomArbitrary()} />
      </Modal>
    </div>
  );
};

export { Withdraw };
