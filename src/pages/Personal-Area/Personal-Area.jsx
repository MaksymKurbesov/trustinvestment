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
import { getNextAccrual } from "../../utils/helpers";

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
  const { firestore } = useContext(FirebaseContext);
  const { userData } = useOutletContext();
  const [depositsList, setDepositsList] = useState([]);
  const [nearestAccrual, setNearestAccrual] = useState(null);

  useEffect(() => {
    if (!userData) return;

    const getDeposits = async () => {
      const q = query(collection(firestore, "users", userData.email, "deposits"), where("status", "==", "active"));

      await getDocs(q).then((snap) => {
        const depositsArr = [];

        if (snap.docs.length === 0) return;

        let nextAccrual = getNextAccrual(snap.docs[0].data());

        snap.docs.map((item, index) => {
          const data = item.data();

          if (getNextAccrual(data) < nextAccrual) {
            nextAccrual = getNextAccrual(data);
          }

          depositsArr.push({
            ...data,
            key: index,
            nextAccrual: getNextAccrual(data),
            executor: userData.nickname,
          });
          setDepositsList(depositsArr);
        });
        setNearestAccrual(nextAccrual);
      });
    };

    getDeposits();
  }, [userData]);

  if (!userData) {
    return null;
  }

  return (
    <div className={`${styles["my-account-page"]} accountRoot`}>
      <h2 className={"my-account-title"}>Личный кабинет</h2>
      <div className={styles["my-account"]}>
        <UserWallets paymentMethods={userData.paymentMethods} />
        <div className={styles["user-statistic"]}>
          <div className={styles["user-statistic__item"]}>
            <img src={InvestmentIcon} width={50} alt={"Иконка"} />
            <div className={styles["info"]}>
              <p>Инвестировано:</p>
              <span>{userData.invested.toFixed(1)} USD</span>
            </div>
          </div>
          <div className={styles["user-statistic__item"]}>
            <img src={EarnedIcon} width={50} alt={"Иконка"} />
            <div className={styles["info"]}>
              <p>Заработано:</p>
              <span>{userData.earned.toFixed(1)} USD</span>
            </div>
          </div>
          <div className={styles["user-statistic__item"]}>
            <img src={WithdrawnIcon} width={50} alt={"Иконка"} />
            <div className={styles["info"]}>
              <p>Выведено:</p>
              <span>{userData.withdrawn.toFixed(1)} USD</span>
            </div>
          </div>
          <div className={styles["user-statistic__item"]}>
            <img src={ReferalsIcon} width={50} alt={"Иконка"} />
            <div className={styles["info"]}>
              <p>Реферальных:</p>
              <span>{userData.referals.toFixed(1)} USD</span>
            </div>
          </div>
        </div>
        <DepositsStatus deposits={depositsList} />
        <TimeToPayment nearestAccrual={nearestAccrual} />
      </div>
    </div>
  );
};

export { PersonalArea };
