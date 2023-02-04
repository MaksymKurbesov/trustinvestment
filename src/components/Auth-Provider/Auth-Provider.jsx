import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useContext } from "react";

import AuthContext from "./AuthContext";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
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

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
