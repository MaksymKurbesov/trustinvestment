import styles from "./Deposit.module.css";
import { Button, Form } from "antd";
import { Plans } from "./Plans";
import { EnterAmount } from "components/Enter-Amount/Enter-Amount";
import { ChoosePaymentMethod } from "components/Choose-Payment-Method/Choose-Payment-Method";
import { AdditionalInformation } from "components/Additional-Information/Additional-Information";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { secondsToStringDays } from "utils/helpers";

const Deposit = () => {
  const navigate = useNavigate();
  const [tariffPlan, setTariffPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Perfect Money");
  const [amount, setAmount] = useState(0);

  const totalIncome = tariffPlan
    ? ((amount / 100) * tariffPlan.inDay * tariffPlan.days).toFixed(2)
    : 0;

  const inDayIncome = tariffPlan
    ? ((amount / 100) * tariffPlan.inDay).toFixed(2)
    : 0;

  const onFinish = () => {
    navigate("/my-account/replenishment", {
      state: {
        tariffPlan,
        paymentMethod,
        amount,
        date: secondsToStringDays(new Date()),
      },
    });
  };

  console.log(amount);
  return (
    <div className={styles["deposit"]}>
      <h2 className={"my-account-title"}>Сделать депозит</h2>
      <Form onFinish={onFinish}>
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
              stepNumber={"02"}
            />
            <Form.Item
              name={"amount"}
              // rules={[
              //   {
              //     required: true,
              //     message: "Минимальная сумма 100$",
              //   },
              // ]}
            >
              <EnterAmount stepNumber={"03"} amountHandler={setAmount} />
            </Form.Item>
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
    </div>
  );
};

export { Deposit };
