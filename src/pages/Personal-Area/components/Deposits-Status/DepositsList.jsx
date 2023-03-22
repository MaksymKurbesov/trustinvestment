import Table from "antd/lib/table";
import Progress from "antd/lib/progress";
import Empty from "antd/lib/empty";
import { getMonthNames, ParseDate } from "../../../../utils/helpers";
import styles from "./Deposits-Status.module.css";
import { CountdownTimer } from "../../../../components/CountdownTimer/CountdownTimer";
import { useTranslation } from "react-i18next";
import { ExpandedRow } from "./ExpandedRow";

const getColumns = (t) => {
  const progressWidth = window.innerWidth < 576 ? "55%" : "25%";

  return [
    {
      title: t("personal_area.plan"),
      dataIndex: "planNumber",
      key: "planNumber",
      responsive: ["xl"],
      render: (text) => <>{text}</>,
      align: "center",
      width: "10%",
    },
    {
      title: t("personal_area.progress"),
      dataIndex: "progress",
      key: "progress",
      render: (text, record) => {
        return (
          <div className={styles["progress"]}>
            <Progress
              percent={+((record.charges * 100) / record.days).toFixed(1)}
              showInfo={window.innerWidth > 1200}
            />
            <p>
              {window.innerWidth < 1000 ? "" : `${t("personal_area.accruals")}`} {record.charges} / {record.days}
            </p>
          </div>
        );
      },
      width: progressWidth,
    },
    {
      title: t("personal_area.next_accrual"),
      dataIndex: "nextAccrual",
      key: "nextAccrual",
      responsive: ["sm"],
      render: (text) => {
        return <CountdownTimer targetDate={text} />;
      },
      width: "20%",
    },
    {
      title: t("personal_area.deposit_amount"),
      dataIndex: "amount",
      // responsive: ["sm"],
      key: "amount",
      render: (text) => <>{text.toFixed(2)} USD</>,
      width: window.innerWidth < 1200 ? "30%" : "8%",
    },
    {
      title: t("personal_area.received"),
      dataIndex: "received",
      responsive: ["md"],
      key: "received",
      render: (text) => <> {text.toFixed(2)} USD</>,
      width: window.innerWidth < 1200 ? "15%" : "8%",
    },
    {
      title: t("personal_area.will_received"),
      dataIndex: "willReceived",
      responsive: ["md"],
      key: "willReceived",
      render: (text) => <>{text.toFixed(2)} USD</>,
      width: window.innerWidth < 1200 ? "30%" : "8%",
    },
    {
      title: t("personal_area.date"),
      dataIndex: "date",
      responsive: ["xl"],
      key: "date",
      render: (text = "", record) => {
        const date = ParseDate(text, record.days, getMonthNames(t), true);

        return (
          <>
            <div>
              {t("personal_area.open")}: {date.open}
            </div>
            <div>
              {t("personal_area.close")}: {date.close}
            </div>
          </>
        );
      },
      width: window.innerWidth < 768 ? "65%" : "20%",
    },
  ];
};

const DepositsList = ({ deposits }) => {
  console.log(deposits, "deposits list");
  const { t, i18n } = useTranslation();

  return (
    <Table
      columns={getColumns(t)}
      dataSource={deposits.reverse()}
      pagination={{
        defaultPageSize: 5,
        pageSize: 5,
      }}
      locale={{ emptyText: <Empty description={`${t("personal_area.no_data")}`} /> }}
      size={window.innerWidth < 800 ? "small" : "middle"}
      // scroll={{ x: window.innerWidth < 1500 && window.innerWidth > 600 ? 1200 : "max-content" }}
      expandable={{
        expandedRowRender: (record) => <ExpandedRow record={record} t={t} />,
        expandRowByClick: window.innerWidth < 1200,
        showExpandColumn: window.innerWidth < 1200,
      }}
    />
  );
};
export { DepositsList };
