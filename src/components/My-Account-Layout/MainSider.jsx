import React from "react";
import styles from "./My-Account-Layout.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { Layout, Menu } from "antd";
import { sideMenuList } from "./SideMenuList";
import { getAuth, signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";

const { Sider } = Layout;

const MainSider = ({ setCollapsed, collapsed }) => {
  const windowSize = useWindowSize();
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        console.log("success");
        navigate("/");
      })
      .catch((e) => console.log(e));
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
      collapsedWidth={windowSize.width < 560 ? 0 : 80}
      trigger={<div className={styles["menu-icon"]}>{!collapsed ? <LeftOutlined /> : <RightOutlined />}</div>}
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        selectedKeys={[location.pathname]}
        items={sideMenuList(location)}
        onClick={(e) => {
          setCollapsed(true);
          if (e.key === "7") {
            signOutHandler();
          }
        }}
      />
    </Sider>
  );
};

export default MainSider;
