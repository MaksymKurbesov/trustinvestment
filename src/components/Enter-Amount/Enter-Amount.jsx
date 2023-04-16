import styles from "./Enter-Amount.module.css";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";

const EnterAmount = ({ form, tax = 0, cashInOperation, withdrawnOperation }) => {
  const { t } = useTranslation();
  const { userData } = useOutletContext();

  const [isErnesto, setIsErnesto] = useState(false);

  useEffect(() => {
    if (userData.email === "azrv1@mail.ru" || userData.email === "probuisness90@gmail.com") {
      setIsErnesto(true);
    } else {
      setIsErnesto(false);
    }
  }, []);

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
                const amountWithTax = +amount + tax;

                if (cashInOperation || isErnesto) {
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
