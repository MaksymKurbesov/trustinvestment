import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useContext } from "react";

import AuthContext from "./AuthContext";
import { collection, doc, getDoc, increment, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { FirebaseContext } from "../../index";

export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const { firestore } = useContext(FirebaseContext);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        onSnapshot(doc(firestore, "users", user.email), (doc) => {
          setCurrentUser(doc.data());
        });

        const snapshot = await getDoc(doc(firestore, "users", user.email));
        setCurrentUser(snapshot.data());
      }
    });
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(firestore, "transactions"),
      where("account_id", "==", currentUser.uid),
      where("type", "==", "Пополнение")
    );

    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const modifiedTransaction = change.doc.data();

        if (change.type === "modified" && modifiedTransaction.status === "Выполнено") {
          // added to пополнено

          console.log(modifiedTransaction);

          updateDoc(doc(firestore, "users", currentUser.email), {
            [`paymentMethods.${modifiedTransaction.paymentMethod}.available`]: increment(modifiedTransaction.amount),
            [`paymentMethods.${modifiedTransaction.paymentMethod}.deposited`]: increment(modifiedTransaction.amount),
          });
        }
      });
    });
  }, [auth.currentUser]);

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
