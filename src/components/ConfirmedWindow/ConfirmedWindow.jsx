import React from "react";
import Button from "antd/lib/button";
import Result from "antd/lib/result";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ConfirmedWindow = ({ transactionID }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <Result
      status="success"
      title={t("withdrawn.confirm_modal.title")}
      subTitle={<p>{t("withdrawn.confirm_modal.subtitle")}</p>}
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

export { ConfirmedWindow };
