import { Table, Tag, Tooltip } from "antd";
import { useWindowSize } from "../../hooks/useWindowSize";
import { CaretDownOutlined } from "@ant-design/icons";
import { normalizeDate, sortByDate } from "../../utils/helpers";
import { STATUS_MAPLIST } from "../../utils/consts";
import styles from "./Transactions.module.css";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const TransactionsTable = ({ transactions }) => {
  const windowSize = useWindowSize();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 65,
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
            <Tag color={tag.color} icon={tag.icon}>
              {text}
            </Tag>
          </Tooltip>
        );
      },
      align: "center",
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
      align: "center",
    },
    {
      title: "Комиссия",
      dataIndex: "tax",
      key: "tax",
      width: 100,
      align: "center",
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Исполнитель",
      dataIndex: "executor",
      key: "executor",
      align: "center",
    },
  ];

  if (!transactions.docs) return;

  const transactionsList = transactions.docs.map((doc) => {
    const data = doc.data();

    if (!data.date) return;

    return {
      ...data,
      key: doc.id,
      id: doc.id.slice(0, 5),
      tax: "0%",
      date: data.date.seconds,
    };
  });

  transactionsList.sort(sortByDate);

  return (
    <Table
      tableLayout={"fixed"}
      columns={columns}
      dataSource={normalizeDate(transactionsList)}
      onChange={onChange}
      size={windowSize.width < 600 ? "small" : ""}
      className={"transactionsListRoot"}
      // mobileBreakpoint={768}
      scroll={{ x: windowSize.width < 600 ? 800 : 1200 }}
    />
  );
};
export { TransactionsTable };
