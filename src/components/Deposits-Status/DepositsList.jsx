import Table from "antd/lib/table";
import Progress from "antd/lib/progress";
import Empty from "antd/lib/empty";
import { ParseDate } from "../../utils/helpers";
import styles from "./Deposits-Status.module.css";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";
import { useTranslation } from "react-i18next";

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
              showInfo={window.innerWidth > 1000}
            />
            <p>
              {window.innerWidth < 1000 ? "" : `${t("personal_area.accruals")}`} {record.charges} / {record.days}
            </p>
          </div>
        );
      },
      width: window.innerWidth < 768 ? "75%" : "25%",
    },
    {
      title: t("personal_area.next_accrual"),
      dataIndex: "nextAccrual",
      key: "nextAccrual",
      responsive: ["sm"],
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
      width: "20%",
    },
    {
      title: t("personal_area.deposit_amount"),
      dataIndex: "amount",
      responsive: ["md"],
      key: "amount",
      render: (text) => <>{text.toFixed(2)} USD</>,
      width: window.innerWidth < 1200 ? "15%" : "8%",
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
      width: window.innerWidth < 1200 ? "18%" : "8%",
    },
    {
      title: t("personal_area.date"),
      dataIndex: "date",
      responsive: ["xl"],
      key: "date",
      render: (text = "", record) => {
        const date = ParseDate(text, record.days, monthNames);

        // console.log(date, "date");
        // const splittedText = date.split(":");
        //
        // const correctOpeningDate = `${splittedText[0].split(" ")[0]} ${monthNames[+splittedText[0].split(" ")[1]]}`;
        // const correctClosingDate = `${splittedText[1].split(" ")[1]} ${monthNames[+splittedText[1].split(" ")[2]]}`;

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
      width: "20%",
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
      // scroll={{ x: window.innerWidth < 1500 && window.innerWidth > 600 ? 1200 : "max-content" }}
      expandable={{
        expandedRowRender: (record) => {
          const parsedDate = ParseDate(record.date, record.days, monthNames);

          return (
            <p
              style={{
                margin: 0,
              }}
            >
              {/*<span>Дата</span>*/}
              Open: {parsedDate.open}
              Close: {parsedDate.close}
            </p>
          );
        },
        expandRowByClick: window.innerWidth < 1200,
        showExpandColumn: window.innerWidth < 1200,
      }}
    />
  );
};
export { DepositsList };
