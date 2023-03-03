import React, { createContext, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AOS from "aos";
import "aos/dist/aos.css";
import { ScrollToTop } from "./components/Scroll-To-Top/Scroll-To-Top";
import { AuthProvider } from "./components/Auth-Provider/Auth-Provider";
import "./i18n.js";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBRYVcyjt0EBhRzmd5SKdvoSeA6j6941PY",
  authDomain: "trustinvest-1fdc5.firebaseapp.com",
  projectId: "trustinvest-1fdc5",
  storageBucket: "trustinvest-1fdc5.appspot.com",
  messagingSenderId: "318926719709",
  appId: "TestFn:318926719709:web:3bbe8050befe4baf052934",
});

AOS.init();

const firestore = getFirestore(firebaseApp);

export const FirebaseContext = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Suspense fallback={<div>Загрузка...</div>}>
      <ScrollToTop>
        <FirebaseContext.Provider
          value={{
            firebaseApp,
            firestore,
          }}
        >
          <AuthProvider>
            <App />
          </AuthProvider>
        </FirebaseContext.Provider>
      </ScrollToTop>
    </Suspense>
  </BrowserRouter>
);
