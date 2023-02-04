import { useWindowSize } from "../../hooks/useWindowSize";
import { useContext, useEffect, useState } from "react";
import { Menu } from "antd";
import styles from "./Main-Header.module.css";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../Auth-Provider/AuthContext";

const menuList = [
  {
    title: "Главная",
    link: "/",
  },
  {
    title: "Партнерская программа",
    link: "/partners",
  },
  {
    title: "О нас",
    link: "/about-us",
  },
  {
    title: "FAQ",
    link: "/faq",
  },
  {
    title: "Контакты",
    link: "/contacts",
  },
];

const MenuList = () => {
  const windowSize = useWindowSize();
  const [currentMenuList, setCurrentMenuList] = useState([]);
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (windowSize.width > 800) {
      setCurrentMenuList(menuList);
    }

    if (windowSize.width < 800 && currentUser) {
      const menuListWithCabinet = [
        ...menuList,
        {
          title: "Кабинет",
          link: "my-account",
        },
      ];

      setCurrentMenuList(menuListWithCabinet);
    }

    if (windowSize.width < 800 && !currentUser) {
      const menuListWithSignup = [
        ...menuList,
        {
          title: "Регистрация",
          link: "/register",
        },
        {
          title: "Войти",
          link: "/login",
        },
      ];

      setCurrentMenuList(menuListWithSignup);
    }
  }, [windowSize.width, currentUser]);

  return (
    <>
      {windowSize.width > 800 ? (
        <div className={`${styles["user-icon-wrapper"]} menuListRoot`}>
          {currentUser ? (
            <Link to={"/my-account"}>Кабинет</Link>
          ) : (
            <>
              <Link to={"/register"}>Регистрация</Link>
              <Link to={"/login"}>Войти</Link>
            </>
          )}
        </div>
      ) : null}
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={currentMenuList.map((menuItem, index) => ({
          key: String(index + 1),
          label: (
            <Link style={{ display: "block" }} to={menuItem.link}>
              {menuItem.title}
            </Link>
          ),
          className:
            location.pathname === menuItem.link ? "active-main-header" : "",
        }))}
        className={styles["menu"]}
        overflowedIndicator={<MenuOutlined />}
        inlineIndent={1000}
      />
    </>
  );
};

export { MenuList };
