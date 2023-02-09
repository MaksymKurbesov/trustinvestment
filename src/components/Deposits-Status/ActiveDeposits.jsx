import { Table, Progress, Empty } from "antd";
import { useWindowSize } from "../../hooks/useWindowSize";
import { parseDate } from "../../utils/helpers";
import styles from "./Deposits-Status.module.css";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";

const columns = [
  {
    title: "План",
    dataIndex: "planNumber",
    key: "planNumber",
    render: (text) => <>{text}</>,
    align: "center",
    fixed: "left",
    width: 70,
  },
  {
    title: "Прогресс",
    dataIndex: "progress",
    key: "progress",
    render: (text, record) => {
      return (
        <div className={styles["progress"]}>
          <Progress percent={((record.charges * 100) / record.days).toFixed(1)} showInfo={window.innerWidth > 800} />
          <p>
            {window.innerWidth < 800 ? "" : "Начислений"} {record.charges} / {record.days}
          </p>
        </div>
      );
    },
    width: window.innerWidth < 800 ? "12%" : "25%",
  },
  {
    title: "След. начисление",
    dataIndex: "nextAccrual",
    key: "nextAccrual",
    render: (text) => (
      <>
        {/*{text}*/}
        <CountdownTimer targetDate={text} resetHandler={() => {}} />
      </>
    ),
    width: 250,
  },
  {
    title: "Сумма вклада",
    dataIndex: "amount",
    key: "amount",
    render: (text) => <>{text}.00 USD</>,
  },
  {
    title: "Получено",
    dataIndex: "received",
    key: "received",
    render: (text) => <> {text.toFixed(2)} USD</>,
  },
  {
    title: "Будет получено",
    dataIndex: "willReceived",
    key: "willReceived",
    render: (text) => <>{text} USD</>,
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
    render: (text = "") => {
      const splittedText = text.split(":");

      return (
        <>
          <div>Открытия: {splittedText[0]}</div>
          <div>Закрытия: {splittedText[1]}</div>
        </>
      );
    },
    width: 200,
  },
];

const ActiveDeposits = ({ activeDeposits, depositsTimers }) => {
  const windowSize = useWindowSize();

  const updateDepositsList = () => {
    if (!activeDeposits) return;

    return (
      activeDeposits
        // .sort((a, b) => a.date.seconds - b.date.seconds)
        .map((deposit, index) => {
          return {
            ...deposit,
            key: index + 1,
            date: parseDate(deposit.date, deposit.days),
            nextAccrual: depositsTimers[index],
          };
        })
    );
  };

  if (!activeDeposits) return;

  return (
    <Table
      columns={columns}
      dataSource={updateDepositsList().reverse()}
      pagination={{
        defaultPageSize: 5,
        pageSize: 5,
      }}
      // size={windowSize.width < 560 ? "small" : "middle"}
      locale={{ emptyText: <Empty description={"Нет данных"} /> }}
      size={windowSize.width < 800 ? "small" : "middle"}
      scroll={{ x: 1300 }}
    />
  );
};
export { ActiveDeposits };
