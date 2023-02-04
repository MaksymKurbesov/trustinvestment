import { getAuth, signOut } from "firebase/auth";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import styles from "./My-Account-Layout.module.css";
import { Layout, Menu } from "antd";
import MyAccountHeader from "../My-Account-Header/My-Account-Header";
import { useWindowSize } from "../../hooks/useWindowSize";
import Logo from "../../assets/images/logo.png";
import { useContext, useEffect, useState } from "react";
import { MENU_LIST } from "../../pages/Personal-Area/MENU_LIST";
import { calculateUserBalance } from "../../utils/helpers";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import AuthContext from "../Auth-Provider/AuthContext";

const { Content, Sider } = Layout;

const MyAccountLayout = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const windowSize = useWindowSize();
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const sideMenuList = MENU_LIST.map((item, index) => ({
    key: String(index + 1),
    label: <NavLink to={item.link}>{item.title}</NavLink>,
    icon: item.icon,
    title: "",
    className: location.pathname === item.link ? styles["active"] : "",
  }));

  const signOutHandler = async () => {
    await signOut(auth);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className={styles["my-account"]}>
      <Layout className={styles["my-account-layout"]} hasSider>
        <Sider
          className={styles["left-sider"]}
          breakpoint="xl"
          collapsible
          collapsed={collapsed}
          onCollapse={() => {
            setCollapsed((prev) => !prev);
          }}
          collapsedWidth={windowSize.width < 560 ? 0 : 80}
          trigger={
            <div className={styles["menu-icon"]}>
              {!collapsed ? <LeftOutlined /> : <RightOutlined />}
            </div>
          }
        >
          {windowSize.width > 560 ? (
            <Link
              to={"/"}
              className={styles["logotype"]}
              style={{ paddingLeft: collapsed ? 90 : 0 }}
            >
              <img src={Logo} width={140} alt={""} />
            </Link>
          ) : (
            ""
          )}
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            selectedKeys={[location.pathname]}
            items={sideMenuList}
            onClick={(e) => {
              setCollapsed(true);
              if (e.key === "7") {
                signOutHandler();
              }
            }}
          />
        </Sider>
        <Layout className="site-layout">
          <MyAccountHeader
            username={currentUser ? currentUser.nickname : ""}
            balance={calculateUserBalance(currentUser)}
            siderCollapsed={collapsed}
          />
          <Content className={styles["my-account-wrapper"]}>
            <Outlet context={[currentUser]} />
          </Content>
        </Layout>
        {/*<Sider className={styles["right-sider"]}>*/}
        {/*  <p>Последние операции</p>*/}
        {/*</Sider>*/}
      </Layout>
    </div>
  );
};

export { MyAccountLayout };
