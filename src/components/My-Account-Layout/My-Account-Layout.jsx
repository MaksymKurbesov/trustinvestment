import { Outlet } from "react-router-dom";
import styles from "./My-Account-Layout.module.css";
import { Layout } from "antd";
import MyAccountHeader from "../My-Account-Header/My-Account-Header";
import { useContext, useEffect, useState } from "react";
import { calculateUserBalance } from "../../utils/helpers";

import AuthContext from "../Auth-Provider/AuthContext";

import MainSider from "./MainSider";
import { FirebaseContext } from "../../index";
import { doc, getDoc } from "firebase/firestore";

const { Content } = Layout;

const MyAccountLayout = () => {
  const { signedInUser } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const { firestore } = useContext(FirebaseContext);

  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    await getDoc(doc(firestore, "users", signedInUser.email)).then((snap) => {
      setUserData(snap.data());
    });
  };

  useEffect(() => {
    if (signedInUser) getUserData();
  }, [signedInUser]);

  console.log("my account layout render ");

  if (!signedInUser || !userData) {
    return null;
  }

  return (
    <div className={styles["my-account"]}>
      <Layout className={styles["my-account-layout"]} hasSider>
        <MainSider setCollapsed={setCollapsed} collapsed={collapsed} />
        <Layout className="site-layout">
          <MyAccountHeader
            username={signedInUser ? userData.nickname : ""}
            balance={calculateUserBalance(userData)}
            siderCollapsed={collapsed}
          />
          <Content className={styles["my-account-wrapper"]}>
            <Outlet context={{ userData }} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export { MyAccountLayout };
