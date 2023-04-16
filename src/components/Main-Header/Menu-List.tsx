import { useWindowSize } from "../../hooks/useWindowSize";
import { useEffect, useState } from "react";
import Button from "antd/lib/button";
import Menu from "antd/lib/menu";
import styles from "./Main-Header.module.css";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import RusLangIcon from "../../assets/images/rus-lang.svg";
import EngLangIcon from "../../assets/images/eng-lang.svg";

import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";

const MenuList = ({ userIsLoggedIn }) => {
  const { t, i18n } = useTranslation();
  const windowSize = useWindowSize();
  const location = useLocation();
  const auth = getAuth();

  const menuList = [
    {
      title: `${t("menu.home")}`,
      link: "/",
    },
    {
      title: `${t("menu.affilate_program")}`,
      link: "/partners",
    },
    {
      title: `${t("menu.about_us")}`,
      link: "/about-us",
    },
    {
      title: `${t("menu.faq")}`,
      link: "/faq",
    },
    {
      title: `${t("menu.contacts")}`,
      link: "/contacts",
    },
  ];

  const [currentMenuList, setCurrentMenuList] = useState(menuList);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    if (windowSize.width > 1000) {
      setCurrentMenuList(menuList);
    }

    if (windowSize.width < 1000 && auth.currentUser) {
      const menuListWithCabinet = [
        ...menuList,
        {
          title: `${t("menu.cabinet")}`,
          link: "my-account",
        },
      ];

      setCurrentMenuList(menuListWithCabinet);
    }

    if (windowSize.width < 1000 && !auth.currentUser) {
      const menuListWithSignup = [
        ...menuList,
        {
          title: `${t("menu.registration")}`,
          link: "/register",
        },
        {
          title: `${t("menu.sign_in")}`,
          link: "/login",
        },
      ];

      setCurrentMenuList(menuListWithSignup);
    }
  }, [windowSize.width, auth.currentUser, t]);

  return (
    <>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={currentMenuList.map((menuItem, index) => ({
          key: String(index + 1),
          label: <Link to={menuItem.link}>{menuItem.title}</Link>,
          className: `${location.pathname === menuItem.link ? "active-main-header" : ""} `,
        }))}
        className={`${styles["menu"]} ${location.pathname === "/" ? styles["index-page"] : ""}`}
        overflowedIndicator={<MenuOutlined />}
        inlineIndent={600}
        // inlineCollpased={true}
      />
      <div className={styles["choose-language"]}>
        <Button onClick={() => changeLanguage("ru")} type={"primary"}>
          <img src={RusLangIcon} width={25} />
        </Button>
        <Button onClick={() => changeLanguage("en")} type={"primary"}>
          <img src={EngLangIcon} width={25} />
        </Button>
      </div>
      {windowSize.width > 1000 ? (
        <div className={`${styles["user-icon-wrapper"]} menuListRoot`}>
          {userIsLoggedIn ? (
            <Link to={"/my-account"}>{t("menu.cabinet")}</Link>
          ) : (
            <>
              <Link className={styles["register-button"]} to={"/register"}>
                {t("menu.registration")}
              </Link>
              <Link className={styles["login-button"]} to={"/login"}>
                {t("menu.sign_in")}
              </Link>
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export { MenuList };
