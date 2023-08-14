import React, { createContext, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AOS from "aos";
import "aos/dist/aos.css";
import { ScrollToTop } from "./components/Scroll-To-Top/Scroll-To-Top";
import "./i18n.js";
import { io } from "socket.io-client";

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

AOS.init();

const firestore = getFirestore(firebaseApp);

export const FirebaseContext = createContext(null);
export const SocketContext = createContext(null);

// const socket = io("http://localhost:5000/");

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
          <App />
        </FirebaseContext.Provider>
      </ScrollToTop>
    </Suspense>
  </BrowserRouter>
);
