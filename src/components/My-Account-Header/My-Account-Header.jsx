import React from "react";
import styles from "./My-Account-Header.module.css";
import { Layout } from "antd";
import Logo from "assets/images/logo.png";
import { Link } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";

const { Header: AntHeader } = Layout;

const MyAccountHeader = ({ username, balance, siderCollapsed }) => {
  const windowSize = useWindowSize();

  return (
    <AntHeader className={styles["header"]}>
      {windowSize.width < 560 ? (
        <Link to={"/"} className={styles["logotype"]}>
          <img src={Logo} width={140} alt={""} />
        </Link>
      ) : (
        ""
      )}
      <div className={styles["user-info"]}>
        <p className={styles["user-info__name"]}>{username}</p>
        <p className={styles["user-info__balance"]}>Баланс: {balance}$</p>
      </div>
    </AntHeader>
  );
};

export default MyAccountHeader;
