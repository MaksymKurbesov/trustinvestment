import React from "react";
import Button from "antd/lib/button";
import Result from "antd/lib/result";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NadezhdaPrivateKey = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Result
      status="error"
      title={"Транзакция не прошла"}
      subTitle={<p>Приватный финансовый ключ был введён неверно</p>}
      extra={[
        <Button
          onClick={() => {
            navigate("/my-account");
          }}
          key="my-account"
          type="primary"
        >
          {t("withdrawn.confirm_modal.main_button")}
        </Button>,
        <Button
          onClick={() => {
            navigate("/my-account/transactions");
          }}
          key="transactions"
        >
          {t("withdrawn.confirm_modal.transaction_button")}
        </Button>,
      ]}
    />
  );
};

export { NadezhdaPrivateKey };
