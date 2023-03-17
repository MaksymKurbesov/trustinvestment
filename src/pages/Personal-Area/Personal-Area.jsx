import styles from "./Personal-Area.module.css";
import { DepositsStatus } from "pages/Personal-Area/components/Deposits-Status/DepositStatus";
import { TimeToPayment } from "pages/Personal-Area/components/Time-To-Payment";
import { UserWallets } from "pages/Personal-Area/components/UserWallets/Userwallets";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../index";
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";
import { useOutletContext } from "react-router-dom";
import { getNextAccrual } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import { UserStatistic } from "./components/User-Statistic";
import { TransactionContext } from "../../App";

const PersonalArea = () => {
  const { firestore } = useContext(FirebaseContext);

  const { userData } = useOutletContext();
  const [depositsList, setDepositsList] = useState([]);
  const [nearestAccrual, setNearestAccrual] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!userData) return;

    const getDeposits = async () => {
      const q = query(collection(firestore, "users", userData.email, "deposits"));

      onSnapshot(q, async (snapshot) => {
        await getDocs(q).then((snap) => {
          const depositsArr = [];
          let nextAccrual;

          if (snap.docs.length === 0) return;
          const deposit = snap.docs[snap.docs.length - 1].data();

          if (deposit.status === "active") {
            nextAccrual = getNextAccrual(deposit);
          }

          snap.docs.forEach((item) => {
            const data = item.data();
            const depositIsActive = data.status === "active";

            if (getNextAccrual(data) < nextAccrual && depositIsActive) {
              nextAccrual = getNextAccrual(data);
            }

            depositsArr.push({
              ...data,
              key: item.id,
              nextAccrual: data.charges < data.days ? getNextAccrual(data) : "",
              executor: userData.nickname,
            });
            setDepositsList(depositsArr);
          });

          setNearestAccrual(nextAccrual);
        });
      });
    };

    getDeposits();
  }, [firestore, userData]);

  if (!userData) {
    return null;
  }

  return (
    <div className={`${styles["my-account-page"]} accountRoot`}>
      <h2 className={"my-account-title"}>{t("personal_area.title")}</h2>
      <div className={styles["my-account"]}>
        <UserWallets paymentMethods={userData.paymentMethods} />
        <UserStatistic userData={userData} />
        <DepositsStatus deposits={depositsList} />
        <TimeToPayment nearestAccrual={nearestAccrual} depositsIsEmpty={depositsList.length === 0} />
      </div>
    </div>
  );
};

export { PersonalArea };
