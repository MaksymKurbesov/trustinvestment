import styles from "./Personal-Area.module.css";
import InvestmentIcon from "assets/images/user-statistic/Investment.png";
import EarnedIcon from "assets/images/user-statistic/Earned.png";
import WithdrawnIcon from "assets/images/user-statistic/Withdrawn.png";
import ReferalsIcon from "assets/images/user-statistic/Referals.png";
import { DepositsStatus } from "components/Deposits-Status/Deposits-Status";
import { TimeToPayment } from "components/Time-To-Payment/Time-To-Payment";
import { UserWallets } from "components/Wallets/UserWallets";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../components/Auth-Provider/AuthContext";
import { FirebaseContext } from "../../index";
import { collection, query, getDocs, where, onSnapshot, doc, addDoc } from "firebase/firestore";
import { useOutletContext } from "react-router-dom";

// const transferTransaction = async (firestore, currentUser) => {
//   const transRef = collection(firestore, "users", currentUser.email, "transactions");
//   const transQuery = query(collection(firestore, "transactions"), where("email", "==", currentUser.email));
//
//   await getDocs(transQuery).then((snap) => {
//     snap.docs.map((item) => {
//       addDoc(transRef, item.data());
//     });
//   });
// };

const PersonalArea = () => {
  const { currentUser } = useContext(AuthContext);
  const [userTotals, activeDeposits, setDepositsTimers, depositsTimers] = useOutletContext();

  if (!currentUser) {
    return null;
  }

  return (
    <div className={`${styles["my-account-page"]} accountRoot`}>
      <h2 className={"my-account-title"}>Личный кабинет</h2>
      <div className={styles["my-account"]}>
        <UserWallets paymentMethods={currentUser.paymentMethods} />
        <div className={styles["user-statistic"]}>
          <div className={styles["user-statistic__item"]}>
            <img src={InvestmentIcon} width={50} alt={"Иконка"} />
            <div className={styles["info"]}>
              <p>Инвестировано:</p>
              <span>{userTotals.invested} USD</span>
            </div>
          </div>
          <div className={styles["user-statistic__item"]}>
            <img src={EarnedIcon} width={50} alt={"Иконка"} />
            <div className={styles["info"]}>
              <p>Заработано:</p>
              <span>{userTotals.earned.toFixed(1)} USD</span>
            </div>
          </div>
          <div className={styles["user-statistic__item"]}>
            <img src={WithdrawnIcon} width={50} alt={"Иконка"} />
            <div className={styles["info"]}>
              <p>Выведено:</p>
              <span>{userTotals.withdrawn.toFixed(1)} USD</span>
            </div>
          </div>
          <div className={styles["user-statistic__item"]}>
            <img src={ReferalsIcon} width={50} alt={"Иконка"} />
            <div className={styles["info"]}>
              <p>Реферальных:</p>
              <span>{userTotals.referals.toFixed(1)} USD</span>
            </div>
          </div>
        </div>
        <DepositsStatus activeDeposits={activeDeposits} depositsTimers={depositsTimers} />
        <TimeToPayment activeDeposits={activeDeposits} timersHandler={setDepositsTimers} />
      </div>
    </div>
  );
};

export { PersonalArea };
