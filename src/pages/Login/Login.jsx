import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import signInAnimation from "assets/lottie-animations/signIn-animation.json";
import useLottie from "lottie-react";
import { LoginForm } from "../../components/Login-Form/Login-Form";
import AuthContext from "../../components/Auth-Provider/AuthContext";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const SignInAnimation = useLottie({
    animationData: signInAnimation,
    style: {
      maxWidth: 600,
    },
    className: styles["sign-in-animation"],
  });

  const handleLogin = (email, pass) => {
    signInWithEmailAndPassword(auth, email, pass).then((userCredential) => {
      sessionStorage.setItem(
        "Auth Token",
        userCredential._tokenResponse.refreshToken
      );
      if (auth.currentUser) {
        navigate("/my-account");
      }
    });
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/my-account");
    }
  }, [currentUser]);

  return (
    <div className={`${styles["login-page"]} devtools`}>
      <div className={`${styles["login-container"]} container`}>
        <h2>Вход в личный кабинет</h2>
        <p>Новое продуктивное путешествие начинается прямо здесь</p>
        <div className={styles["login-page__wrapper"]}>
          <div className={styles["login-page__description"]}>
            {SignInAnimation}
          </div>
          <div className={styles["login-page__form"]}>
            <LoginForm title={"Войти"} handleClick={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className={`${styles["login-page"]} devtools`}>
  //     <div className={`${styles["login-container"]} container`}>
  //       <h2>Вход в личный кабинет</h2>
  //       <p>Новое продуктивное путешествие начинается прямо здесь</p>
  //       <div className={styles["login-page__wrapper"]}>
  //         <div className={styles["login-page__description"]}>
  //           {SignInAnimation}
  //         </div>
  //         <div className={styles["login-page__form"]}>
  //           <LoginForm title={"Войти"} handleClick={handleLogin} />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export { Login };
