import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./My-Account-Layout.module.css";
import { Layout, Menu } from "antd";
import MyAccountHeader from "../My-Account-Header/My-Account-Header";

import {
  BarsOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
  HomeOutlined,
  ImportOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useWindowSize } from "../../hooks/useWindowSize";
import Logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

const { Content, Sider } = Layout;

const MENU_LIST = [
  {
    title: "Кабинет",
    link: "/my-account",
    icon: <HomeOutlined />,
  },
  {
    title: "Сделать депозит",
    link: "/my-account/deposit",
    icon: <CreditCardOutlined />,
  },
  {
    title: "Вывод cредств",
    link: "/my-account/withdraw",
    icon: <DollarCircleOutlined />,
  },
  {
    title: "Транзакции",
    link: "/my-account/transactions",
    icon: <BarsOutlined />,
  },
  {
    title: "Партнёрам",
    link: "/my-account/partners",
    icon: <UsergroupAddOutlined />,
  },
  {
    title: "Настройки",
    link: "/my-account/settings",
    icon: <SettingOutlined />,
  },
  {
    title: "Выход",
    link: "/logout",
    icon: <ImportOutlined />,
  },
];

const MyAccountLayout = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const windowSize = useWindowSize();
  const [currentUser, setCurrentUser] = useState();

  const sideMenuList = MENU_LIST.map((item, index) => ({
    key: String(index + 1),
    label: <NavLink to={item.link}>{item.title}</NavLink>,
    icon: item.icon,
  }));

  const signOutHandler = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  return (
    <div className={styles["my-account"]}>
      <Layout className={styles["my-account-layout"]}>
        <Sider
          className={styles["left-sider"]}
          breakpoint="xl"
          collapsible={windowSize.width < 1200 && windowSize.width > 560}
        >
          {windowSize.width > 560 ? (
            <Link to={"/"} className={styles["logotype"]}>
              <img src={Logo} width={170} alt={""} />
            </Link>
          ) : (
            ""
          )}
          <Menu
            disabledOverflow={false}
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode={windowSize.width < 561 ? "horizontal" : "inline"}
            items={sideMenuList}
            onClick={(e) => {
              if (e.key === "7") {
                signOutHandler();
              }
            }}
          />
        </Sider>
        <Layout className="site-layout">
          <MyAccountHeader username={currentUser ? currentUser.email : ""} />
          <Content className={styles["my-account-wrapper"]}>
            <Outlet />
          </Content>
        </Layout>
        <Sider className={styles["right-sider"]}>
          <p>Последние операции</p>
        </Sider>
      </Layout>
    </div>
  );
};

export { MyAccountLayout };
