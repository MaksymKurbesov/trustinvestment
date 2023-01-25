import { useWindowSize } from "../../hooks/useWindowSize";
import { useEffect, useState } from "react";
import { Menu } from "antd";
import styles from "./Main-Header.module.css";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const menuList = [
  {
    title: "Главная",
    link: "/",
  },
  {
    title: "Инвестиции",
    link: "investments",
  },
  {
    title: "Партнерская программа",
    link: "partners",
  },
  {
    title: "О нас",
    link: "about-us",
  },
  {
    title: "Контакты",
    link: "contacts",
  },
];

const MenuList = ({ userIsSigned }) => {
  const windowSize = useWindowSize();
  const [currentMenuList, setCurrentMenuList] = useState([]);

  useEffect(() => {
    if (windowSize.width > 800) {
      setCurrentMenuList(menuList);
    }

    if (windowSize.width < 800 && userIsSigned) {
      const menuListWithCabinet = [
        ...menuList,
        {
          title: "Кабинет",
          link: "my-account",
        },
      ];

      setCurrentMenuList(menuListWithCabinet);
    }

    if (windowSize.width < 800 && !userIsSigned) {
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
  }, [windowSize.width, userIsSigned]);

  return (
    <>
      {windowSize.width > 800 ? (
        <div className={`${styles["user-icon-wrapper"]} menuListRoot`}>
          {userIsSigned ? (
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
        }))}
        className={styles["menu"]}
        overflowedIndicator={<MenuOutlined />}
        inlineIndent={1000}
      />
    </>
  );
};

export { MenuList };
