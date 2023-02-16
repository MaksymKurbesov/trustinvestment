import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import signInAnimation from "assets/lottie-animations/signIn-animation.json";
import useLottie from "lottie-react";
import { LoginForm } from "../../components/Login-Form/Login-Form";
import AuthContext from "../../components/Auth-Provider/AuthContext";
import { notification } from "antd";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [api, notificationContextHolder] = notification.useNotification();
  const errorNotification = () => {
    api["error"]({
      message: "Ошибка!",
      description: "Неверный логин или пароль. Проверьте пожалуйста правильность данных.",
    });
  };

  const successForgetPasswordNotification = () => {
    api["success"]({
      message: "Выполнено!",
      description:
        "Ссылка для изменения пароля отправлена вам на почту. (Если не найдете письмо, проверьте папку 'спам'",
    });
  };

  const errorForgetPasswordNotification = () => {
    api["error"]({
      message: "Ошибка!",
      description: "Такого пользователя не существует.",
    });
  };

  const SignInAnimation = useLottie({
    animationData: signInAnimation,
    style: {
      maxWidth: 600,
    },
    className: styles["sign-in-animation"],
  });

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        successForgetPasswordNotification();
      })
      .catch((e) => {
        errorForgetPasswordNotification();
      });
  };

  const handleLogin = (email, pass) => {
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        sessionStorage.setItem("Auth Token", userCredential._tokenResponse.refreshToken);
        if (auth.currentUser) {
          navigate("/my-account");
        }
      })
      .catch((e) => {
        console.log(e, "e");
        errorNotification();
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
          <div className={styles["login-page__description"]}>{SignInAnimation}</div>
          <div className={styles["login-page__form"]}>
            <LoginForm title={"Войти"} handleClick={handleLogin} resetPassword={resetPassword} />
          </div>
        </div>
      </div>
      <>{notificationContextHolder}</>
    </div>
  );
};

export { Login };
