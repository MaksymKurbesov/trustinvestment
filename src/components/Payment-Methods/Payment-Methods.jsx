import React from "react";
import Select from "antd/lib/select";
import Form from "antd/lib/form";
import styles from "./Payment-Methods.module.css";
import { BITCOIN, BNB, ETHEREUM, PERFECT_MONEY, POLKADOT, QIWI, SOLANA, TRC20_TETHER } from "../../utils/consts";

const PAYMENT_METHODS = [
  {
    value: PERFECT_MONEY,
    label: "Perfect Money",
  },
  {
    value: QIWI,
    label: "QIWI",
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

const PaymentMethods = ({ paymentMethodHandler, setTax }) => {
  return (
    <Form.Item name={"payment-method"}>
      <Select
        showSearch
        optionFilterProp="children"
        onChange={(value) => {
          if (value === "TRC20 Tether") {
            setTax(1);
          }
          console.log(value, "value");
          paymentMethodHandler(value);
        }}
        filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
        className={`${styles["payment-select"]} payment-select`}
        options={PAYMENT_METHODS}
      />
    </Form.Item>
  );
};

export { PaymentMethods };
