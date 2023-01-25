import { Badge, Table, Tag, Tooltip } from "antd";
import { useWindowSize } from "../../hooks/useWindowSize";
import { CaretDownOutlined } from "@ant-design/icons";
import { secondsToStringDays, sortByDate } from "../../utils/helpers";
import { STATUS_MAPLIST } from "../../utils/consts";
import styles from "./Transactions.module.css";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const TransactionsTable = ({ transactions }) => {
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 850;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: windowSize.width < 575 ? 40 : 55,
      className: styles["testID"],
      align: "center",
      filterIcon: <CaretDownOutlined />,
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const tag = STATUS_MAPLIST[text];

        return (
          <Tooltip title={text}>
            {isMobile ? (
              <Badge status={tag.color} />
            ) : (
              <Tag color={tag.color} icon={tag.icon}>
                {text}
              </Tag>
            )}
          </Tooltip>
        );
      },
      align: "center",
      width: isMobile ? 66 : "initial",
    },
    {
      title: "Тип",
      dataIndex: "type",
      key: "type,",
      align: "center",
    },
    {
      title: "Сумма",
      dataIndex: "amount",
      key: "amount",
      render: (text) => `${text} USD`,
      width: windowSize.width < 650 ? 87 : "initial",
      align: windowSize.width < 650 ? "center" : "initial",
    },
    {
      title: "Комиссия",
      dataIndex: "tax",
      key: "tax",
      // align: "center",
      width: windowSize.width < 1350 ? 80 : 100,
      align: "center",
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      width: windowSize.width < 821 ? 79 : "initial",
      align: "center",
      // filtered: true,
      // defaultFilteredValue: "date",
    },
    {
      title: "Исполнитель",
      dataIndex: "executor",
      key: "executor",
      width: windowSize.width < 1350 ? 110 : "initial",
      responsive: ["md"],
      // align: "center",
    },
  ];

  if (!transactions) return;

  const transactionsList = [];

  transactions.docs.forEach((doc) => {
    const data = doc.data();

    if (!data.date) return;

    console.log(data);

    transactionsList.push({
      ...data,
      key: doc.id,
      id: doc.id.slice(0, 5),
      tax: "0%",
      date: data.date.seconds ? data.date.seconds : "",
    });

    transactionsList.sort(sortByDate);
  });

  return (
    <Table
      tableLayout={"fixed"}
      columns={columns}
      dataSource={transactionsList}
      onChange={onChange}
      size={windowSize.width < 1300 ? "small" : ""}
      className={"transactionsListRoot"}
    />
  );
};
export { TransactionsTable };
