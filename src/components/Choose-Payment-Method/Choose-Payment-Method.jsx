import styles from "./Choose-Payment-Method.module.css";
import { PaymentMethods } from "../Payment-Methods/Payment-Methods";

const ChoosePaymentMethod = ({ paymentMethodHandler, stepNumber }) => {
  return (
    <div className={styles["choose-payment-method"]}>
      <h3>
        <span>{stepNumber}</span> Выберите платёжную систему
      </h3>
      <PaymentMethods paymentMethodHandler={paymentMethodHandler} />
    </div>
  );
};

export { ChoosePaymentMethod };
