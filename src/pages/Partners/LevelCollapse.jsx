import React, { useContext, useEffect } from "react";
import { Collapse, Table } from "antd";
import styles from "./Partners.module.css";
import AuthContext from "../../components/Auth-Provider/AuthContext";
const { Panel } = Collapse;

const panelStyle = {
  marginBottom: 24,
  background: "#1677ff",
  borderRadius: 20,
  border: "none",
  color: "white",
};

const levelColumns = [
  {
    title: "Ник",
    dataIndex: "nickname",
    key: "nickname",
    width: "20%",
    align: "center",
  },
  {
    title: "Рефералов",
    dataIndex: "numberOfReferrals",
    key: "referrals",
    width: "13%",
    align: "center",
  },
  {
    title: "Дата регистрация",
    dataIndex: "registrationDate",
    key: "registrationDate",
    width: "20%",
    render: (text = "") => `${new Date(text.seconds * 1000).toLocaleDateString("ru-RU")}`,
    align: "center",
  },
  {
    title: "Инвестировано",
    dataIndex: "invested",
    key: "invested",
    align: "center",
    width: "20%",
    render: (text) => `${text} USD`,
  },
];

const Header = ({ level, referrals, activeReferrals, totalInvested }) => {
  return (
    <div className={styles["level-header"]}>
      <p>{level} уровень</p>
      <p>
        Рефералов: <span>{referrals}</span>
      </p>
      <p>
        Активных: <span>{activeReferrals}</span>
      </p>
      <p>
        Всего инвестировано: <span>{totalInvested} USD</span>
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
  const { currentUser } = useContext(AuthContext);
  const onChange = (key) => {
    // console.log(key);
  };

  return (
    <Collapse onChange={onChange} bordered={false} className={styles["levels-list"]}>
      <Panel
        style={panelStyle}
        header={Header({
          level: 1,
          referrals: currentUser.referredTo["1"]?.length ? currentUser.referredTo["1"].length : 0,
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
          referrals: currentUser.referredTo["2"]?.length ? currentUser.referredTo["2"].length : 0,
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
          referrals: currentUser.referredTo["3"]?.length ? currentUser.referredTo["3"].length : 0,
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
          referrals: currentUser.referredTo["4"]?.length ? currentUser.referredTo["4"].length : 0,
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
          referrals: currentUser.referredTo["5"]?.length ? currentUser.referredTo["5"].length : 0,
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
