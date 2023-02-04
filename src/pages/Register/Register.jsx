import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Form } from "components/Login-Form/Login-Form";
import {
  setDoc,
  doc,
  collection,
  where,
  query,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
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
    email: customFields.email.toLowerCase(),
    nickname: customFields.nickname,
    phoneNumber: customFields.phone,
    referredBy: customFields.referredBy,
    referredTo: [],
    earned: 0,
    referals: 0,
    withdrawn: 0,
    invested: 0,
    deposits: {
      active: [],
      inactive: [],
    },
    wallets: {
      PERFECT_MONEY: "",
      TRC20_TETHER: "",
      BITCOIN: "",
      ETHEREUM: "",
      SOLANA: "",
      POLKADOT: "",
      BNB: "",
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

  const handleRegister = async (user) => {
    // console.log(user);
    const auth = getAuth();
    const usersRef = collection(firestore, "users");
    const nicknameAlreadyExist = false;
    const referredByRef = query(
      usersRef,
      where("nickname", "==", user.referredBy)
    );
    const existedUserRef = query(
      usersRef,
      where("nickname", "==", user.nickname)
    );

    // const queryTest = getDocs(existedUserRef);
    // queryTest.then((snapshot) => {
    //   console.log(snapshot.exists());
    // });

    await createUserWithEmailAndPassword(auth, user.email, user.password).then(
      async (userCredential) => {
        // Signed in
        const signedUpUser = userCredential.user;
        setDoc(
          doc(firestore, "users", signedUpUser.email),
          setUserCustomFields(signedUpUser.uid, user)
        );

        const querySnapsot = await getDocs(referredByRef);
        querySnapsot.forEach((doc) => {
          updateDoc(doc.ref, {
            referredTo: {
              1: arrayUnion(user.nickname),
            },
          });
        });

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
