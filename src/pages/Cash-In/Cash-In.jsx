import React, { useContext, useState } from "react";
import styles from "./Cash-In.module.css";
import { Trans, useTranslation } from "react-i18next";
import { Badge, Button, Select, Steps } from "antd";
import { WALLETS, WALLETS_ICONS } from "utils/consts";
import { EnterAmount } from "../../components/Enter-Amount/Enter-Amount";
import { AdditionalInformation } from "../../components/Additional-Information/Additional-Information";
import Form from "antd/lib/form";
import { Radio } from "antd/lib";
import Input from "antd/lib/input";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FirebaseContext } from "../../index";
import Modal from "antd/lib/modal";
import { ConfirmedWindow } from "../../components/ConfirmedWindow/ConfirmedWindow";
import { getRandomArbitrary } from "../../utils/helpers";

import PaymentMethodIcon from "assets/images/withdrawn-icons/payment-method.svg";
import AmountIcon from "assets/images/withdrawn-icons/amount.svg";
import CommissionIcon from "assets/images/withdrawn-icons/commission.svg";
import DateIcon from "assets/images/withdrawn-icons/date.svg";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useOutletContext } from "react-router-dom";

const RUB_CURRENCY = 75;
const KZT_CURRENCY = 431;

const CashIn = () => {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const auth = getAuth();
  const { firestore } = useContext(FirebaseContext);
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const [currency, setCurrency] = useState(RUB_CURRENCY);
  const [currencyAmount, setCurrencyAmount] = useState(0);
  const { userData } = useOutletContext();

  const next = () => {
    // setCurrent(current + 1);
    form.validateFields().then((values) => setCurrent(current + 1));
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const handleConfirmedOk = () => {
    setIsConfirmedModalOpen(false);
  };

  const steps = [
    {
      title: t("cash_in.choose_wallet"),
      content: (
        <Form.Item
          name={"wallet"}
          rules={[
            {
              required: true,
              message: t("cash_in.choose_wallet_warning"),
            },
          ]}
        >
          <Radio.Group className={styles["wallets"]}>
            {Object.keys(WALLETS_ICONS).map((item, index) => {
              return (
                <Radio.Button value={item} key={index} className={styles["wallet"]}>
                  <img src={WALLETS_ICONS[item]} width={50} />
                  <div>
                    <p>{item}</p>
                    <p className={styles["balance"]}>
                      {t("balance")}: {userData.paymentMethods[item].available.toFixed(2)}$
                    </p>
                  </div>
                </Radio.Button>
              );
            })}
          </Radio.Group>
        </Form.Item>
      ),
    },
    {
      title: t("make_deposit.enter_amount"),
      content: (
        <div className={styles["enter-amount"]}>
          <EnterAmount form={form} isWithoutValidate={true} cashInOperation={true} />
          {form.getFieldValue("wallet") === "QIWI" ? (
            <>
              <Form.Item>
                <Input
                  prefix={`${currency === RUB_CURRENCY ? "₽" : "₸"}`}
                  // suffix={"RUB"}
                  // disabled={true}
                  value={currencyAmount * currency || 0}
                  addonAfter={
                    <Select
                      defaultValue={"RUB"}
                      options={[
                        { value: RUB_CURRENCY, label: "RUB" },
                        { value: KZT_CURRENCY, label: "KZT" },
                      ]}
                      onChange={(value) => setCurrency(value)}
                      className={styles["currency-select"]}
                    ></Select>
                  }
                />
              </Form.Item>
              <p className={styles["currency"]}>{`${t("make_deposit.currency")}: 1 $ = ${
                currency === RUB_CURRENCY ? `${RUB_CURRENCY} ₽` : `${KZT_CURRENCY} ₸`
              }`}</p>
            </>
          ) : (
            ""
          )}
          <AdditionalInformation
            infoLabel1={t("replenishment.fee")}
            infoValue1={"0"}
            // infoLabel2={`${t("make_deposit.total_income")}`}
            // infoValue2={totalIncome}
          />
        </div>
      ),
    },
    {
      title: t("cash_in.confirm"),
      content: (
        <div className={styles["confirmation"]}>
          <div className={styles["information"]}>
            <div className={styles["disclaimer"]}>
              <p>{t("cash_in.disclaimer")}</p>
            </div>
            <ul className={styles["information-list"]}>
              <li>
                <p>
                  <img src={PaymentMethodIcon} width={20} alt={""} />
                  {t("make_deposit.payment_method")}:
                </p>{" "}
                {form.getFieldValue("wallet")}
              </li>
              <li>
                <p>
                  <img src={AmountIcon} width={20} alt={""} />
                  {t("transactions.amount")}:
                </p>{" "}
                {form.getFieldValue("amount")}$
              </li>
              <li>
                <p>
                  <img src={CommissionIcon} width={20} alt={""} />
                  {t("transactions.fee")}:
                </p>{" "}
                0$
              </li>
              <li className={styles["date"]}>
                <p>
                  <img src={DateIcon} width={20} alt={""} />
                  {t("transactions.date")}:
                </p>{" "}
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
              <li>
                <p className={styles["status"]}>{t("transactions.status")}:</p>{" "}
                <Badge status={"processing"} text={t("cash_in.status")} />
              </li>
            </ul>

            <div className={styles["instruction"]}>
              <h2>{t("cash_in.instruction.title")}</h2>
              <p>
                {t("cash_in.instruction.1")} <CheckCircleOutlined />
              </p>
              <p>
                {t("cash_in.instruction.2")} <CheckCircleOutlined />
              </p>

              <div>
                <Trans
                  i18nKey={"cash_in.instruction.3"}
                  values={{ wallet: WALLETS[form.getFieldValue("wallet")] }}
                  components={{ span: <span /> }}
                ></Trans>
                <div className={styles["wallet-number"]}>
                  <span>{WALLETS[form.getFieldValue("wallet")]}</span>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(WALLETS[form.getFieldValue("wallet")]);
                    }}
                    className={styles["copy-button"]}
                  >
                    {t("replenishment.copy")}
                  </Button>
                </div>
              </div>
              <p>{t("cash_in.instruction.4")}</p>
            </div>
            <Form.Item
              name={"code-input"}
              rules={[
                {
                  required: true,
                  message: t("cash_in.enter_code_warning"),
                },
              ]}
            >
              <Input className={styles["code-input"]} placeholder={t("cash_in.enter_code")} />
            </Form.Item>
          </div>
        </div>
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const onDone = () => {
    form.validateFields().then(async () => {
      await addDoc(collection(firestore, "transactions"), {
        account_id: auth.currentUser.uid,
        amount: +form.getFieldValue("amount"),
        status: "Ожидание",
        type: "Пополнение",
        date: new Date(),
        email: auth.currentUser.email,
        paymentMethod: form.getFieldValue("wallet"),
        executor: form.getFieldValue("wallet"),
        _status: "running",
      }).then(() => {
        setIsConfirmedModalOpen(true);
      });
    });
  };

  return (
    <>
      <Form
        className={"cash-in-form"}
        initialValues={{ amount: 0 }}
        form={form}
        onChange={(e) => {
          setCurrencyAmount(e.target.value);
        }}
      >
        <div className={styles["cash-in"]}>
          <h2 className={"my-account-title"}>{t("cash_in.title")}</h2>
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
              <Button type="primary" onClick={next}>
                {t("transactions.next")}
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button onClick={onDone} type="primary">
                {t("transactions.done")}
              </Button>
            )}
          </div>
        </div>
      </Form>
      <Modal
        open={isConfirmedModalOpen}
        onOk={handleConfirmedOk}
        cancelText={t("replenishment.cancel")}
        title={<p className={styles["title-modal"]}>{t("replenishment.confirm")}</p>}
        footer={null}
      >
        <ConfirmedWindow transactionID={getRandomArbitrary()} />
      </Modal>
    </>
  );
};

export { CashIn };
