import React from "react";
import Layout from "antd/lib/layout";
import styles from "./My-Account-Footer.module.css";

const { Footer } = Layout;

const MyAccountFooter = () => {
  return <Footer className={styles["footer"]}>Ant Design ©2023 Created by Ant UED</Footer>;
};

export default MyAccountFooter;
