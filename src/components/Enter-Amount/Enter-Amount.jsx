import styles from "./Enter-Amount.module.css";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const EnterAmount = ({ stepNumber, amountHandler, min, max, test, paymentMethod }) => {
  const [value, setValue] = useState(null);
  const { t, i18n } = useTranslation();

  return (
    <div className={`${styles["enter-amount"]} enterAmountRoot`}>
      <h3>
        <span>{stepNumber}</span> {t("make_deposit.enter_amount")}
      </h3>
      <div className={styles["input-wrapper"]}>
        <Form.Item
          name={"amount"}
          rules={[
            {
              required: true,
              message: t("make_deposit.enter_amount_warning"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (test) return Promise.resolve();

                if (!value || (getFieldValue("amount") >= min && getFieldValue("amount") <= max)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t("make_deposit.incorrect_amount")));
              },
            }),
          ]}
        >
          <Input
            prefix={"$"}
            onChange={(e) => {
              if (!e.target.value) return;
              amountHandler(Number(e.target.value));
              setValue(Number(e.target.value));
            }}
            suffix={"USD"}
          />
        </Form.Item>
        {paymentMethod === "QIWI" ? (
          <>
            <Form.Item>
              <Input prefix="₽" suffix={"RUB"} value={value ? (value * 75).toFixed(2) : ""} />
            </Form.Item>
            <p className={styles["currency"]}>Курс: 1 $ = 75 ₽</p>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export { EnterAmount };
