import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import signInAnimation from "assets/lottie-animations/signIn-animation.json";
import useLottie from "lottie-react";
import { LoginForm } from "../../components/Login-Form/Login-Form";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  ////////////////////// dev tools //////////////////////

  useEffect(() => {
    function adjustViewHeight() {
      if (!document.querySelector(".devtools")) return;

      document.querySelector(".devtools").style.height =
        window.outerHeight - window.innerHeight - 70;
    }

    window.onresize = adjustViewHeight;

    adjustViewHeight();
  }, []);

  const SignInAnimation = useLottie({
    animationData: signInAnimation,
    style: {
      maxWidth: 600,
    },
    className: styles["sign-in-animation"],
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/my-account");
      }
    });

    if (user) {
      navigate("/my-account");
    }
  });

  const handleLogin = (email, pass) => {
    signInWithEmailAndPassword(auth, email, pass).then((userCredential) => {
      navigate("/my-account");
      sessionStorage.setItem(
        "Auth Token",
        userCredential._tokenResponse.refreshToken
      );
    });
  };

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
};

export { Login };
