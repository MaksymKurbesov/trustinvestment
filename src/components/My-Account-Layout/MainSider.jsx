import React, { useEffect, useState } from "react";
import styles from "./My-Account-Layout.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import { SideMenuList } from "./SideMenuList";
import { getAuth, signOut } from "firebase/auth";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";
import RusLangIcon from "../../assets/images/rus-lang.svg";
import EngLangIcon from "../../assets/images/eng-lang.svg";
import { useTranslation } from "react-i18next";
import { Select } from "antd";

const { Sider } = Layout;

const MainSider = ({ setCollapsed, collapsed, userData }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const windowSize = useWindowSize();
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (!userData) {
      return;
    }

    const isNotReadNotifications =
      userData.notifications?.filter((notification) => notification.isRead === false) || [];

    setNotificationCount(isNotReadNotifications.length);
  }, []);

  const sideMenuList = SideMenuList(location, userData);
  const { t, i18n } = useTranslation();

  const handleChange = (value) => {
    i18n.changeLanguage(value.value);
  };

  return (
    <Sider
      className={styles["left-sider"]}
      breakpoint="xl"
      collapsible
      collapsed={collapsed}
      onCollapse={() => {
        setCollapsed((prev) => !prev);
      }}
      collapsedWidth={windowSize.width < 560 ? 0 : 90}
      trigger={<div className={styles["menu-icon"]}>{!collapsed ? <LeftOutlined /> : <RightOutlined />}</div>}
    >
      {userData.role === "ADMIN" ? <div className={styles["notification-count"]}>{notificationCount}</div> : ""}

      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        selectedKeys={[location.pathname]}
        items={sideMenuList}
        onClick={(e) => {
          setCollapsed(true);
          if (+e.key === sideMenuList.length) {
            signOutHandler();
          }
        }}
      />
      <div className={styles["choose-language"]}>
        <p>{t("cabinet_menu.language")}</p>
        <Select
          options={[
            {
              value: "ru",
              label: (
                <div className={styles["language"]}>
                  <span>{"RU"}</span> <img src={RusLangIcon} width={25} />
                </div>
              ),
            },
            {
              value: "en",
              label: (
                <div className={styles["language"]}>
                  <span>{"EN"}</span> <img src={EngLangIcon} width={25} />
                </div>
              ),
            },
          ]}
          defaultValue="ru"
          onChange={handleChange}
          labelInValue={true}
        />
      </div>
    </Sider>
  );
};

export default MainSider;
