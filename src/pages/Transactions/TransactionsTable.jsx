import { Table, Tag, Tooltip } from "antd";
import { useWindowSize } from "../../hooks/useWindowSize";
import { CaretDownOutlined } from "@ant-design/icons";
import { normalizeDate, secondsToStringDays } from "../../utils/helpers";
import { STATUS_MAPLIST } from "../../utils/consts";
import styles from "./Transactions.module.css";
import { useEffect, useState } from "react";

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
    key: "type",
    align: "center",
    sorter: (a, b) => a.type.length - b.type.length,
    // filters: [
    //   {
    //     text: "Вклад",
    //     value: "Вклад",
    //   },
    //   {
    //     text: "Реферальные",
    //     value: "Реферальные",
    //   },
    //   {
    //     text: "Начисления",
    //     value: "Начисления",
    //   },
    //   {
    //     text: "Вывод",
    //     value: "Вывод",
    //   },
    // ],
    // onFilter: (value, record) => record.type.indexOf(value) === 0,

    // onFilter: (value, record) => record.name.indexOf(value) === 0,
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
    render: (text) => `0%`,
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
    align: "center",
    defaultSortOrder: "descend",
    sorter: (a, b) => {
      return new Date(a.date.seconds) - new Date(b.date.seconds);
    },
    render: (text) => <p>{secondsToStringDays(text.seconds)}</p>,
  },
  {
    title: "Исполнитель",
    dataIndex: "executor",
    key: "executor",
    align: "center",
  },
];

const TransactionsTable = ({ transactions, totalTransactions, showPrevious, showNext, loading }) => {
  const windowSize = useWindowSize();
  console.log(loading, "loading");

  const itemRender = (_, type, originalElement) => {
    // console.log(originalElement, "originalElement");

    if (type === "prev") {
      // showPrevious();
      return (
        <a className={styles["prev-button"]} onClick={() => showPrevious({ item: transactions[0] })}>
          Предыдущая
        </a>
      );
    }
    if (type === "next") {
      // showNext();
      return <a onClick={() => showNext({ item: transactions[transactions.length - 1] })}>Следующая</a>;
    }
    return originalElement;
  };

  const onChange = (pagination, filters, sorter, extra) => {
    // setPage(pagination.current);
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table
      tableLayout={"fixed"}
      columns={columns}
      pagination={{ total: totalTransactions, itemRender: itemRender, disabled: loading, simple: true }}
      dataSource={transactions}
      onChange={onChange}
      size={windowSize.width < 600 ? "small" : ""}
      className={"transactionsListRoot"}
      scroll={{ x: windowSize.width < 600 ? 800 : 1200 }}
    />
  );
};
export { TransactionsTable };
