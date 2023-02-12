import { Table, Progress, Empty } from "antd";
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
          <Progress percent={+((record.charges * 100) / record.days).toFixed(1)} showInfo={window.innerWidth > 800} />
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
    render: (text, record) => {
      return (
        <CountdownTimer
          targetDate={text}
          depositID={record.key}
          receivedForDay={record.willReceived / record.days}
          nickname={record.executor}
        />
      );
    },
    width: 250,
  },
  {
    title: "Сумма вклада",
    dataIndex: "amount",
    key: "amount",
    render: (text) => <>{text.toFixed(2)} USD</>,
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
    render: (text) => <>{text.toFixed(2)} USD</>,
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
    render: (text = "", record) => {
      const date = parseDate(text, record.days);
      const splittedText = date.split(":");

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

const DepositsList = ({ deposits }) => {
  return (
    <Table
      columns={columns}
      dataSource={deposits.reverse()}
      pagination={{
        defaultPageSize: 5,
        pageSize: 5,
      }}
      locale={{ emptyText: <Empty description={"Нет данных"} /> }}
      size={window.innerWidth < 800 ? "small" : "middle"}
      scroll={{ x: 1300 }}
    />
  );
};
export { DepositsList };
