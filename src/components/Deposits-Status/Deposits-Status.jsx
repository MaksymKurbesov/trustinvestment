import { Tabs } from "antd";
import { DepositsList } from "./DepositsList";
import styles from "./Deposits-Status.module.css";
import { useEffect, useState } from "react";

const DepositsStatus = ({ deposits }) => {
  const [activeDeposits, setActiveDeposits] = useState([]);
  const [inactiveDeposits, setInactiveDeposits] = useState([]);

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
      label: `Активные депозиты`,
      children: <DepositsList deposits={activeDeposits} />,
    },
    {
      key: "2",
      label: `Завершенные депозиты`,
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
