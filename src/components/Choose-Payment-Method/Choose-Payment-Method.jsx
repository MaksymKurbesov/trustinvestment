import styles from "./Choose-Payment-Method.module.css";
import { PaymentMethods } from "../Payment-Methods/Payment-Methods";
import { Switch } from "antd";

const ChoosePaymentMethod = ({ paymentMethodHandler, stepNumber, toggleButton, setPayFrom, status }) => {
  const onChange = () => {
    setPayFrom((prevState) => (prevState === "balance" ? "card" : "balance"));
  };

  return (
    <div className={styles["choose-payment-method"]}>
      <h3>
        <span>{stepNumber}</span> Выберите платёжную систему
      </h3>
      {toggleButton ? (
        <Switch
          checkedChildren={"С баланса"}
          unCheckedChildren={"Платёжная система"}
          className={styles["switch-button"]}
          onChange={onChange}
        />
      ) : null}
      <PaymentMethods paymentMethodHandler={paymentMethodHandler} />
      <div className={`${status ? styles["active-error"] : styles["error"]}`}>
        <p>Недостаточно средст. Пополните пожалуйста кошелёк.</p>
      </div>
    </div>
  );
};

export { ChoosePaymentMethod };
