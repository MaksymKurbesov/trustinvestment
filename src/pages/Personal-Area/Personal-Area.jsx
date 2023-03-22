import styles from "./Personal-Area.module.css";
import { DepositsStatus } from "pages/Personal-Area/components/Deposits-Status/DepositStatus";
import { TimeToPayment } from "pages/Personal-Area/components/Time-To-Payment/Time-To-Payment";
import { UserWallets } from "pages/Personal-Area/components/UserWallets/Userwallets";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../index";
import {
  collection,
  query,
  getDocs,
  onSnapshot,
  updateDoc,
  doc,
  increment,
  addDoc,
  runTransaction,
} from "firebase/firestore";
import { useOutletContext } from "react-router-dom";
import { getNextAccrual } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import { UserStatistic } from "./components/User-Statistic";

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
      const depositsArr = [];
      let nextAccrual = new Date().getTime() * 10000;

      // onSnapshot(q, async (snapshot) => {
      await getDocs(q).then((snap) => {
        if (snap.docs.length === 0) return;

        snap.docs.forEach((item) => {
          const deposit = item.data();
          const depositIsActive = deposit.status === "active";

          if (depositIsActive && getNextAccrual(deposit) < nextAccrual) {
            nextAccrual = getNextAccrual(deposit);
          }

          runTransaction(firestore, (transaction) => {
            const timeNow = Math.round(Date.now() / 1000);
            const depositOpenTime = deposit.date.seconds;
            const charges = Math.floor((timeNow - depositOpenTime) / (3600 * 24));
            const chargesSubtract = charges - deposit.charges;
            const receivedByCharges = ((deposit.willReceived / deposit.days) * chargesSubtract).toFixed(2);
            const isLastCharge = charges === deposit.days;

            if (isLastCharge && depositIsActive) {
              transaction.update(doc(firestore, "users", userData.email), {
                [`paymentMethods.${deposit.paymentMethod}.available`]: increment(deposit.amount),
              });
            }

            if (chargesSubtract > 0) {
              addDoc(collection(firestore, "transactions"), {
                account_id: userData.uid,
                amount: +receivedByCharges,
                status: "Выполнено",
                type: "Начисления",
                date: new Date(),
                email: userData.email,
                executor: userData.nickname,
              });

              transaction.update(doc(firestore, "users", userData.email), {
                earned: increment(+receivedByCharges),
                [`paymentMethods.${deposit.paymentMethod}.available`]: increment(+receivedByCharges),
              });

              transaction.update(doc(firestore, "users", userData.email, "deposits", item.id), {
                charges: increment(chargesSubtract),
                received: increment(+receivedByCharges),
                status: isLastCharge ? "completed" : "active",
              });
            }

            // if (getNextAccrual(deposit) < nextAccrual) {
            //   nextAccrual = getNextAccrual(deposit);
            // }

            return Promise.resolve();
          }).then(() => {
            console.log(nextAccrual, "nextAccrual");
            // setNearestAccrual(nextAccrual);
          });

          depositsArr.push({
            ...deposit,
            nextAccrual: deposit.charges < deposit.days ? getNextAccrual(deposit) : "",
          });

          setDepositsList(depositsArr);
        });
      });
      setNearestAccrual(nextAccrual);
      // });
    };

    getDeposits();
  }, []);

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
        <TimeToPayment nearestAccrual={nearestAccrual} />
      </div>
    </div>
  );
};

export { PersonalArea };
