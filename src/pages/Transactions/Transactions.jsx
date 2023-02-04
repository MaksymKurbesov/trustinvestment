import styles from "./Transactions.module.css";
import React, { useContext } from "react";
import { collection, query, where } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { useCollection } from "react-firebase-hooks/firestore";
import { TransactionsTable } from "./TransactionsTable";
import { MobileTransactions } from "./Mobile-Transactions";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useOutletContext } from "react-router-dom";

const Transactions = () => {
  const [currentUser] = useOutletContext();
  const { firestore } = useContext(FirebaseContext);

  const q = query(
    collection(firestore, "transactions"),
    where("account_id", "==", currentUser.uid)
  );

  const [transactions, loading, error] = useCollection(q);

  const windowSize = useWindowSize();

  // unstringifyDate(secondsToStringDays(Math.floor(Date.now() / 1000)));

  if (loading) return;

  return (
    <div>
      <h3 className={"my-account-title"}>Ваши транзакции</h3>
      {windowSize.width < 500 ? (
        <MobileTransactions transactions={transactions} />
      ) : (
        <TransactionsTable transactions={transactions} />
      )}
    </div>
  );
};

export { Transactions };
