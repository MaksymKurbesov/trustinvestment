import React from "react";
import Form from "antd/lib/form";
import { Radio } from "antd/lib";
import styles from "./Wallets.module.css";
import { WALLETS_ICONS } from "../../utils/consts";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";

const Wallets = ({ name, message }) => {
  const { t } = useTranslation();
  const { userData } = useOutletContext();

  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
          message: message,
        },
      ]}
    >
      <Radio.Group className={`${styles["wallets"]} wallets`}>
        {Object.keys(WALLETS_ICONS).map((item, index) => {
          return (
            <Radio.Button className={styles["wallet"]} value={item} key={index}>
              <img src={WALLETS_ICONS[item]} width={50} alt={""} />
              <div>
                <p>{item}</p>
                <p className={styles["balance"]}>
                  {t("balance")}: {userData.paymentMethods[item].available.toFixed(2)}$
                </p>
              </div>
            </Radio.Button>
          );
        })}
      </Radio.Group>
    </Form.Item>
  );
};

export default Wallets;
