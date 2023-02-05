import { Table, Progress, Empty } from "antd";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useOutletContext } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../index";
import { parseDate } from "../../utils/helpers";
import styles from "./Deposits-Status.module.css";

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
          <Progress
            percent={((record.charges * 100) / record.days).toFixed(1)}
            showInfo={window.innerWidth > 800}
          />
          <p>
            {window.innerWidth < 800 ? "" : "Начислений"} {record.charges} /{" "}
            {record.days}
          </p>
        </div>
      );
    },
    width: window.innerWidth < 800 ? "17%" : "25%",
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
    render: (text) => <> {text ? text : 0} USD</>,
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
    render: (text) => {
      const splittedText = text.split(":");

      return (
        <>
          <div>Открытия: {splittedText[0]}</div>
          <div>Закрытия: {splittedText[1]}</div>
        </>
      );
    },
    width: window.innerWidth < 800 ? "25%" : "20%",
  },
];

const ActiveDeposits = () => {
  const windowSize = useWindowSize();
  const [currentUser] = useOutletContext();
  const { firestore } = useContext(FirebaseContext);
  const [activeDeposits, setActiveDeposits] = useState(null);

  const getActiveDeposits = async () => {
    const depositsRef = await getDoc(
      doc(collection(firestore, "users"), currentUser.email)
    );

    const depositsData = depositsRef.data().deposits.active
      ? depositsRef.data().deposits.active
      : [];
    const formattedData = depositsData.map((deposit, index) => {
      // console.log(deposit.received, "deposit.received,");

      return {
        ...deposit,
        key: index + 1,
        date: parseDate(deposit.date.seconds, deposit.days),
        received: deposit.received,
        charges: deposit.charges,
      };
    });

    return formattedData.reverse();
  };

  useEffect(() => {
    getActiveDeposits().then((data) => {
      setActiveDeposits(data);
    });
  }, [currentUser]);

  return (
    <Table
      columns={columns}
      dataSource={activeDeposits}
      pagination={{
        defaultPageSize: 5,
        pageSize: 5,
      }}
      // size={windowSize.width < 560 ? "small" : "middle"}
      locale={{ emptyText: <Empty description={"Нет данных"} /> }}
      size={windowSize.width < 800 ? "small" : "middle"}
      scroll={{ x: windowSize.width < 800 ? 700 : 900 }}
    />
  );
};
export { ActiveDeposits };
