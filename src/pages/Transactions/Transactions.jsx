import styles from "./Transactions.module.css";
import React, { useContext, useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { TransactionsTable } from "./TransactionsTable";
import AuthContext from "../../components/Auth-Provider/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";

const Transactions = () => {
  const { currentUser } = useContext(AuthContext);
  const { firestore } = useContext(FirebaseContext);

  const q = query(
    collection(firestore, "transactions"),
    where("account_id", "==", currentUser.uid)
    // where("status", "==", "Выполнено"),
    // where("type", "==", "Пополнение")
  );

  const [transactions, loading, error] = useCollection(q);

  console.log(transactions);

  if (loading) return;

  return (
    <div>
      <h3 className={"my-account-title"}>Ваши транзакции</h3>
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export { Transactions };
