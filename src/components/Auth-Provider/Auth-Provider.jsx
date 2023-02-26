import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useContext } from "react";

import AuthContext from "./AuthContext";
import { collection, doc, increment, limit, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
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

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transactions = [];
      snapshot.docChanges().forEach((change) => {
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
          updateDoc(doc(firestore, "users", signedInUser.email), {
            [`paymentMethods.${transactionPaymentMethod}.withdrawn`]: increment(transactionAmount),
            [`paymentMethods.${transactionPaymentMethod}.available`]: increment(-transactionAmount),
            withdrawn: increment(transactionAmount),
          });
        }

        if (isDepositTransaction) {
          updateDoc(doc(firestore, "users", signedInUser.email), {
            [`paymentMethods.${transactionPaymentMethod}.available`]: increment(modifiedTransaction.amount),
            [`paymentMethods.${transactionPaymentMethod}.deposited`]: increment(modifiedTransaction.amount),
          });
        }
      });
    });

    return unsubscribe;
  }, [signedInUser]);

  return <AuthContext.Provider value={{ signedInUser }}>{children}</AuthContext.Provider>;
};
