import Table from "antd/lib/table";
import Progress from "antd/lib/progress";
import Empty from "antd/lib/empty";
import { ParseDate } from "../../utils/helpers";
import styles from "./Deposits-Status.module.css";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";
import { useTranslation } from "react-i18next";

const DAY_IN_MS = 86400 * 1000;

const DepositsList = ({ deposits }) => {
  const { t, i18n } = useTranslation();

  const monthNames = [
    t("personal_area.january"),
    t("personal_area.february"),
    t("personal_area.march"),
    t("personal_area.april"),
    t("personal_area.may"),
    t("personal_area.june"),
    t("personal_area.july"),
    t("personal_area.august"),
    t("personal_area.september"),
    t("personal_area.october"),
    t("personal_area.november"),
    t("personal_area.december"),
  ];

  const columns = [
    {
      title: t("personal_area.plan"),
      dataIndex: "planNumber",
      key: "planNumber",
      render: (text) => <>{text}</>,
      align: "center",
      fixed: "left",
      width: 70,
    },
    {
      title: t("personal_area.progress"),
      dataIndex: "progress",
      key: "progress",
      render: (text, record) => {
        return (
          <div className={styles["progress"]}>
            <Progress percent={+((record.charges * 100) / record.days).toFixed(1)} showInfo={window.innerWidth > 800} />
            <p>
              {window.innerWidth < 800 ? "" : `${t("personal_area.accruals")}`} {record.charges} / {record.days}
            </p>
          </div>
        );
      },
      width: window.innerWidth < 800 ? "12%" : "25%",
    },
    {
      title: t("personal_area.next_accrual"),
      dataIndex: "nextAccrual",
      key: "nextAccrual",
      render: (text, record) => {
        return (
          <CountdownTimer
            targetDate={text}
            depositID={record.key}
            receivedForDay={record.willReceived / record.days}
            nickname={record.executor}
            paymentMethod={record.paymentMethod}
            totalDays={record.days}
            charges={record.charges}
            amount={record.amount}
          />
        );
      },
      width: 250,
    },
    {
      title: t("personal_area.deposit_amount"),
      dataIndex: "amount",
      key: "amount",
      render: (text) => <>{text.toFixed(2)} USD</>,
    },
    {
      title: t("personal_area.received"),
      dataIndex: "received",
      key: "received",
      render: (text) => <> {text.toFixed(2)} USD</>,
    },
    {
      title: t("personal_area.will_received"),
      dataIndex: "willReceived",
      key: "willReceived",
      render: (text) => <>{text.toFixed(2)} USD</>,
    },
    {
      title: t("personal_area.date"),
      dataIndex: "date",
      key: "date",
      render: (text = "", record) => {
        const date = ParseDate(text, record.days);
        const splittedText = date.split(":");

        const correctOpeningDate = `${splittedText[0].split(" ")[0]} ${monthNames[+splittedText[0].split(" ")[1]]}`;
        const correctClosingDate = `${splittedText[1].split(" ")[1]} ${monthNames[+splittedText[1].split(" ")[2]]}`;

        return (
          <>
            <div>
              {t("personal_area.open")}: {correctOpeningDate}
            </div>
            <div>
              {t("personal_area.close")}: {correctClosingDate}
            </div>
          </>
        );
      },
      width: 200,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={deposits.reverse()}
      pagination={{
        defaultPageSize: 5,
        pageSize: 5,
      }}
      locale={{ emptyText: <Empty description={`${t("personal_area.no_data")}`} /> }}
      size={window.innerWidth < 800 ? "small" : "middle"}
      scroll={{ x: 1300 }}
    />
  );
};
export { DepositsList };
