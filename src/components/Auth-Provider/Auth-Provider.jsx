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
  }, [signedInUser]);

  return <AuthContext.Provider value={{ signedInUser }}>{children}</AuthContext.Provider>;
};
