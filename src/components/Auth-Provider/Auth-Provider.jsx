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
  updateDoc,
  where,
  runTransaction,
} from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { TransactionContext } from "../../App";

export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const [signedInUser, setSignedInUser] = useState(null);
  const { firestore } = useContext(FirebaseContext);
  const { transactionIsSent, setTransactionIsSent } = useContext(TransactionContext);

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

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transactions = [];

      snapshot.docChanges().forEach(async (change) => {
        const modifiedTransaction = change.doc.data();
        transactions.push(modifiedTransaction);
        const isDepositTransaction =
          change.type === "modified" &&
          modifiedTransaction.status === "Выполнено" &&
          modifiedTransaction.type === "Пополнение";

        const isWithdrawnTransaction =
          change.type === "modified" &&
          modifiedTransaction.status === "Выполнено" &&
          modifiedTransaction.type === "Вывод";

        const transactionAmount = modifiedTransaction.amount + modifiedTransaction.tax;
        const transactionPaymentMethod = modifiedTransaction.paymentMethod;

        if (isWithdrawnTransaction) {
          // await runTransaction(firestore, async (transaction) => {
          //   const transactionRef = await transaction.get(change.doc.ref);
          //
          //   updateDoc(doc(firestore, "users", signedInUser.email), {
          //     [`paymentMethods.${transactionPaymentMethod}.withdrawn`]: increment(transactionAmount),
          //     [`paymentMethods.${transactionPaymentMethod}.available`]: increment(-transactionAmount),
          //     withdrawn: increment(transactionAmount),
          //   });
          // });
        }

        if (isDepositTransaction) {
          setTransactionIsSent(true);
          await runTransaction(firestore, async (transaction) => {
            // console.log("transaction run");
            // const userRef = doc(firestore, "users", signedInUser.email);
            // const userDoc = await transaction.get(userRef);
            // const transactionDoc = await transaction.get(change.doc.ref);
            //
            // const wallet = userDoc.data().paymentMethods[transactionDoc.data().executor];
            //
            // const newAvailable = wallet.available + transactionDoc.data().amount;
            // const newDeposited = wallet.deposited + transactionDoc.data().amount;
            //
            // transaction.update(userRef, {
            //   [`paymentMethods.${transactionPaymentMethod}.available`]: newAvailable,
            //   [`paymentMethods.${transactionPaymentMethod}.deposited`]: newDeposited,
            // });
          });

          // await runTransaction(firestore, async (transaction) => {
          //   const transactionRef = await transaction.get(change.doc.ref);
          //
          //   updateDoc(doc(firestore, "users", signedInUser.email), {
          //     [`paymentMethods.${transactionPaymentMethod}.available`]: increment(modifiedTransaction.amount),
          //     [`paymentMethods.${transactionPaymentMethod}.deposited`]: increment(modifiedTransaction.amount),
          //   });
          // });
        } else {
          return;
        }
      });
    });

    return unsubscribe;
  }, [signedInUser]);

  return <AuthContext.Provider value={{ signedInUser }}>{children}</AuthContext.Provider>;
};
