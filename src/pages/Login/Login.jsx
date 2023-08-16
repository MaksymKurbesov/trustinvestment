import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import signInAnimation from "assets/lottie-animations/signIn-animation.json";
import useLottie from "lottie-react";
import { LoginForm } from "./components/Login-Form/Login-Form";
import notification from "antd/lib/notification";
import { useTranslation } from "react-i18next";

const FEBRUARY_21_2022 = 1676967299257;

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  // const { currentUser } = useContext(AuthContext);
  const { t } = useTranslation();
  const [userLoginLoading, setUserLoginLoading] = useState(false);

  const [api, notificationContextHolder] = notification.useNotification();

  const confirmEmailNotification = () => {
    api["error"]({
      message: t("sign_in.error"),
      description: t("sign_in.confirm_email"),
    });
  };

  const errorNotification = () => {
    api["error"]({
      message: t("sign_in.error"),
      description: t("sign_in.wrong_password"),
    });
  };

  const successForgetPasswordNotification = () => {
    api["success"]({
      message: t("sign_in.success"),
      description: t("sign_in.forgot_password_notification"),
    });
  };

  const errorForgetPasswordNotification = () => {
    api["error"]({
      message: t("sign_in.error"),
      description: t("sign_in.user_not_exist"),
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
      .catch(() => {
        errorForgetPasswordNotification();
      });
  };

  const handleLogin = async (email, pass) => {
    setUserLoginLoading(true);
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        if (userCredential.user.metadata.createdAt < FEBRUARY_21_2022) {
          sessionStorage.setItem("Auth Token", userCredential._tokenResponse.refreshToken);
          navigate("/my-account");
          return;
        }
        setUserLoginLoading(false);

        sessionStorage.setItem("Auth Token", userCredential._tokenResponse.refreshToken);
        navigate("/my-account");
      })
      .catch((e) => {
        errorNotification();
        setUserLoginLoading(false);
      });
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.emailVerified) {
        navigate("/my-account");
      }
    });
  }, []);

  return (
    <div className={`${styles["login-page"]} devtools`}>
      <div className={`${styles["login-container"]} container`}>
        <h2>{t("sign_in.title")}</h2>
        <p>{t("sign_in.subtitle")}</p>
        <div className={styles["login-page__wrapper"]}>
          <div className={styles["login-page__description"]}>{SignInAnimation}</div>
          <div className={styles["login-page__form"]}>
            <LoginForm
              title={"Войти"}
              handleClick={handleLogin}
              resetPassword={resetPassword}
              userLoginLoading={userLoginLoading}
            />
          </div>
        </div>
      </div>
      <>{notificationContextHolder}</>
    </div>
  );
};

export { Login };
