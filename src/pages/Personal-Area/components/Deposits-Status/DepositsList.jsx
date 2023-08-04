import Table from "antd/lib/table";
import Progress from "antd/lib/progress";
import Empty from "antd/lib/empty";
import { addDays, getMonthNames, ParseDate } from "../../../../utils/helpers";
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
        const planNumber = Number(record.planNumber.match(/\d+/)[0]);

        return (
          <div className={styles["progress"]}>
            <Progress
              percent={
                planNumber > 3 && record.status === "completed"
                  ? 100
                  : +((record.charges * 100) / record.days).toFixed(1)
              }
              showInfo={window.innerWidth > 1200}
            />
            <p>
              {window.innerWidth > 1000 ? (
                <span>
                  {t("personal_area.accruals")}{" "}
                  {planNumber > 3 ? `${record.charges} / 1` : `${record.charges} / ${record.days}`}
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
        );
      },
      width: progressWidth,
    },
    {
      title: t("personal_area.next_accrual"),
      dataIndex: "lastAccrual",
      key: "lastAccrual",
      responsive: ["sm"],
      render: (text, record) => {
        const planNumber = Number(record.planNumber.match(/\d+/)[0]);
        let time;

        if (planNumber > 3) {
          time = addDays(text.seconds * 1000, record.days);
        } else {
          time = addDays(text.seconds * 1000, 1);
        }

        if (record.status !== "active") {
          time = 0;
        }

        return <CountdownTimer targetDate={new Date(time).getTime()} />;
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
  const { t } = useTranslation();

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
      expandable={{
        expandedRowRender: (record) => <ExpandedRow record={record} t={t} />,
        expandRowByClick: window.innerWidth < 1200,
        showExpandColumn: window.innerWidth < 1200,
      }}
    />
  );
};
export { DepositsList };
