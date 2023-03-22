import styles from "./Enter-Amount.module.css";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { useOutletContext } from "react-router-dom";

const EnterAmount = ({ form, tax, cashInOperation, withdrawnOperation }) => {
  const { t } = useTranslation();
  const { userData } = useOutletContext();

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
                const amount = getFieldValue("amount");
                const plan = getFieldValue("plan");
                const availableOnWallet = userData.paymentMethods[form.getFieldValue("payment-method")]?.available;
                const currentTax = tax ? tax : 0;
                const amountWithTax = +amount + currentTax;

                if (cashInOperation) {
                  return Promise.resolve();
                }

                if (availableOnWallet < amountWithTax) {
                  return Promise.reject(new Error(t("make_deposit.error")));
                }

                if (withdrawnOperation) {
                  return Promise.resolve();
                }

                if (amount >= plan.min && amount <= plan.max) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(new Error(t("make_deposit.incorrect_amount")));
                }
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
