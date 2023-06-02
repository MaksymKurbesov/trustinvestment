import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useContext } from "react";

import AuthContext from "./AuthContext";
import {
  collection,
  doc,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  runTransaction,
} from "firebase/firestore";
import { FirebaseContext } from "../../index";

export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const [signedInUser, setSignedInUser] = useState(null);
  const { firestore } = useContext(FirebaseContext);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setSignedInUser(user);
      } else {
        setSignedInUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (!signedInUser) return;

    const q = query(
      collection(firestore, "transactions"),
      where("account_id", "==", signedInUser.uid),
      orderBy("date", "desc"),
      limit(10)
    );

    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   const transactions = [];
    //
    //   snapshot.docChanges().forEach(async (change) => {
    //     const modifiedTransaction = change.doc.data();
    //     transactions.push(modifiedTransaction);
    //     const isDepositTransaction =
    //       change.type === "modified" &&
    //       modifiedTransaction.status === "Выполнено" &&
    //       modifiedTransaction.type === "Пополнение";
    //
    //     const isWithdrawnTransaction =
    //       change.type === "modified" &&
    //       modifiedTransaction.status === "Выполнено" &&
    //       modifiedTransaction.type === "Вывод";
    //
    //     const transactionAmount = modifiedTransaction.amount + modifiedTransaction.tax;
    //     const transactionPaymentMethod = modifiedTransaction.paymentMethod;

    // if (isWithdrawnTransaction) {
    //   await runTransaction(firestore, async (transaction) => {
    //     const userRef = doc(firestore, "users", signedInUser.email);
    //     const userDoc = await transaction.get(userRef);
    //     const transactionDoc = await transaction.get(change.doc.ref);
    //
    //     const wallet = userDoc.data().paymentMethods[transactionDoc.data().executor];
    //
    //     const newAvailable = wallet.available - transactionDoc.data().amount;
    //     const newWithdrawn = wallet.withdrawn + transactionDoc.data().amount;
    //
    //     if (transactionDoc.data()._status === "running") {
    //       transaction.update(change.doc.ref, {
    //         _status: "completed",
    //       });
    //
    //       transaction.update(userRef, {
    //         [`paymentMethods.${transactionPaymentMethod}.available`]: newAvailable,
    //         [`paymentMethods.${transactionPaymentMethod}.withdrawn`]: newWithdrawn,
    //         withdrawn: increment(transactionAmount),
    //       });
    //     }
    //   });
    // }

    // if (isDepositTransaction) {
    //   await runTransaction(firestore, async (transaction) => {
    //     const userRef = doc(firestore, "users", signedInUser.email);
    //     const userDoc = await transaction.get(userRef);
    //     const transactionDoc = await transaction.get(change.doc.ref);
    //
    //     const wallet = userDoc.data().paymentMethods[transactionDoc.data().executor];
    //
    //     const newAvailable = wallet.available + transactionDoc.data().amount;
    //     const newDeposited = wallet.deposited + transactionDoc.data().amount;
    //
    //     if (transactionDoc.data()._status === "running") {
    //       transaction
    //         .update(change.doc.ref, {
    //           _status: "completed",
    //         })
    //         .update(userRef, {
    //           [`paymentMethods.${transactionPaymentMethod}.available`]: newAvailable,
    //           [`paymentMethods.${transactionPaymentMethod}.deposited`]: newDeposited,
    //         });
    //     }
    //   });
    // }
    // });
    // });

    // return unsubscribe;
  }, [signedInUser]);

  return <AuthContext.Provider value={{ signedInUser }}>{children}</AuthContext.Provider>;
};
