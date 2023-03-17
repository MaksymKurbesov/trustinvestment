import styles from "./Deposit.module.css";
import Form from "antd/lib/form";
import Modal from "antd/lib/modal";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { calculateIncomeInDay, calculateTotalIncome, getRandomArbitrary } from "utils/helpers";

import { ConfirmedWindow } from "../../components/ConfirmedWindow/ConfirmedWindow";
import { useTranslation } from "react-i18next";
import { DepositSteps } from "./components/DepositSteps/DepositSteps";

const Deposit = () => {
  // const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { userData } = useOutletContext();

  const [incomeInDay, setIncomeInDay] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  // const handleConfirmedOk = () => {
  //   setIsConfirmedModalOpen(false);
  // };

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

      {/*<Modal*/}
      {/*  open={isConfirmedModalOpen}*/}
      {/*  onOk={handleConfirmedOk}*/}
      {/*  cancelText={t("replenishment.cancel")}*/}
      {/*  title={<p className={styles["title-modal"]}>{t("replenishment.confirm")}</p>}*/}
      {/*  footer={null}*/}
      {/*>*/}
      {/*  <ConfirmedWindow transactionID={getRandomArbitrary()} />*/}
      {/*</Modal>*/}
    </div>
  );
};

export { Deposit };
