import React from "react";
import { Select, Form } from "antd";
import styles from "./Payment-Methods.module.css";
import {
  BITCOIN,
  BNB,
  ETHEREUM,
  PERFECT_MONEY,
  POLKADOT,
  QIWI,
  SOLANA,
  TRC20_TETHER,
} from "../../utils/consts";

const createPaymentMethodsOptions = (wallets) => {
  const paymentList = [];
  wallets.forEach((wallet) => {
    paymentList.push({
      value: `${wallet} ${wallet.slice(0, 5)}`,
      label: wallet,
    });
  });
};

const PAYMENT_METHODS = [
  {
    value: PERFECT_MONEY,
    label: "Perfect Money",
  },
  {
    value: TRC20_TETHER,
    label: "TRC20 Tether",
  },
  {
    value: BITCOIN,
    label: "Bitcoin",
  },
  {
    value: ETHEREUM,
    label: "Ethereum",
  },
  {
    value: SOLANA,
    label: "Solana",
  },
  {
    value: POLKADOT,
    label: "PolkaDOT",
  },
  {
    value: BNB,
    label: "BNB",
  },
];

const PaymentMethods = ({ paymentMethodHandler }) => {
  return (
    <Form.Item name={"payment-method"}>
      <Select
        showSearch
        optionFilterProp="children"
        onChange={(value) => {
          paymentMethodHandler(value);
        }}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        className={`${styles["payment-select"]} payment-select`}
        options={PAYMENT_METHODS}
      />
    </Form.Item>
  );
};

export { PaymentMethods };
