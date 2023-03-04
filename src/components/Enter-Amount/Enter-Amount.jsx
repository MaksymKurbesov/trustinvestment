import styles from "./Enter-Amount.module.css";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";

const RUB_CURRENCY = 75;
const KZT_CURRENCY = 431;

const EnterAmount = ({ stepNumber, amountHandler, min, max, test, paymentMethod }) => {
  const [value, setValue] = useState(null);
  const { t, i18n } = useTranslation();
  const [currency, setCurrency] = useState(RUB_CURRENCY);

  console.log(currency, "currency");

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
            value={value * currency}
          />
        </Form.Item>
        {paymentMethod === "QIWI" ? (
          <>
            <Form.Item>
              <Input
                prefix={`${currency === RUB_CURRENCY ? "₽" : "₸"}`}
                // suffix={"RUB"}
                // disabled={true}
                value={value ? (value * currency).toFixed(2) : ""}
                addonAfter={
                  <Select
                    defaultValue={"RUB"}
                    options={[
                      { value: RUB_CURRENCY, label: "RUB" },
                      { value: KZT_CURRENCY, label: "KZT" },
                    ]}
                    onChange={(value) => setCurrency(value)}
                    className={styles["currency-select"]}
                  ></Select>
                }
              />
            </Form.Item>
            <p className={styles["currency"]}>{`${t("make_deposit.currency")}: 1 $ = ${
              currency === RUB_CURRENCY ? `${RUB_CURRENCY} ₽` : `${KZT_CURRENCY} ₸`
            }`}</p>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export { EnterAmount };
