import styles from "./Main-Header.module.css";
import Layout from "antd/lib/layout";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MenuList } from "./Menu-List";
import Logotype from "../../assets/images/logo.png";

const { Header: AntHeader } = Layout;

const MainHeader = () => {
  const auth = getAuth();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserIsLoggedIn(true);
      } else {
        setUserIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <AntHeader
      className={`${styles["header"]} ${styles[`opacity-${location.pathname === "/" ? "index" : location.pathname}`]}`}
      data-aos={"fade-down"}
    >
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
