import React from "react";
import styles from "./My-Account-Header.module.css";
import Layout from "antd/lib/layout";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Header: AntHeader } = Layout;

const MyAccountHeader = ({ username, balance, avatar }) => {
  const { t } = useTranslation();

  return (
    <AntHeader className={styles["header"]}>
      <Link to={"/"}>
        <img src={Logo} width={110} alt={""} />
      </Link>
      <div className={styles["user-info"]}>
        {avatar ? <img src={avatar} style={{ borderRadius: "50%" }} width={70} height={"100%"} /> : ""}

        <div>
          <p className={styles["user-info__name"]}>{username}</p>
          <p className={styles["user-info__balance"]}>
            {t("balance")}: {balance.toFixed(2)}$
          </p>
        </div>
      </div>
    </AntHeader>
  );
};

export default MyAccountHeader;
