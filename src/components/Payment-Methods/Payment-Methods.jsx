import React from "react";
import { Select } from "antd";
import styles from "./Payment-Methods.module.css";

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log("search:", value);
};

const PAYMENT_METHODS = [
  {
    value: "Perfect Money",
    label: "Perfect Money",
  },
  {
    value: "Visa / Master Card",
    label: "Visa / Master Card",
  },
  {
    value: "TRC20 Tether",
    label: "TRC20 Tether",
  },
  {
    value: "Bitcoin",
    label: "Bitcoin",
  },
  {
    value: "Ethereum",
    label: "Ethereum",
  },
  {
    value: "Litecoin",
    label: "Litecoin",
  },
  {
    value: "Payeer",
    label: "Payeer",
  },
  {
    value: "Yoo Money",
    label: "Yoo Money",
  },
  {
    value: "Qiwi Wallet",
    label: "Qiwi Wallet",
  },
];

const PaymentMethods = ({ paymentMethodHandler }) => {
  return (
    <Select
      showSearch
      defaultValue="Perfect Money"
      optionFilterProp="children"
      onChange={(value) => {
        paymentMethodHandler(value);
      }}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      className={styles["payment-select"]}
      options={PAYMENT_METHODS}
    />
  );
};

export { PaymentMethods };
