import styles from "./Main-Header.module.css";
import { Layout } from "antd";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MenuList } from "./Menu-List";
import Logotype from "assets/images/logo.png";

const { Header: AntHeader } = Layout;

const MainHeader = () => {
  const auth = getAuth();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user, "user");
      if (user) {
        setUserIsLoggedIn(true);
      } else {
        setUserIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <AntHeader className={styles["header"]}>
      <div className={`${styles["header-container"]} container`}>
        <NavLink to={"/"} className={styles["logotype"]}>
          <img src={Logotype} width={140} />
        </NavLink>
        <MenuList userIsLoggedIn={userIsLoggedIn} />
      </div>
    </AntHeader>
  );
};

export { MainHeader };
