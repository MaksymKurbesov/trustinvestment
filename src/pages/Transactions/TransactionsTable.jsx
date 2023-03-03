import Table from "antd/lib/table";
import Tag from "antd/lib/tag";
import Tooltip from "antd/lib/tooltip";
import { useWindowSize } from "../../hooks/useWindowSize";
import { CaretDownOutlined } from "@ant-design/icons";
import { secondsToStringDays } from "../../utils/helpers";
import { STATUS_MAPLIST } from "../../utils/consts";
import styles from "./Transactions.module.css";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useEffect } from "react";

const TransactionsTable = ({ transactions, totalTransactions, showPrevious, showNext, loading }) => {
  const windowSize = useWindowSize();
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();

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
      title: t("transactions.status"),
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const tag = STATUS_MAPLIST[text];

        return (
          <Tooltip title={text}>
            <Tag color={tag.color} icon={tag.icon}>
              {i18n.language === "ru" ? `${text}` : `${t(`transactions.${text}`)}`}
            </Tag>
          </Tooltip>
        );
      },
      align: "center",
    },
    {
      title: t("transactions.type"),
      dataIndex: "type",
      key: "type",
      align: "center",
      sorter: (a, b) => a.type.length - b.type.length,
      render: (text) => {
        if (i18n.language === "ru") {
          return text;
        } else {
          return `${t(`transactions.${text}`)}`;
        }
      },
    },
    {
      title: t("transactions.amount"),
      dataIndex: "amount",
      key: "amount",
      render: (text) => `${text} USD`,
      align: "center",
    },
    {
      title: t("transactions.fee"),
      dataIndex: "tax",
      key: "tax",
      width: 100,
      align: "center",
      render: (text) => (text === 1 ? `${text} USD` : "0%"),
    },
    {
      title: t("transactions.date"),
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
      title: t("transactions.executor"),
      dataIndex: "executor",
      key: "executor",
      align: "center",
    },
  ];

  useEffect(() => {
    queryClient.invalidateQueries("transactions");
  }, []);

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <a className={styles["prev-button"]} onClick={() => showPrevious({ item: transactions[0] })}>
          {t("transactions.previous")}
        </a>
      );
    }
    if (type === "next") {
      return <a onClick={() => showNext({ item: transactions[transactions?.length - 1] })}>{t("transactions.next")}</a>;
    }
    return originalElement;
  };

  console.log(transactions, "transactions from table");

  return (
    <Table
      tableLayout={"fixed"}
      columns={columns}
      pagination={{ total: totalTransactions, itemRender: itemRender, disabled: loading, simple: true }}
      dataSource={transactions}
      // onChange={onChange}
      size={windowSize.width < 600 ? "small" : ""}
      className={"transactionsListRoot"}
      scroll={{ x: windowSize.width < 600 ? 800 : 1200 }}
    />
  );
};
export { TransactionsTable };
