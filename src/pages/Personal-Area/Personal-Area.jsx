import styles from "./Personal-Area.module.css";
import { DepositsStatus } from "pages/Personal-Area/components/Deposits-Status/DepositStatus";
import { TimeToPayment } from "pages/Personal-Area/components/Time-To-Payment/Time-To-Payment";
import { UserWallets } from "pages/Personal-Area/components/UserWallets/Userwallets";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../index";
import { collection, query, getDocs, doc, increment, runTransaction } from "firebase/firestore";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserStatistic } from "./components/User-Statistic";
import { PERCENTAGE_BY_PLANS } from "../../utils/consts";
import { addDays, calculateDepositCharges, getNearestAccrual } from "../../utils/helpers";
import PersonalAreaWarning from "./components/PersonalAreaWarning/PersonalAreaWarning";
import WrongPrivateKeyWarning from "./components/WrongPrivateKeyWarning/WrongPrivateKeyWarning";
import MultiaccWarning from "./components/MultiaccWarning/MultiaccWarning";
import ReferralWarning from "./components/ReferralWarning/ReferralWarning";

const PersonalArea = () => {
  const { firestore } = useContext(FirebaseContext);

  const { userData } = useOutletContext();
  const [depositsList, setDepositsList] = useState([]);
  const [nearestAccrual, setNearestAccrual] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (!userData) return;

    const getDeposits = async () => {
      const depositsQuery = query(collection(firestore, "users", userData.email, "deposits"));

      await getDocs(depositsQuery).then((depositsSnap) => {
        depositsSnap.docs.forEach(async (depositSnap) => {
          const depositDoc = doc(firestore, "users", userData.email, "deposits", depositSnap.id);
          setDepositsList((prevState) => [...prevState, depositSnap.data()]);

          if (!depositSnap.data().lastAccrual) {
            return;
          }

          await runTransaction(firestore, async (transaction) => {
            const deposit = await transaction.get(depositDoc);
            const {
              planNumber: depositPlanNumber,
              status,
              days,
              charges,
              amount,
              lastAccrual,
              paymentMethod,
              willReceived,
            } = deposit.data();
            let accruals = calculateDepositCharges(deposit.data());
            let isLastCharge = false;
            let receivedByCharges;
            const planNumber = Number(depositPlanNumber.match(/\d+/)[0]);
            const planPercent = PERCENTAGE_BY_PLANS[planNumber];

            if (status !== "active") {
              return;
            }

            if (planNumber > 3 && accruals >= days) {
              transaction.update(doc(firestore, "users", userData.email), {
                earned: increment(willReceived),
                [`paymentMethods.${paymentMethod}.available`]: increment(willReceived),
              });

              transaction.update(doc(firestore, "users", userData.email, "deposits", depositSnap.id), {
                charges: increment(1),
                received: increment(willReceived),
                lastAccrual: addDays(lastAccrual.seconds * 1000, 1),
                status: "completed",
              });
            }

            if (planNumber <= 3) {
              accruals = calculateDepositCharges(deposit.data());
              isLastCharge = charges + accruals >= days;
              receivedByCharges = amount * planPercent * accruals;

              if (isLastCharge) {
                accruals = days - charges;
                receivedByCharges = amount * planPercent * accruals;
                transaction.update(doc(firestore, "users", userData.email), {
                  [`paymentMethods.${paymentMethod}.available`]: increment(amount),
                });
              }

              transaction.update(doc(firestore, "users", userData.email), {
                earned: increment(receivedByCharges),
                [`paymentMethods.${paymentMethod}.available`]: increment(receivedByCharges),
              });

              transaction.update(doc(firestore, "users", userData.email, "deposits", depositSnap.id), {
                charges: increment(accruals),
                received: increment(receivedByCharges),
                lastAccrual: addDays(lastAccrual.seconds * 1000, accruals),
                status: isLastCharge ? "completed" : "active",
              });
            }

            for (let i = 0; i < accruals; i++) {
              // await addDoc(collection(firestore, "transactions"), {
              //   account_id: userData.uid,
              //   amount: receivedByCharges,
              //   status: "Выполнено",
              //   type: "Начисления",
              //   date: new Date(),
              //   email: userData.email,
              //   executor: deposit.data().paymentMethod,
              // });
            }
          });
        });
      });
    };

    getDeposits();
  }, []);

  useEffect(() => {
    const activeDeposits = depositsList.filter((deposit) => deposit.status === "active");
    setNearestAccrual(getNearestAccrual(activeDeposits));
  }, [depositsList]);

  if (!userData) {
    return null;
  }

  return (
    <div className={`${styles["my-account-page"]} accountRoot`}>
      <h2 className={`${userData.personalAreaWarning ? styles["personal-warning"] : ""} my-account-title`}>
        {t("personal_area.title")}
      </h2>
      {userData.personalAreaWarning ? <PersonalAreaWarning /> : ""}
      {userData.personalPageNadezhda ? <WrongPrivateKeyWarning /> : ""}
      {userData.isMarkus ? <MultiaccWarning /> : ""}
      {userData.isReferralWarning ? <ReferralWarning /> : ""}

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
