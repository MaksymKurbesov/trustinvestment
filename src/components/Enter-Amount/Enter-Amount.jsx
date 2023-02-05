import styles from "./Enter-Amount.module.css";
import { Input, Form } from "antd";

const EnterAmount = ({ stepNumber, amountHandler }) => {
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
        ]}
      >
        <Input
          placeholder={0}
          onChange={(e) => {
            if (!e.target.value) return;
            amountHandler(Number(e.target.value));
          }}
        />
      </Form.Item>
    </div>
  );
};

export { EnterAmount };
