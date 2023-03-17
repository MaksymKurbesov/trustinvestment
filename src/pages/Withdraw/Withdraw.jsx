import styles from "./Withdraw.module.css";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Modal from "antd/lib/modal";
import Tooltip from "antd/lib/tooltip";
import { ChoosePaymentMethod } from "../../components/Choose-Payment-Method/Choose-Payment-Method";
import { EnterAmount } from "../../components/Enter-Amount/Enter-Amount";
import { AdditionalInformation } from "../../components/Additional-Information/Additional-Information";
import React, { useContext, useState } from "react";
import { getRandomArbitrary } from "../../utils/helpers";
import { ConfirmedWindow } from "../../components/ConfirmedWindow/ConfirmedWindow";
import { addDoc, collection } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { PERFECT_MONEY } from "../../utils/consts";
import { useOutletContext } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Steps } from "antd";
import WithdrawnImage from "assets/images/withdrawn.svg";
import { v4 as uuidv4 } from "uuid";

import PaymentMethodIcon from "assets/images/withdrawn-icons/payment-method.svg";
import AmountIcon from "assets/images/withdrawn-icons/amount.svg";
import CommissionIcon from "assets/images/withdrawn-icons/commission.svg";
import IDIcon from "assets/images/withdrawn-icons/id.svg";
import DateIcon from "assets/images/withdrawn-icons/date.svg";
import { Waves } from "../../components/Waves/Waves";

const Withdraw = () => {
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(PERFECT_MONEY);
  const [tax, setTax] = useState(0);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { firestore } = useContext(FirebaseContext);
  const { userData } = useOutletContext();
  const auth = getAuth();
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);

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

  const next = () => {
    // setCurrent(current + 1);
    form.validateFields().then((values) => setCurrent(current + 1));
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: t("cash_in.choose_wallet"),
      content: (
        <>
          <p className={styles["withdraw-info"]}>{t("withdrawn.notation")}</p>
          <div className={styles["choose-payment-method"]}>
            <ChoosePaymentMethod stepNumber={"01"} paymentMethodHandler={setPaymentMethod} setTax={setTax} />
          </div>
        </>
      ),
    },
    {
      title: t("make_deposit.enter_amount"),
      content: (
        <>
          <EnterAmount stepNumber={"02"} amountHandler={setAmount} isWithoutValidate={true} />
          <div className={styles["additional-info"]}>
            <AdditionalInformation
              infoLabel1={t("replenishment.fee")}
              infoValue1={paymentMethod === "TRC20 Tether" ? 1 : 0}
              infoLabel2={t("withdrawn.withdrawn_fee")}
              infoValue2={paymentMethod === "TRC20 Tether" ? +amount + 1 : amount}
            />
          </div>
        </>
      ),
    },
    {
      title: t("cash_in.confirm"),
      content: (
        <>
          <ul className={styles["information-list"]}>
            <img src={WithdrawnImage} width={300} />
            <li>
              <p>
                <img src={PaymentMethodIcon} width={20} alt={""} />
                {t("make_deposit.payment_method")}:
              </p>
              {form.getFieldValue("payment-method")}
            </li>
            <li>
              <p>
                <img src={AmountIcon} width={20} alt={""} />
                {t("transactions.amount")}:
              </p>
              {form.getFieldValue("amount")}$
            </li>
            <li>
              <p>
                <img src={CommissionIcon} width={20} alt={""} />
                {t("transactions.fee")}:
              </p>
              0$
            </li>
            <li className={styles["date"]}>
              <p>
                <img src={DateIcon} width={20} alt={""} />
                {t("transactions.date")}:
              </p>
              {new Date().toLocaleDateString(i18n.language === "en" ? "en-US" : "ru", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timezone: "UTC",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </li>
            <li className={styles["transaction-number"]}>
              <p>
                <img src={IDIcon} width={20} alt={""} />
                {t("replenishment.transaction_number")}:
              </p>
              {uuidv4()}
            </li>
            <Waves cn={"withdraw-waves"} />
          </ul>
        </>
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const onDone = () => {
    form.validateFields().then(async (values) => {
      await addDoc(collection(firestore, "transactions"), {
        account_id: auth.currentUser.uid,
        amount: form.getFieldValue("amount"),
        status: "Ожидание",
        type: "Вывод",
        date: new Date(),
        email: auth.currentUser.email,
        executor: paymentMethod,
        paymentMethod: paymentMethod,
        tax: paymentMethod === "TRC20 Tether" ? 1 : 0,
      }).then(() => {
        setIsConfirmedModalOpen(true);
      });
    });
  };

  return (
    <div className={styles["withdraw"]}>
      <h2 className={"my-account-title"}>{t("withdrawn.title")}</h2>
      <Form
        form={form}
        initialValues={{
          "payment-method": "Perfect Money",
          amount: 0,
        }}
        onChange={() => setAmount(form.getFieldValue("amount"))}
      >
        <Steps
          direction={window.innerWidth < 850 ? "vertical" : "horizontal"}
          current={current}
          items={items}
          className={styles["steps"]}
        />
        <div className={styles["content"]}>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
          }}
        >
          {current > 0 && (
            <Button
              style={{
                marginRight: "8px",
              }}
              onClick={prev}
            >
              {t("transactions.previous")}
            </Button>
          )}
          {current < steps.length - 1 && (
            <Tooltip
              title={t("withdrawn.tooltip")}
              open={
                userData.paymentMethods[paymentMethod].number === undefined ||
                userData.paymentMethods[paymentMethod].number === ""
              }
            >
              <Button
                type="primary"
                onClick={next}
                disabled={
                  userData.paymentMethods[paymentMethod].number === undefined ||
                  userData.paymentMethods[paymentMethod].number === "" ||
                  userData.paymentMethods[paymentMethod].available <= 0
                }
              >
                {t("transactions.next")}
              </Button>
            </Tooltip>
          )}
          {current === steps.length - 1 && (
            <Button onClick={onDone} type="primary">
              {t("transactions.done")}
            </Button>
          )}
        </div>
      </Form>
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
