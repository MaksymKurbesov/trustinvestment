import styles from "./Enter-Amount.module.css";
import { Input, Form, InputNumber } from "antd";

const EnterAmount = ({ stepNumber, amountHandler, min, max, test }) => {
  return (
    <div className={styles["enter-amount"]}>
      <h3>
        <span>{stepNumber}</span> Введите сумму
      </h3>
      <Form.Item
        name={"amount"}
        rules={[
          {
            required: true,
            message: "Введите пожалуйста сумму",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (test) return Promise.resolve();

              if (!value || (getFieldValue("amount") >= min && getFieldValue("amount") <= max)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Некорректная сумма"));
            },
          }),
        ]}
      >
        <Input
          onChange={(e) => {
            if (!e.target.value) return;
            console.log(e.target.value);
            amountHandler(Number(e.target.value));
          }}
        />
      </Form.Item>
    </div>
  );
};

export { EnterAmount };
