import { NavLink } from "react-router-dom";
import styles from "./My-Account-Layout.module.css";
import {
  BarsOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
  HomeOutlined,
  ImportOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const SideMenuList = (location) => {
  const { t } = useTranslation();

  const MENU_LIST = [
    {
      title: t("cabinet_menu.cabinet"),
      link: "/my-account",
      icon: <HomeOutlined />,
    },
    {
      title: t("cabinet_menu.cash_in"),
      link: "/my-account/cash-in",
      icon: <WalletOutlined />,
    },
    {
      title: t("cabinet_menu.make_deposit"),
      link: "/my-account/deposit",
      icon: <CreditCardOutlined />,
    },
    {
      title: t("cabinet_menu.withdrawn"),
      link: "/my-account/withdraw",
      icon: <DollarCircleOutlined />,
    },
    {
      title: t("cabinet_menu.transactions"),
      link: "/my-account/transactions",
      icon: <BarsOutlined />,
    },
    {
      title: t("cabinet_menu.partners"),
      link: "/my-account/partners",
      icon: <UsergroupAddOutlined />,
    },
    {
      title: t("cabinet_menu.settings"),
      link: "/my-account/settings",
      icon: <SettingOutlined />,
    },
    {
      title: t("cabinet_menu.exit"),
      link: "/",
      icon: <ImportOutlined />,
    },
  ];

  return MENU_LIST.map((item, index) => ({
    key: String(index + 1),
    label: <NavLink to={item.link}>{item.title}</NavLink>,
    icon: <div className={styles["menu-icon"]}>{item.icon}</div>,
    title: "",
    className: location.pathname === item.link ? styles["active"] : "",
  }));
};
