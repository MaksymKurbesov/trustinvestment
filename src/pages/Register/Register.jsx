import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Form } from "components/Login-Form/Login-Form";
import { setDoc, doc } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { FirebaseContext } from "../../index";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../../components/Register-Form/Register-Form";
import styles from "./Register.module.css";
import signUpAnimation from "assets/lottie-animations/signUp-animation.json";
import useLottie from "lottie-react";

const setUserCustomFields = (uid, customFields) => {
  return {
    uid,
    email: customFields.email,
    nickname: customFields.nickname,
    phoneNumber: customFields.phone,
    earned: 0,
    referals: 0,
    withdrawn: 0,
    partners: 0,
    deposits: {
      active: [],
      inactive: [],
    },
    paymentMethods: [
      {
        name: "Perfect Money",
        available: 0,
        deposited: 0,
        withdrawn: 0,
        referals: 0,
      },
      {
        name: "Visa",
        available: 0,
        deposited: 0,
        withdrawn: 0,
        referals: 0,
      },
      {
        name: "TRC20 Tether",
        available: 0,
        deposited: 0,
        withdrawn: 0,
        referals: 0,
      },
      {
        name: "Bitcoin",
        available: 0,
        deposited: 0,
        withdrawn: 0,
        referals: 0,
      },
      {
        name: "Ethereum",
        available: 0,
        deposited: 0,
        withdrawn: 0,
        referals: 0,
      },
    ],
  };
};

const Register = () => {
  const navigate = useNavigate();
  const { firestore } = useContext(FirebaseContext);

  const SignUpAnimation = useLottie({
    animationData: signUpAnimation,
    className: styles["signUpAnimation"],
  });

  ////////////////////// dev tools //////////////////////

  useEffect(() => {
    function adjustViewHeight() {
      document.querySelector(".devtools").style.height =
        window.outerHeight - window.innerHeight - 70;
    }

    window.onresize = adjustViewHeight;

    adjustViewHeight();
  }, []);

  const handleRegister = async (user) => {
    // console.log(user);
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, user.email, user.password).then(
      (userCredential) => {
        // Signed in
        const signedUpUser = userCredential.user;
        console.log(signedUpUser);
        setDoc(
          doc(firestore, "users", signedUpUser.email),
          setUserCustomFields(signedUpUser.uid, user)
        );
        navigate("/login");
      }
    );
  };

  return (
    <div className={`${styles["register-page"]} devtools`}>
      <div className={`${styles["register-page-container"]} container`}>
        <h2>Регистрация</h2>
        <p>Создавайте аккаунт и присоединяйтесь к нашему комьюнити</p>
        <div className={styles["register-form"]}>
          {SignUpAnimation}
          <RegisterForm handleClick={handleRegister} />
        </div>
      </div>
    </div>
  );
};

export { Register };
