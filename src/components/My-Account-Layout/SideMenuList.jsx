import { NavLink } from "react-router-dom";
import styles from "./My-Account-Layout.module.css";
import { MENU_LIST } from "../../utils/MENU_LIST";

export const sideMenuList = (location) => {
  return MENU_LIST.map((item, index) => ({
    key: String(index + 1),
    label: <NavLink to={item.link}>{item.title}</NavLink>,
    icon: item.icon,
    title: "",
    className: location.pathname === item.link ? styles["active"] : "",
  }));
};
