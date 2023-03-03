import styles from "./Choose-Payment-Method.module.css";
import { PaymentMethods } from "../Payment-Methods/Payment-Methods";
import Switch from "antd/lib/switch";
import { useTranslation } from "react-i18next";

const ChoosePaymentMethod = ({ paymentMethodHandler, stepNumber, toggleButton, setPayFrom, status, setTax }) => {
  const onChange = () => {
    setPayFrom((prevState) => (prevState === "balance" ? "card" : "balance"));
  };

  const { t, i18n } = useTranslation();

  return (
    <div className={styles["choose-payment-method"]}>
      <h3>
        <span>{stepNumber}</span> {t("make_deposit.choose_payment_method")}
      </h3>
      {toggleButton ? (
        <Switch
          checkedChildren={`${t("make_deposit.from_balance")}`}
          unCheckedChildren={`${t("make_deposit.payment_method")}`}
          className={styles["switch-button"]}
          onChange={onChange}
        />
      ) : null}
      <PaymentMethods paymentMethodHandler={paymentMethodHandler} setTax={setTax} />
      <div className={`${status ? styles["active-error"] : styles["error"]}`}>
        <p>{t("make_deposit.error")}</p>
      </div>
    </div>
  );
};

export { ChoosePaymentMethod };
