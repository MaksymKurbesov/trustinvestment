import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Form } from "components/Login-Form/Login-Form";
import { setDoc, doc, collection, where, query, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { useContext } from "react";
import { FirebaseContext } from "../../index";
import { RegisterForm } from "../../components/Register-Form/Register-Form";
import styles from "./Register.module.css";
import signUpAnimation from "assets/lottie-animations/signUp-animation.json";
import useLottie from "lottie-react";
import { setUserCustomFields } from "../../utils/helpers";
import Modal from "antd/lib/modal";
import { useTranslation } from "react-i18next";

const REFERRALS_TOTAL_LEVELS = 6;

const Register = () => {
  const { t } = useTranslation();
  const { firestore } = useContext(FirebaseContext);

  const SignUpAnimation = useLottie({
    animationData: signUpAnimation,
    className: styles["signUpAnimation"],
  });

  const handleRegister = async (user) => {
    const auth = getAuth();

    await createUserWithEmailAndPassword(auth, user.email, user.password).then(async (userCredential) => {
      const signedUpUser = userCredential.user;
      sendEmailVerification(signedUpUser);
      auth.signOut();
      success();

      const setReferrals = async (referredBy, limit) => {
        if (referredBy && referredBy.trim() !== "" && --limit) {
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
    });
  };

  const success = () => {
    Modal.success({
      title: t("registration.notification.title"),
      content: t("registration.notification.content"),
    });
  };

  return (
    <div className={`${styles["register-page"]} devtools`}>
      <div className={`${styles["register-page-container"]} container`}>
        <h2>{t("registration.title")}</h2>
        <p>{t("registration.subtitle")}</p>
        <div className={styles["register-form"]}>
          {SignUpAnimation}
          <RegisterForm handleClick={handleRegister} />
        </div>
      </div>
    </div>
  );
};

export { Register };
