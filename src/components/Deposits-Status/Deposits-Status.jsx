import { Empty, Progress, Table, Tabs } from "antd";
import { ActiveDeposits } from "./ActiveDeposits";
import styles from "./Deposits-Status.module.css";
import { useWindowSize } from "../../hooks/useWindowSize";

const onChange = (key) => {
  // console.log(key);
};

const columns = [
  {
    title: "План",
    dataIndex: "planNumber",
    key: "planNumber",
    render: (text) => <>{text}</>,
    align: "center",
  },
  {
    title: "Прогресс",
    dataIndex: "progress",
    key: "progress",
    render: (text) => <Progress percent={text} showInfo={window.innerWidth > 560} />,
    width: "30%",
    align: "center",
  },
  {
    title: "Сумма вклада",
    dataIndex: "amount",
    key: "amount",
    render: (text) => <>{text}.00 USD</>,
    align: "center",
  },
  {
    title: "Будет получено",
    dataIndex: "willReceived",
    key: "willReceived",
    render: (text) => <>{text} USD</>,
    align: "center",
  },
  {
    title: "Дата закрытия",
    dataIndex: "date",
    key: "date",
    render: (text) => <>{text}</>,
    align: "center",
  },
];

const DepositsStatus = ({ activeDeposits, depositsTimers }) => {
  const windowSize = useWindowSize();

  const items = [
    {
      key: "1",
      label: `Активные депозиты`,
      children: <ActiveDeposits activeDeposits={activeDeposits} depositsTimers={depositsTimers} />,
    },
    {
      key: "2",
      label: `Завершенные депозиты`,
      children: (
        <Table
          columns={columns}
          dataSource={[]}
          pagination={{
            defaultPageSize: 5,
            pageSize: 5,
          }}
          size={windowSize.width < 560 ? "small" : "middle"}
          locale={{ emptyText: <Empty description={"Нет данных"} /> }}
          scroll={{ x: 1300 }}
        />
      ),
    },
  ];

  return (
    <div className={`${styles["deposits-status"]} depositRoot`}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};
export { DepositsStatus };
