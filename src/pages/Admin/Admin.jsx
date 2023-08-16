import React, { useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FirebaseContext } from "../../index";
import styles from "./Admin.module.css";
import { PERCENTAGE_BY_LVL } from "../../utils/consts";
import { useOutletContext } from "react-router-dom";

const REFERRALS_TOTAL_LEVELS = 6;

const Admin = () => {
  const { firestore } = useContext(FirebaseContext);
  const [transactions, setTransactions] = useState([]);
  const { userData } = useOutletContext();

  useEffect(() => {
    const transactionsDocRef = query(collection(firestore, "transactions"), where("status", "==", "Ожидание"));
    onSnapshot(transactionsDocRef, (snapshot) => {
      setTransactions(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const addReferralReward = (referredBy, amount, paymentMethod, limit) => {
    if (!referredBy) return;

    if (referredBy.trim() !== "" && --limit) {
      const getReferral = async () => {
        const q1 = query(collection(firestore, "users"), where("nickname", "==", referredBy));
        await getDocs(q1).then(async (querySnap) => {
          const referralLevel = querySnap.docs[0].data();
          const referralAmount = (amount / 100) * PERCENTAGE_BY_LVL[REFERRALS_TOTAL_LEVELS - limit];

          await updateDoc(doc(firestore, "users", referralLevel.email), {
            referals: increment(referralAmount),
            [`paymentMethods.${paymentMethod}.referrals`]: increment(referralAmount),
            [`paymentMethods.${paymentMethod}.available`]: increment(referralAmount),
          });

          await addDoc(collection(firestore, "transactions"), {
            account_id: referralLevel.uid,
            amount: referralAmount,
            status: "Выполнено",
            type: "Реферальные",
            date: new Date(),
            email: referralLevel.email,
            paymentMethod: paymentMethod,
            executor: userData.nickname,
          });

          return addReferralReward(referralLevel.referredBy, amount, paymentMethod, limit);
        });
      };

      getReferral();
    } else {
      return null;
    }
  };

  const successTransaction = async ({ id, email, paymentMethod, amount, type }) => {
    const userRef = doc(firestore, "users", email);
    const transactionRef = doc(firestore, "transactions", id);

    if (type === "Пополнение") {
      await updateDoc(userRef, {
        [`paymentMethods.${paymentMethod}.available`]: increment(amount),
        [`paymentMethods.${paymentMethod}.deposited`]: increment(amount),
      });

      addReferralReward(userData.referredBy, amount, paymentMethod, REFERRALS_TOTAL_LEVELS);
    }

    if (type === "Вывод") {
      await updateDoc(userRef, {
        [`paymentMethods.${paymentMethod}.available`]: increment(-amount),
        [`paymentMethods.${paymentMethod}.withdrawn`]: increment(amount),
        withdrawn: increment(amount),
      });
    }

    await updateDoc(transactionRef, {
      status: "Выполнено",
    });
  };

  const cancelTransaction = async ({ id }) => {
    const transactionRef = doc(firestore, "transactions", id);

    await updateDoc(transactionRef, {
      status: "Отмена",
    });
  };

  return (
    <>
      <table className={styles["table"]}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Сумма</th>
            <th>Способ оплаты</th>
            <th>Тип</th>
            <th>ID</th>
            <th>Ключ</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr className={styles["transaction"]} key={transaction.id}>
                <td>{transaction.email}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.paymentMethod}</td>
                <td>{transaction.type}</td>
                <td>{transaction.transaction_id}</td>
                <td>{transaction.privatKey}</td>
                <td>
                  <button
                    onClick={() => {
                      successTransaction(transaction);
                    }}
                  >
                    Выполнено
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      cancelTransaction(transaction);
                    }}
                  >
                    Отмена
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Admin;
