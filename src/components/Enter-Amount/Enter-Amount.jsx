import styles from "./Enter-Amount.module.css";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { useOutletContext } from "react-router-dom";

const EnterAmount = ({ form, isWithoutValidate }) => {
  const { t } = useTranslation();
  const { userData } = useOutletContext();

  let availableMoneyOnWallet;

  if (!isWithoutValidate) {
    availableMoneyOnWallet = userData.paymentMethods[form.getFieldValue("payment-method")]?.available;
  }

  return (
    <div className={`${styles["enter-amount"]} enterAmountRoot`}>
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
                if (isWithoutValidate) return Promise.resolve();

                const amount = getFieldValue("amount");
                const plan = getFieldValue("plan");

                if (availableMoneyOnWallet < amount) {
                  return Promise.reject(new Error(t("make_deposit.error")));
                }

                if (!value || (amount >= plan.min && amount <= plan.max)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t("make_deposit.incorrect_amount")));
              },
            }),
          ]}
        >
          <Input prefix={"$"} suffix={"USD"} />
        </Form.Item>
      </div>
    </div>
  );
};

export { EnterAmount };
