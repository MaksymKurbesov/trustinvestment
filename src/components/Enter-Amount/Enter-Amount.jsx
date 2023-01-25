import styles from "./Enter-Amount.module.css";
import { Input } from "antd";

const EnterAmount = ({ stepNumber, amount, amountHandler }) => {
  return (
    <div className={styles["enter-amount"]}>
      <h3>
        <span>{stepNumber}</span> Введите сумму
      </h3>
      <Input
        placeholder={0}
        onChange={(e) => {
          if (!Number(e.target.value)) return;
          amountHandler(e.target.value);
        }}
      />
    </div>
  );
};

export { EnterAmount };
