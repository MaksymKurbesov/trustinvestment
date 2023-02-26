import Tabs from "antd/lib/tabs";
import { DepositsList } from "./DepositsList";
import styles from "./Deposits-Status.module.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const DepositsStatus = ({ deposits }) => {
  const [activeDeposits, setActiveDeposits] = useState([]);
  const [inactiveDeposits, setInactiveDeposits] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const activeArr = [];
    const inactiveArr = [];

    deposits.forEach((deposit) => {
      if (deposit.status === "active") {
        activeArr.push(deposit);
      } else {
        inactiveArr.push(deposit);
      }

      setActiveDeposits(activeArr);
      setInactiveDeposits(inactiveArr);
    });
  }, [deposits]);

  const items = [
    {
      key: "1",
      label: t("personal_area.active_deposits"),
      children: <DepositsList deposits={activeDeposits} />,
    },
    {
      key: "2",
      label: t("personal_area.completed_deposits"),
      children: <DepositsList deposits={inactiveDeposits} />,
    },
  ];

  return (
    <div className={`${styles["deposits-status"]} depositRoot`}>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};
export { DepositsStatus };
