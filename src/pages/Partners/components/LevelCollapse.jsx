import React, { useContext } from "react";
import Collapse from "antd/lib/collapse";
import Table from "antd/lib/table";
import styles from "../Partners.module.css";
import AuthContext from "../../../components/Auth-Provider/AuthContext";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
const { Panel } = Collapse;

const panelStyle = {
  marginBottom: 24,
  background: "#1677ff",
  borderRadius: 20,
  border: "none",
  color: "white",
};

const Header = ({ level, referrals, activeReferrals, totalInvested }) => {
  const { t } = useTranslation();

  return (
    <div className={styles["level-header"]}>
      <p>
        {level} {t("partner_page.level")}
      </p>
      <p>
        {t("partner_page.referrals")}: <span>{referrals}</span>
      </p>
      <p>
        {t("partner_page.active_referrals")}: <span>{activeReferrals}</span>
      </p>
      <p>
        {t("partner_page.total_invested")}: <span>{totalInvested} USD</span>
      </p>
    </div>
  );
};

const getActiveReferrals = (referrals) => {
  if (Array.isArray(referrals)) {
    return referrals.filter((referral) => referral.invested > 0).length;
  }
};

const getTotalInvested = (referrals) => {
  if (Array.isArray(referrals)) {
    return referrals.reduce((accum, value) => {
      return accum + value.invested;
    }, 0);
  }
};

const LevelCollapse = ({ referralsList }) => {
  const { userData } = useOutletContext();
  const { t } = useTranslation();

  const levelColumns = [
    {
      title: t("partner_page.nickname"),
      dataIndex: "nickname",
      key: "nickname",
      width: "20%",
      align: "center",
    },
    {
      title: t("partner_page.referrals"),
      dataIndex: "numberOfReferrals",
      key: "referrals",
      width: "13%",
      align: "center",
    },
    {
      title: t("partner_page.date_registration"),
      dataIndex: "registrationDate",
      key: "registrationDate",
      width: "20%",
      render: (text = "") => `${new Date(text.seconds * 1000).toLocaleDateString("ru-RU")}`,
      align: "center",
    },
    {
      title: t("partner_page.invested"),
      dataIndex: "invested",
      key: "invested",
      align: "center",
      width: "20%",
      render: (text) => `${text} USD`,
    },
  ];

  return (
    <Collapse bordered={false} className={styles["levels-list"]}>
      <Panel
        style={panelStyle}
        header={Header({
          level: 1,
          referrals: userData.referredTo["1"]?.length ? userData.referredTo["1"].length : 0,
          activeReferrals: getActiveReferrals(referralsList["1"]),
          totalInvested: getTotalInvested(referralsList["1"]),
        })}
        key="1"
      >
        <div className={styles["level-wrapper"]}>
          <Table scroll={{ x: 700 }} columns={levelColumns} dataSource={referralsList["1"]} />
        </div>
      </Panel>
      <Panel
        style={panelStyle}
        header={Header({
          level: 2,
          referrals: userData.referredTo["2"]?.length ? userData.referredTo["2"].length : 0,
          activeReferrals: getActiveReferrals(referralsList["2"]),
          totalInvested: getTotalInvested(referralsList["2"]),
        })}
        key="2"
      >
        <div className={styles["level-wrapper"]}>
          <Table scroll={{ x: 700 }} columns={levelColumns} dataSource={referralsList["2"]} />
        </div>
      </Panel>
      <Panel
        style={panelStyle}
        header={Header({
          level: 3,
          referrals: userData.referredTo["3"]?.length ? userData.referredTo["3"].length : 0,
          activeReferrals: getActiveReferrals(referralsList["3"]),
          totalInvested: getTotalInvested(referralsList["3"]),
        })}
        key="3"
      >
        <div className={styles["level-wrapper"]}>
          <Table scroll={{ x: 700 }} columns={levelColumns} dataSource={referralsList["3"]} />
        </div>
      </Panel>
      <Panel
        style={panelStyle}
        header={Header({
          level: 4,
          referrals: userData.referredTo["4"]?.length ? userData.referredTo["4"].length : 0,
          activeReferrals: getActiveReferrals(referralsList["4"]),
          totalInvested: getTotalInvested(referralsList["4"]),
        })}
        key="4"
      >
        <div className={styles["level-wrapper"]}>
          <Table scroll={{ x: 700 }} columns={levelColumns} dataSource={referralsList["4"]} />
        </div>
      </Panel>
      <Panel
        style={panelStyle}
        header={Header({
          level: 5,
          referrals: userData.referredTo["5"]?.length ? userData.referredTo["5"].length : 0,
          activeReferrals: getActiveReferrals(referralsList["5"]),
          totalInvested: getTotalInvested(referralsList["5"]),
        })}
        key="5"
      >
        <div className={styles["level-wrapper"]}>
          <Table scroll={{ x: 700 }} columns={levelColumns} dataSource={referralsList["5"]} />
        </div>
      </Panel>
    </Collapse>
  );
};

export { LevelCollapse };
