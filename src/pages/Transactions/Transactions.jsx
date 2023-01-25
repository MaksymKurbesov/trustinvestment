import styles from "./Transactions.module.css";
import React, { useContext, useEffect } from "react";
import { collection } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { useCollection } from "react-firebase-hooks/firestore";
import { TransactionsTable } from "./TransactionsTable";
import { MobileTransactions } from "./Mobile-Transactions";
import { useWindowSize } from "../../hooks/useWindowSize";

const Transactions = () => {
  const { firestore } = useContext(FirebaseContext);
  const [transactions, loading, error] = useCollection(
    collection(firestore, "transactions")
  );
  const windowSize = useWindowSize();

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
