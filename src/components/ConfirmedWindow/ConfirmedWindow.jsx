import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ConfirmedWindow = ({ transactionID }) => {
  const navigate = useNavigate();

  return (
    <Result
      status="success"
      title="Транзакция прошла успешно!"
      subTitle={
        <p>
          Номер транзакции: {transactionID} <br /> Обработка операции обычно
          занимает 3-5 минут, ожидайте пожалуйста.
        </p>
      }
      extra={[
        <Button
          onClick={() => {
            navigate("/my-account");
          }}
          key="my-account"
          type="primary"
        >
          На главную
        </Button>,
        <Button
          onClick={() => {
            navigate("/my-account/transactions");
          }}
          key="transactions"
        >
          К транзакциям
        </Button>,
      ]}
    />
  );
};

export { ConfirmedWindow };
