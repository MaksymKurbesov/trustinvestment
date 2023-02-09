import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./My-Account-Layout.module.css";
import { Layout } from "antd";
import MyAccountHeader from "../My-Account-Header/My-Account-Header";
import { useContext, useEffect, useState } from "react";
import { calculateUserBalance } from "../../utils/helpers";

import AuthContext from "../Auth-Provider/AuthContext";

import MainSider from "./MainSider";
import { FirebaseContext } from "../../index";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";

const { Content } = Layout;

const MyAccountLayout = () => {
  const { currentUser } = useContext(AuthContext);

  const [collapsed, setCollapsed] = useState(false);
  const { firestore } = useContext(FirebaseContext);

  const [activeDeposits, setActiveDeposits] = useState([]);
  const [userTotals, setUserTotals] = useState({ invested: 0, earned: 0, withdrawn: 0, referals: 0 });
  const [depositsTimers, setDepositsTimers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // const q = query(collection(firestore, "users", currentUser.email, "deposits"), where("status", "==", "active"));
  // const transactionsDocRef = collection(firestore, "users", currentUser.email, "transactions");

  const getUserTotals = async () => {
    let invested = 0;
    let earned = 0;
    let withdrawn = 0;
    let referals = 0;

    // await getDocs(transactionsDocRef).then((transaction) => {
    //   transaction.docs.map((item) => {
    //     setTransactions((prevState) => [...prevState, item.data()]);
    //   });
    // });

    setUserTotals({
      invested,
      earned,
      withdrawn,
      referals,
    });
  };

  const getDeposits = async () => {
    // await getDocs(q).then((snap) => {
    //   snap.docs.map((item) => {
    //     setActiveDeposits((prevState) => {
    //       return [...prevState, item.data()];
    //     });
    //   });
    // });
  };

  useEffect(() => {
    if (currentUser) {
      // onSnapshot(q, (changedDoc) => {
      //   changedDoc.docChanges().forEach(async (item) => {
      //     if (item.type === "modified") {
      //       getDeposits();
      //     }
      //   });
      // });

      getUserTotals();
      getDeposits();
    }
  }, []);

  if (!currentUser) {
    return null;
  }

  return (
    <div className={styles["my-account"]}>
      <Layout className={styles["my-account-layout"]} hasSider>
        <MainSider setCollapsed={setCollapsed} collapsed={collapsed} />
        <Layout className="site-layout">
          <MyAccountHeader
            username={currentUser ? currentUser.nickname : ""}
            balance={calculateUserBalance(currentUser)}
            siderCollapsed={collapsed}
          />
          <Content className={styles["my-account-wrapper"]}>
            <Outlet context={[currentUser, userTotals, activeDeposits, setDepositsTimers, depositsTimers]} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export { MyAccountLayout };
