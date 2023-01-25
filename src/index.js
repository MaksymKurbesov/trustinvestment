import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AOS from "aos";
import "aos/dist/aos.css";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBRYVcyjt0EBhRzmd5SKdvoSeA6j6941PY",
  authDomain: "trustinvest-1fdc5.firebaseapp.com",
  projectId: "trustinvest-1fdc5",
  storageBucket: "trustinvest-1fdc5.appspot.com",
  messagingSenderId: "318926719709",
  appId: "1:318926719709:web:3bbe8050befe4baf052934",
});

AOS.init();

export const TransactionsContext = createContext(null);

const firestore = getFirestore(firebaseApp);

export const FirebaseContext = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/*<TransactionsContext.Provider*/}
    {/*  value={{*/}
    {/*    // transactionID,*/}
    {/*  }}*/}
    {/*>*/}
    <FirebaseContext.Provider
      value={{
        firebaseApp,
        firestore,
      }}
    >
      <App />
    </FirebaseContext.Provider>
    {/*</TransactionsContext.Provider>*/}
  </BrowserRouter>
);
