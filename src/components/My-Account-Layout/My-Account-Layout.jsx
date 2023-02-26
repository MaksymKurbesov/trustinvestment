import { Outlet } from "react-router-dom";
import styles from "./My-Account-Layout.module.css";
import Layout from "antd/lib/layout";
import MyAccountHeader from "../My-Account-Header/My-Account-Header";
import { useContext, useEffect, useState } from "react";
import { calculateUserBalance } from "../../utils/helpers";

import AuthContext from "../Auth-Provider/AuthContext";

import MainSider from "./MainSider";
import { FirebaseContext } from "../../index";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";

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

  if (!signedInUser || !userData) {
    return null;
  }

  return (
    <div className={styles["my-account"]}>
      <Layout className={styles["my-account-layout"]}>
        <MyAccountHeader
          username={signedInUser ? userData.nickname : ""}
          balance={calculateUserBalance(userData)}
          avatar={signedInUser.photoURL ? signedInUser.photoURL : ""}
          siderCollapsed={collapsed}
        />

        <Layout className="site-layout" hasSider>
          <MainSider setCollapsed={setCollapsed} collapsed={collapsed} />
          <Content className={styles["my-account-wrapper"]}>
            <Outlet context={{ userData }} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export { MyAccountLayout };

const addWallet = async (firestore) => {
  await getDocs(collection(firestore, "users")).then((snap) => {
    snap.forEach((item) => {
      updateDoc(doc(firestore, "users", item.data().email), {
        [`paymentMethods.QIWI`]: {
          available: 0,
          deposited: 0,
          number: "",
          referrals: 0,
          withdrawn: 0,
        },
      });
    });
    // setUserData(snap.data());
  });
};
