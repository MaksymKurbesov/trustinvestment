import React from "react";
import styles from "./My-Account-Layout.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import { SideMenuList } from "./SideMenuList";
import { getAuth, signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";
import Button from "antd/lib/button";
import RusLangIcon from "../../assets/images/rus-lang.svg";
import EngLangIcon from "../../assets/images/eng-lang.svg";
import { useTranslation } from "react-i18next";
import { Select } from "antd";

const { Sider } = Layout;

const MainSider = ({ setCollapsed, collapsed }) => {
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

  const { t, i18n } = useTranslation();

  const handleChange = (value) => {
    console.log(value, "value");
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
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        selectedKeys={[location.pathname]}
        items={SideMenuList(location)}
        onClick={(e) => {
          setCollapsed(true);
          if (e.key === "8") {
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
          defaultValue="en"
          onChange={handleChange}
          labelInValue={true}
        />
      </div>
    </Sider>
  );
};

export default MainSider;
