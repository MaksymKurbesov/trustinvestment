import { useWindowSize } from "../../hooks/useWindowSize";
import { useEffect, useState } from "react";
import { Menu } from "antd";
import styles from "./Main-Header.module.css";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

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

const MenuList = ({ userIsLoggedIn }) => {
  const windowSize = useWindowSize();
  // const [currentMenuList, setCurrentMenuList] = useState(menuList);
  const location = useLocation();
  // const { auth } = useContext(AuthContext);

  console.log(userIsLoggedIn, "userIsLoggedIn");

  return (
    <>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={menuList.map((menuItem, index) => ({
          key: String(index + 1),
          label: <Link to={menuItem.link}>{menuItem.title}</Link>,
          className: location.pathname === menuItem.link ? "active-main-header" : "",
        }))}
        className={styles["menu"]}
        overflowedIndicator={<MenuOutlined />}
        inlineIndent={1000}
      />
      <div className={`${styles["user-icon-wrapper"]} menuListRoot`}>
        {userIsLoggedIn ? (
          <Link to={"/my-account"}>Кабинет</Link>
        ) : (
          <>
            <Link to={"/register"}>Регистрация</Link>
            <Link to={"/login"}>Войти</Link>
          </>
        )}
      </div>
    </>
  );
};

export { MenuList };
