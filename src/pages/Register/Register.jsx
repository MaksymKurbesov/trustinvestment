import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Form } from "components/Login-Form/Login-Form";
import { setDoc, doc, collection, where, query, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { useContext } from "react";
import { FirebaseContext } from "../../index";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../../components/Register-Form/Register-Form";
import styles from "./Register.module.css";
import signUpAnimation from "assets/lottie-animations/signUp-animation.json";
import useLottie from "lottie-react";
import { BITCOIN, BNB, ETHEREUM, PERFECT_MONEY, POLKADOT, SOLANA, TRC20_TETHER } from "../../utils/consts";

const setUserCustomFields = (signedUpUser, customFields) => {
  return {
    uid: signedUpUser.uid,
    email: customFields.email.toLowerCase(),
    nickname: customFields.nickname,
    phoneNumber: customFields.phone,
    referredBy: customFields.referredBy,
    registrationDate: new Date(signedUpUser.metadata.creationTime),
    referredTo: {},
    earned: 0,
    referals: 0,
    withdrawn: 0,
    invested: 0,
    deposits: {
      active: [],
      inactive: [],
    },
    paymentMethods: {
      [PERFECT_MONEY]: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
      [BITCOIN]: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
      [ETHEREUM]: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
      [TRC20_TETHER]: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
      [SOLANA]: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
      [POLKADOT]: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
      [BNB]: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
    },
  };
};

const REFERRALS_TOTAL_LEVELS = 6;

const Register = () => {
  const navigate = useNavigate();
  const { firestore } = useContext(FirebaseContext);

  const SignUpAnimation = useLottie({
    animationData: signUpAnimation,
    className: styles["signUpAnimation"],
  });

  const handleRegister = async (user) => {
    const auth = getAuth();

    await createUserWithEmailAndPassword(auth, user.email, user.password).then(async (userCredential) => {
      const signedUpUser = userCredential.user;

      const setReferrals = async (referredBy, limit) => {
        if (referredBy.trim() !== "" && --limit) {
          const getReferral = async () => {
            const q1 = query(collection(firestore, "users"), where("nickname", "==", referredBy));
            await getDocs(q1).then(async (querySnap) => {
              const referralLevel = querySnap.docs[0].data();

              await updateDoc(doc(firestore, "users", referralLevel.email), {
                [`referredTo.${REFERRALS_TOTAL_LEVELS - limit}`]: arrayUnion(user.nickname),
              });

              return setReferrals(referralLevel.referredBy, limit);
            });
          };

          getReferral();
        } else {
          return null;
        }
      };

      setDoc(doc(firestore, "users", signedUpUser.email), setUserCustomFields(signedUpUser, user)).then(() => {
        setReferrals(user.referredBy, REFERRALS_TOTAL_LEVELS);
      });
      navigate("/login");
    });
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
