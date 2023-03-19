import styles from "./Deposit.module.css";
import Form from "antd/lib/form";

import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { calculateIncomeInDay, calculateTotalIncome } from "utils/helpers";
import { useTranslation } from "react-i18next";
import { DepositSteps } from "./components/DepositSteps/DepositSteps";

const Deposit = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { userData } = useOutletContext();

  const [incomeInDay, setIncomeInDay] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const onChangeHandler = (e) => {
    setIncomeInDay(calculateIncomeInDay(form));
    setTotalIncome(calculateTotalIncome(form));
  };

  if (!userData) {
    return null;
  }

  return (
    <div className={styles["deposit"]}>
      <h2 className={"my-account-title"}>{t("make_deposit.title")}</h2>
      <Form form={form} onChange={onChangeHandler}>
        <DepositSteps form={form} incomeInDay={incomeInDay} totalIncome={totalIncome} />
      </Form>
    </div>
  );
};

export { Deposit };
