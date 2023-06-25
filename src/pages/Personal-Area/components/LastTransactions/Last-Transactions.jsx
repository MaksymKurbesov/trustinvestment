import React, { useContext, useEffect, useState } from "react";
import styles from "./Last-Transactions.module.css";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FirebaseContext } from "../../../../index";
import { secondsToStringDays } from "../../../../utils/helpers";

const LastTransactions = () => {
  const { firestore } = useContext(FirebaseContext);
  const [transactions, setTransactions] = useState([]);

  const transactionsDocRef = query(
    collection(firestore, "transactions"),
    where("account_id", "==", getAuth().currentUser.uid),
    orderBy("date", "desc"),
    limit(5)
  );

  useEffect(() => {
    const getTransactions = async () => {
      await getDocs(transactionsDocRef).then((snap) => {
        snap.docs.forEach((transaction) => {
          setTransactions((prevState) => {
            return [...prevState, transaction.data()];
          });
        });
      });
    };

    getTransactions();
  }, []);

  return (
    <div className={styles["last-transactions"]}>
      <h2>Последние транзакции</h2>
      <table>
        <thead>
          <tr>
            <th>Статус</th>
            <th>Тип</th>
            <th>Сумма</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            return (
              <tr key={index}>
                <td>{transaction.status}</td>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
                <td>{secondsToStringDays(transaction.date.seconds)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { LastTransactions };
