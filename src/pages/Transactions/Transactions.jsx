import React, { useContext, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { TransactionsTable } from "./TransactionsTable";
import AuthContext from "../../components/Auth-Provider/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";

const Transactions = () => {
  const { currentUser } = useContext(AuthContext);
  const { firestore } = useContext(FirebaseContext);

  const q = query(collection(firestore, "transactions"), where("account_id", "==", currentUser.uid));

  const [transactions, loading, error] = useCollection(q);

  // useEffect(() => {
  //   const unsub = onSnapshot(q, (snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //       if (change.type === "modified") {
  //         // added to пополнено
  //         console.log(change.doc.data(), "change");
  //       }
  //     });
  //   });
  //
  //   return () => unsub();
  // }, []);

  if (loading) return;

  return (
    <div>
      <h3 className={"my-account-title"}>Ваши транзакции</h3>
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export { Transactions };
