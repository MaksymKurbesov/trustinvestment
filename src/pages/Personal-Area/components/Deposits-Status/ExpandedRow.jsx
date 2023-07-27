import React from "react";
import styles from "./Deposits-Status.module.css";
import Descriptions from "antd/lib/descriptions";
import { Badge } from "antd";
import { getMonthNames, ParseDate } from "../../../../utils/helpers";
import { CountdownTimer } from "../../../../components/CountdownTimer/CountdownTimer";

const ExpandedRow = ({ record, t }) => {
  const parsedDate = ParseDate(record.date, record.days, getMonthNames(t));
  const planNumber = Number(record.planNumber.match(/\d+/)[0]);

  return (
    <div className={styles["expanded-row"]}>
      <Descriptions bordered size={"small"} layout={"horizontal"}>
        <Descriptions.Item label={<div className={styles["expanded-row-header"]}>{t("personal_area.plan")}</div>}>
          {record.planNumber}
        </Descriptions.Item>
        <Descriptions.Item label={t("personal_area.open")}>{parsedDate.open}</Descriptions.Item>
        <Descriptions.Item label={t("personal_area.close")}>{parsedDate.close}</Descriptions.Item>
        <Descriptions.Item label={t("make_deposit.payment_method")}>{record.paymentMethod}</Descriptions.Item>

        {window.innerWidth < 768 ? (
          <>
            <Descriptions.Item label={t("personal_area.received")}>{record.received.toFixed(2)}</Descriptions.Item>
            <Descriptions.Item label={t("personal_area.will_received")}>
              {record.willReceived.toFixed(2)}
            </Descriptions.Item>
          </>
        ) : (
          <></>
        )}
        <Descriptions.Item label={t("personal_area.progress")}>
          {planNumber > 3 && record.status === "completed" ? 100 : +((record.charges * 100) / record.days).toFixed(1)}%
          / 100%
        </Descriptions.Item>
        <Descriptions.Item label={t("personal_area.status")}>
          {record.status === "active" ? (
            <Badge status={"processing"} text={t("personal_area.in_process")} />
          ) : (
            <Badge status={"success"} text={t("personal_area.complete")} />
          )}
        </Descriptions.Item>
        {window.innerWidth < 576 && record.status === "active" ? (
          <Descriptions.Item label={t("personal_area.next_accrual")}>
            <CountdownTimer
              targetDate={record.nextAccrual}
              depositID={record.key}
              receivedForDay={record.willReceived / record.days}
              nickname={record.executor}
              paymentMethod={record.paymentMethod}
              totalDays={record.days}
              charges={record.charges}
              amount={record.amount}
              cn={"expanded-row-timer"}
            />
          </Descriptions.Item>
        ) : (
          ""
        )}
      </Descriptions>
      {/*<span>Дата</span>*/}
    </div>
  );
};

export { ExpandedRow };
