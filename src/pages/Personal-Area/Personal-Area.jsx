import styles from "./Personal-Area.module.css";
import InvestmentIcon from "assets/images/user-statistic/Investment.png";
import EarnedIcon from "assets/images/user-statistic/Earned.png";
import WithdrawnIcon from "assets/images/user-statistic/Withdrawn.png";
import ReferalsIcon from "assets/images/user-statistic/Referals.png";
import { DepositsStatus } from "components/Deposits-Status/Deposits-Status";
import { TimeToPayment } from "components/Time-To-Payment/Time-To-Payment";
import { UserWallets } from "components/Wallets/UserWallets";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../index";
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";
import { useOutletContext } from "react-router-dom";
import { getNextAccrual } from "../../utils/helpers";
import { useTranslation } from "react-i18next";

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

          snap.docs.map((item, index) => {
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
  }, [userData]);

  if (!userData) {
    return null;
  }

  return (
    <div className={`${styles["my-account-page"]} accountRoot`}>
      <h2 className={"my-account-title"}>{t("personal_area.title")}</h2>
      <div className={styles["my-account"]}>
        <UserWallets paymentMethods={userData.paymentMethods} />
        <div className={styles["user-statistic"]}>
          <div className={styles["user-statistic__item"]}>
            <img src={InvestmentIcon} width={50} alt={"Иконка"} />
            <div className={styles["info"]}>
              <p>{t("personal_area.invested")}:</p>
              <span>{userData.invested.toFixed(1)} USD</span>
            </div>
          </div>
          <div className={styles["user-statistic__item"]}>
            <img src={EarnedIcon} width={50} alt={"Иконка"} />
            <div className={styles["info"]}>
              <p>{t("personal_area.earned")}:</p>
              <span>{userData.earned.toFixed(1)} USD</span>
            </div>
          </div>
          <div className={styles["user-statistic__item"]}>
            <img src={WithdrawnIcon} width={50} alt={"Иконка"} />
            <div className={styles["info"]}>
              <p>{t("personal_area.withdrawn")}:</p>
              <span>{userData.withdrawn.toFixed(1)} USD</span>
            </div>
          </div>
          <div className={styles["user-statistic__item"]}>
            <img src={ReferalsIcon} width={50} alt={"Иконка"} />
            <div className={styles["info"]}>
              <p>{t("personal_area.referrals")}:</p>
              <span>{userData.referals.toFixed(1)} USD</span>
            </div>
          </div>
        </div>
        <DepositsStatus deposits={depositsList} />
        <TimeToPayment nearestAccrual={nearestAccrual} depositsIsEmpty={depositsList.length === 0} />
      </div>
    </div>
  );
};

export { PersonalArea };
