import styles from "./Deposit.module.css";
import { useTranslation } from "react-i18next";
import Form from "antd/lib/form";
import { Button, Steps } from "antd";
import Modal from "antd/lib/modal";
import { ConfirmedWindow } from "../../components/ConfirmedWindow/ConfirmedWindow";
import { calculateIncomeInDay, calculateTotalIncome, getRandomArbitrary } from "../../utils/helpers";
import React, { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { FirebaseContext } from "../../index";
import { useOutletContext } from "react-router-dom";
import { Plans } from "./components/Plans/Plans";
import Wallets from "../../components/Wallets/Wallets";
import { EnterAmount } from "../../components/Enter-Amount/Enter-Amount";
import { AdditionalInformation } from "../../components/Additional-Information/Additional-Information";
import PaymentMethodIcon from "../../assets/images/withdrawn-icons/payment-method.svg";
import AmountIcon from "../../assets/images/withdrawn-icons/amount.svg";
import DayIncomeIcon from "../../assets/images/withdrawn-icons/day-income.png";
import TotalIncomeIcon from "../../assets/images/withdrawn-icons/total-income.png";
import DateIcon from "../../assets/images/withdrawn-icons/date.svg";
import IDIcon from "../../assets/images/withdrawn-icons/id.svg";
import { v4 as uuidv4 } from "uuid";
import { Waves } from "../../components/Waves/Waves";
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { PERCENTAGE_BY_LVL } from "../../utils/consts";

const REFERRALS_TOTAL_LEVELS = 6;

const Deposit = () => {
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const auth = getAuth();
  const { firestore } = useContext(FirebaseContext);
  const { userData } = useOutletContext();
  const [incomeInDay, setIncomeInDay] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleConfirmedOk = () => {
    setIsConfirmedModalOpen(false);
  };

  const dateSettings = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timezone: "UTC",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const steps = [
    {
      title: t("make_deposit.choose_plan"),
      content: <Plans />,
    },
    {
      title: t("make_deposit.choose_payment_method"),
      content: <Wallets name={"payment-method"} message={t("cash_in.choose_wallet_warning")} />,
    },
    {
      title: t("make_deposit.enter_amount"),
      content: (
        <div className={styles["enter-amount"]}>
          <EnterAmount form={form} />
          <AdditionalInformation
            infoLabel1={form.getFieldValue("plan")?.plan > 3 ? "" : t("make_deposit.income_per_day")}
            infoValue1={incomeInDay}
            infoLabel2={`${t("make_deposit.total_income")}`}
            infoValue2={totalIncome}
          />
        </div>
      ),
    },
    {
      title: t("make_deposit.confirm"),
      content: (
        <>
          <div className={styles["information"]}>
            <ul className={styles["information-list"]}>
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
              {form.getFieldValue("plan")?.plan <= 3 ? (
                <li>
                  <p>
                    <img src={DayIncomeIcon} width={20} alt={""} />
                    <span>{t("make_deposit.income_per_day")}:</span>
                  </p>
                  {calculateIncomeInDay(form)}$
                </li>
              ) : (
                ""
              )}

              <li>
                <p>
                  <img src={TotalIncomeIcon} width={20} alt={""} />
                  <span>{t("make_deposit.total_income")}:</span>
                </p>
                {totalIncome}$
              </li>
              <li className={styles["date"]}>
                <p>
                  <img src={DateIcon} width={20} alt={""} />
                  {t("transactions.date")}:
                </p>
                {new Date().toLocaleDateString(i18n.language === "en" ? "en-US" : "ru", dateSettings)}
              </li>
              <li className={styles["transaction-number"]}>
                <p>
                  <img src={IDIcon} width={20} alt={""} />
                  {t("replenishment.transaction_number")}:
                </p>
                {uuidv4()}
              </li>
              <Waves cn={"deposit-waves"} />
            </ul>
          </div>
        </>
      ),
    },
  ];

  const onChangeHandler = () => {
    const selectedPlan = form.getFieldValue("plan").plan;

    setIncomeInDay(calculateIncomeInDay(form));
    setTotalIncome(calculateTotalIncome(form));

    if (selectedPlan > 3) {
      setTotalIncome(calculateIncomeInDay(form));
    }
  };

  const next = () => {
    form.validateFields().then((values) => setCurrent(current + 1));
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const addReferralReward = (referredBy, limit, amount) => {
    if (!referredBy) return;

    if (referredBy.trim() !== "" && --limit) {
      const getReferral = async () => {
        const q1 = query(collection(firestore, "users"), where("nickname", "==", referredBy));
        await getDocs(q1).then(async (querySnap) => {
          const referralLevel = querySnap.docs[0].data();
          const referralAmount = (amount / 100) * PERCENTAGE_BY_LVL[REFERRALS_TOTAL_LEVELS - limit];

          await updateDoc(doc(firestore, "users", referralLevel.email), {
            referals: increment(referralAmount),
            [`paymentMethods.${form.getFieldValue("payment-method")}.referrals`]: increment(referralAmount),
            [`paymentMethods.${form.getFieldValue("payment-method")}.available`]: increment(referralAmount),
          });

          await addDoc(collection(firestore, "transactions"), {
            account_id: referralLevel.uid,
            amount: ((amount / 100) * PERCENTAGE_BY_LVL[REFERRALS_TOTAL_LEVELS - limit]).toFixed(2),
            status: "Выполнено",
            type: "Реферальные",
            date: new Date(),
            email: referralLevel.email,
            paymentMethod: form.getFieldValue("payment-method"),
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

  const onDone = async () => {
    form.validateFields().then(async (values) => {
      setLoading(true);

      const q = query(collection(firestore, "users", auth.currentUser.email, "deposits"));
      const queryCount = await getCountFromServer(q);
      const depositPlan = form.getFieldValue("plan");
      const depositAmount = form.getFieldValue("amount");
      const depositPaymentMethod = form.getFieldValue("payment-method");
      const depositID =
        queryCount.data().count >= 9 ? `90${queryCount.data().count + 1}` : `900${queryCount.data().count + 1}`;

      await addDoc(collection(firestore, "transactions"), {
        account_id: auth.currentUser.uid,
        amount: depositAmount,
        status: "Выполнено",
        type: "Вклад",
        date: new Date(),
        email: auth.currentUser.email,
        paymentMethod: depositPaymentMethod,
        executor: depositPaymentMethod,
      });

      await updateDoc(doc(firestore, "users", auth.currentUser.email), {
        [`paymentMethods.${depositPaymentMethod}.available`]: increment(-depositAmount),
        invested: increment(depositAmount),
      });

      await setDoc(doc(firestore, "users", auth.currentUser.email, "deposits", depositID), {
        planNumber: depositPlan.title,
        days: depositPlan.days,
        amount: +depositAmount,
        willReceived: totalIncome,
        date: new Date(),
        charges: 0,
        received: 0,
        status: "active",
        paymentMethod: depositPaymentMethod,
        deposit_id: depositID,
      }).then(() => {
        setLoading(false);
        setIsConfirmedModalOpen(true);
        addReferralReward(userData.referredBy, REFERRALS_TOTAL_LEVELS, form.getFieldValue("amount"));
      });
    });
  };

  return (
    <div className={styles["deposit"]}>
      <h2 className={"my-account-title"}>{t("make_deposit.title")}</h2>
      <Form form={form} onChange={onChangeHandler}>
        <Steps
          current={current}
          items={items}
          className={styles["deposit-steps"]}
          direction={window.innerWidth < 850 ? "vertical" : "horizontal"}
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
            <Button type="primary" onClick={onDone} disabled={loading}>
              {t("transactions.done")}
            </Button>
          )}
        </div>

        <Modal
          open={isConfirmedModalOpen}
          onOk={handleConfirmedOk}
          cancelText={t("replenishment.cancel")}
          title={<p className={styles["title-modal"]}>{t("replenishment.confirm")}</p>}
          footer={null}
        >
          <ConfirmedWindow transactionID={getRandomArbitrary()} />
        </Modal>
      </Form>
    </div>
  );
};

export { Deposit };
