import styles from "./Personal-Area.module.css";
import InvestmentIcon from "assets/images/user-statistic/Investment.png";
import EarnedIcon from "assets/images/user-statistic/Earned.png";
import WithdrawnIcon from "assets/images/user-statistic/Withdrawn.png";
import ReferalsIcon from "assets/images/user-statistic/Referals.png";
import { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../index";
import { DepositsStatus } from "components/Deposits-Status/Deposits-Status";
import { TimeToPayment } from "components/Time-To-Payment/Time-To-Payment";
import { Wallets } from "components/Wallets/Wallets";
import { Skeleton } from "antd";

const PersonalArea = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const { firestore } = useContext(FirebaseContext);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await getDoc(doc(firestore, "users", user.email));
        setCurrentUser(snapshot.data());
      } else {
        navigate("/login");
      }
    });
  }, []);

  if (!currentUser) {
    return null;
  }

  return (
    <div className={`${styles["my-account-page"]} accountRoot`}>
      <h2 className={"my-account-title"}>Личный кабинет</h2>
      <div className={styles["my-account"]}>
        <Wallets paymentMethods={currentUser.paymentMethods} />
        <div className={styles["user-statistic"]}>
          <div className={styles["user-statistic__item"]}>
            <img src={InvestmentIcon} width={50} />
            <div className={styles["info"]}>
              <p>Инвестировано:</p>
              <span>{currentUser.invested} USD</span>
            </div>
          </div>
          <div className={styles["user-statistic__item"]}>
            <img src={EarnedIcon} width={50} />
            <div className={styles["info"]}>
              <p>Заработано:</p>
              <span>{currentUser.earned} USD</span>
            </div>
          </div>
          <div className={styles["user-statistic__item"]}>
            <img src={WithdrawnIcon} width={50} />
            <div className={styles["info"]}>
              <p>Выведено:</p>
              <span>{currentUser.withdrawn} USD</span>
            </div>
          </div>
          <div className={styles["user-statistic__item"]}>
            <img src={ReferalsIcon} width={50} />
            <div className={styles["info"]}>
              <p>Реферальных:</p>
              <span>{currentUser.referals} USD</span>
            </div>
          </div>
        </div>
        <DepositsStatus />
        <TimeToPayment />
      </div>
    </div>
  );
};

export { PersonalArea };
