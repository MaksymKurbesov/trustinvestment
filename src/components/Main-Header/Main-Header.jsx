import styles from "./Main-Header.module.css";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MenuList } from "./Menu-List";

const { Header: AntHeader } = Layout;

const MainHeader = () => {
  const auth = getAuth();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserIsLoggedIn(true);
      }
    });
  }, []);

  return (
    <AntHeader className={styles["header"]}>
      <div className="container">
        <div className={styles["logotype"]} />
        <MenuList userIsSigned={userIsLoggedIn} />
      </div>
    </AntHeader>
  );
};

export { MainHeader };
