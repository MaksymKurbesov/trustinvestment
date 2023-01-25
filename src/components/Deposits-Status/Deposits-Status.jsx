import { Tabs } from "antd";
import { ActiveDeposits } from "./ActiveDeposits";
import styles from "./Deposits-Status.module.css";

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: `Активные депозиты`,
    children: <ActiveDeposits />,
  },
  {
    key: "2",
    label: `Завершенные депозиты`,
    children: `Пусто..`,
  },
];

const DepositsStatus = () => {
  return (
    <div className={`${styles["deposits-status"]} depositRoot`}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};
export { DepositsStatus };
