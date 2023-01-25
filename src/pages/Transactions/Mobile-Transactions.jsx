import styles from "./Mobile-Transactions.module.css";
import { List, Tag } from "antd";
import { secondsToStringDays } from "../../utils/helpers";
import { STATUS_MAPLIST } from "../../utils/consts";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const MobileTransactions = ({ transactions }) => {
  const transactionsList = [];

  transactions.docs.forEach((doc) => {
    const data = doc.data();

    transactionsList.push({
      ...data,
      key: doc.id,
      id: doc.id,
      tax: "0%",
      date: secondsToStringDays(data.date.seconds),
    });
  });

  return (
    <List
      className={"transactionsListRoot"}
      itemLayout="horizontal"
      dataSource={transactionsList}
      renderItem={(item) => {
        const tag = STATUS_MAPLIST[item.status];
        return (
          <List.Item className={styles["mobile-transaction"]}>
            <Tag color={tag.color} icon={tag.icon}>
              {item.status}
            </Tag>
            <p>{item.amount} USD</p>
            <p>{item.type}</p>
            <p>{item.date}</p>
          </List.Item>
        );
      }}
    />
  );
};

export { MobileTransactions };
