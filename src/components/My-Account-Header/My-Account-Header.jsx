import React from "react";
import styles from "./My-Account-Header.module.css";
import Layout from "antd/lib/layout";
import Logo from "assets/images/logo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "antd/lib/button";
import RusLangIcon from "../../assets/images/rus-lang.svg";
import EngLangIcon from "../../assets/images/eng-lang.svg";

const { Header: AntHeader } = Layout;

const MyAccountHeader = ({ username, balance, avatar }) => {
  const { t, i18n } = useTranslation();

  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // };

  return (
    <AntHeader className={styles["header"]}>
      <Link to={"/"}>
        <img src={Logo} width={140} alt={""} />
      </Link>
      {/*{window.innerWidth > 600 ? (*/}
      {/*  <div className={styles["choose-language"]}>*/}
      {/*    <Button onClick={() => changeLanguage("ru")} type={"primary"}>*/}
      {/*      <img src={RusLangIcon} width={25} />*/}
      {/*    </Button>*/}
      {/*    <Button onClick={() => changeLanguage("en")} type={"primary"}>*/}
      {/*      <img src={EngLangIcon} width={25} />*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  ""*/}
      {/*)}*/}
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
