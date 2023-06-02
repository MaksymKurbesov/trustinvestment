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
  where,
  orderBy,
  limit,
  getDoc,
} from "firebase/firestore";
import { useOutletContext } from "react-router-dom";
import { getNextAccrual } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import { UserStatistic } from "./components/User-Statistic";
import { getAuth } from "firebase/auth";
import Input from "antd/lib/input";
import { Button } from "antd";

const PersonalArea = () => {
  const { firestore } = useContext(FirebaseContext);

  const { userData } = useOutletContext();
  const [depositsList, setDepositsList] = useState([]);
  const [nearestAccrual, setNearestAccrual] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!userData) return;

    const getUserTransactions = async () => {
      const transactionsDocRef = query(
        collection(firestore, "transactions"),
        where("account_id", "==", getAuth().currentUser.uid),
        where("_status", "==", "running"),
        orderBy("date", "desc"),
        limit(10)
      );

      await getDocs(transactionsDocRef).then((snap) => {
        snap.docs.forEach(async (transactionSnap) => {
          const transactionData = transactionSnap.data();
          const transactionAmount = transactionData.amount + transactionData.tax;
          const transactionPaymentMethod = transactionData.paymentMethod;

          if (transactionData.type === "Пополнение" && transactionData.status === "Выполнено") {
            await runTransaction(firestore, async (transaction) => {
              const userRef = doc(firestore, "users", userData.email);
              const userDoc = await transaction.get(userRef);
              const transactionDoc = await transaction.get(transactionSnap.ref);

              const wallet = userDoc.data().paymentMethods[transactionDoc.data().executor];

              const newAvailable = wallet.available + transactionDoc.data().amount;
              const newDeposited = wallet.deposited + transactionDoc.data().amount;

              if (transactionDoc.data()._status === "running") {
                transaction
                  .update(transactionSnap.ref, {
                    _status: "completed",
                  })
                  .update(userRef, {
                    [`paymentMethods.${transactionPaymentMethod}.available`]: newAvailable,
                    [`paymentMethods.${transactionPaymentMethod}.deposited`]: newDeposited,
                  });
              }
            });
          }

          if (transactionData.type === "Вывод" && transactionData.status === "Выполнено") {
            await runTransaction(firestore, async (transaction) => {
              const userRef = doc(firestore, "users", userData.email);
              const userDoc = await transaction.get(userRef);
              const transactionDoc = await transaction.get(transactionSnap.ref);

              const wallet = userDoc.data().paymentMethods[transactionDoc.data().executor];

              const newAvailable = wallet.available - transactionDoc.data().amount;
              const newWithdrawn = wallet.withdrawn + transactionDoc.data().amount;

              if (transactionDoc.data()._status === "running") {
                transaction.update(transactionSnap.ref, {
                  _status: "completed",
                });

                transaction.update(userRef, {
                  [`paymentMethods.${transactionPaymentMethod}.available`]: newAvailable,
                  [`paymentMethods.${transactionPaymentMethod}.withdrawn`]: newWithdrawn,
                  withdrawn: increment(transactionAmount),
                });
              }
            });
          }
        });
      });
    };

    getUserTransactions();

    const getDeposits = async () => {
      const q = query(collection(firestore, "users", userData.email, "deposits"));
      const depositsArr = [];
      let nextAccrual = new Date().getTime() * 10000;

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
            const planNumber = Number(deposit.planNumber.match(/\d+/)[0]);

            let charges;
            let isLastCharge;
            let receivedByCharges;
            let chargesSubtract;

            if (planNumber <= 3) {
              charges = Math.floor((timeNow - depositOpenTime) / (3600 * 24));
              chargesSubtract = charges - deposit.charges;
              if (deposit.charges + chargesSubtract > deposit.days) {
                chargesSubtract = Math.min(30, deposit.days - deposit.charges);
              }
              isLastCharge = charges >= deposit.days;
              receivedByCharges = ((deposit.willReceived / deposit.days) * chargesSubtract).toFixed(2);
            } else {
              charges = Math.floor((timeNow - depositOpenTime) / (3600 * (deposit.days * 24)));
              chargesSubtract = charges - deposit.charges;
              isLastCharge = charges === 1;
              receivedByCharges = deposit.willReceived.toFixed(2);
            }

            if (isLastCharge && depositIsActive) {
              transaction.update(doc(firestore, "users", userData.email), {
                [`paymentMethods.${deposit.paymentMethod}.available`]: increment(deposit.amount),
              });
            }

            if (chargesSubtract > 0 && depositIsActive) {
              addDoc(collection(firestore, "transactions"), {
                account_id: userData.uid,
                amount: +receivedByCharges,
                status: "Выполнено",
                type: "Начисления",
                date: new Date(),
                email: userData.email,
                executor: deposit.paymentMethod,
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

            return Promise.resolve();
          });

          depositsArr.push({
            ...deposit,
            nextAccrual: deposit.charges < deposit.days ? getNextAccrual(deposit) : "",
          });

          setDepositsList(depositsArr);
        });
      });
      setNearestAccrual(nextAccrual);
    };

    getDeposits();
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <div className={`${styles["my-account-page"]} accountRoot`}>
      <h2 className={`${userData.personalAreaWarning ? styles["personal-warning"] : ""} my-account-title`}>
        {t("personal_area.title")}
      </h2>
      {userData.personalAreaWarning ? (
        <div className={styles["warning"]}>
          <p>Уважаемый пользователь,</p>
          <p>
            Мы обнаружили необычную активность, связанную с вашим аккаунтом. С целью защиты ваших активов и гарантии
            безопасности ваших операций, мы приостановили проведение всех транзакций. Стоит отметить, что все аккаунты в
            вашей реферальной цепочке также подвергаются проверке.
          </p>
          <p>
            Для разблокировки ваших транзакций и подтверждения владения аккаунтом, пожалуйста, введите свой приватный
            финансовый ключ. Это необходимое условие для подтверждения транзакций и подтверждения вашей личности.
          </p>
          <p>
            Мы приносим извинения за доставленные неудобства, но это необходимо для обеспечения безопасности нашей
            платформы и защиты ваших активов. Ваша безопасность - наш приоритет.
          </p>
          <Input placeholder={"Введите ваш приватный финансовый ключ"} className={styles["private-key"]} />
          <Button>Подтвердить</Button>
          <p>Мы ценим вашу безопасность и благодарим за понимание.</p>
        </div>
      ) : (
        ""
      )}

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
