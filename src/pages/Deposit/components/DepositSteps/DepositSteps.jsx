import { Button, Steps } from "antd";
import React, { useContext, useState } from "react";
import Form from "antd/lib/form";
import { Plans } from "../Plans/Plans";
import { useTranslation } from "react-i18next";
import { EnterAmount } from "components/Enter-Amount/Enter-Amount";
import { AdditionalInformation } from "components/Additional-Information/Additional-Information";
import styles from "./DepositSteps.module.css";
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
import { getAuth } from "firebase/auth";
import { FirebaseContext } from "index";
import { calculateIncomeInDay, getRandomArbitrary } from "utils/helpers";
import { PERCENTAGE_BY_LVL, WALLETS_ICONS } from "utils/consts";
import { useOutletContext } from "react-router-dom";
import Modal from "antd/lib/modal";
import { ConfirmedWindow } from "components/ConfirmedWindow/ConfirmedWindow";
import { Radio } from "antd/lib";
import PaymentMethodIcon from "assets/images/withdrawn-icons/payment-method.svg";
import AmountIcon from "assets/images/withdrawn-icons/amount.svg";
import DateIcon from "assets/images/withdrawn-icons/date.svg";
import IDIcon from "assets/images/withdrawn-icons/id.svg";
import TotalIncomeIcon from "assets/images/withdrawn-icons/total-income.png";
import DayIncomeIcon from "assets/images/withdrawn-icons/day-income.png";
import { v4 as uuidv4 } from "uuid";
import { Waves } from "components/Waves/Waves";

const REFERRALS_TOTAL_LEVELS = 6;

const DepositSteps = ({ form, incomeInDay, totalIncome }) => {
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const auth = getAuth();
  const { firestore } = useContext(FirebaseContext);
  const { userData } = useOutletContext();

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
      content: (
        <Form.Item
          name={"payment-method"}
          rules={[
            {
              required: true,
              message: t("cash_in.choose_wallet_warning"),
            },
          ]}
        >
          <Radio.Group className={styles["wallets"]}>
            <>
              {Object.keys(WALLETS_ICONS).map((item, index) => {
                return (
                  <Radio.Button value={item} key={index} className={styles["wallet"]}>
                    <img src={WALLETS_ICONS[item]} width={50} />
                    <div>
                      <p>{item}</p>
                      <p className={styles["balance"]}>
                        {t("balance")}: {userData.paymentMethods[item].available}$
                      </p>
                    </div>
                  </Radio.Button>
                );
              })}
            </>
          </Radio.Group>
        </Form.Item>
      ),
    },
    {
      title: t("make_deposit.enter_amount"),
      content: (
        <div className={styles["enter-amount"]}>
          <EnterAmount form={form} />
          <AdditionalInformation
            infoLabel1={`${t("make_deposit.income_per_day")}`}
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
              <li>
                <p>
                  <img src={DayIncomeIcon} width={20} alt={""} />
                  <span>{t("make_deposit.income_per_day")}:</span>
                </p>
                {calculateIncomeInDay(form)}$
              </li>
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
      const q = query(collection(firestore, "users", auth.currentUser.email, "deposits"));
      const queryCount = await getCountFromServer(q);
      const depositPlan = form.getFieldValue("plan");
      const depositAmount = form.getFieldValue("amount");
      const depositPaymentMethod = form.getFieldValue("payment-method");
      const depositID =
        queryCount.data().count >= 9 ? `90${queryCount.data().count + 1}` : `900${queryCount.data().count + 1}`;

      console.log(depositID, "depositID");

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
        setIsConfirmedModalOpen(true);
        addReferralReward(userData.referredBy, REFERRALS_TOTAL_LEVELS, form.getFieldValue("amount"));
      });
    });
  };

  return (
    <>
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
          <Button type="primary" onClick={onDone}>
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
    </>
  );
};
export { DepositSteps };
