import { useCountdown } from "../../hooks/useCountdown";
import styles from "./CountdownTimer.module.css";
import { useContext, useEffect } from "react";
import { addDoc, collection, doc, increment, updateDoc } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import AuthContext from "../Auth-Provider/AuthContext";
import { declensionNum } from "../../utils/helpers";
import { useTranslation } from "react-i18next";

const CountdownTimer = ({ targetDate = 0, deposit, cn }) => {
  const { signedInUser } = useContext(AuthContext);
  const { firestore } = useContext(FirebaseContext);
  const [days, hours, minutes, seconds, timeLeft] = useCountdown(typeof targetDate === "number" ? targetDate : null);
  const countdownIsEnded = timeLeft <= 0;
  const { t } = useTranslation();

  const getElapsedDays = (time) => {
    let elapsedDays = Math.floor(Math.abs(time) / (86400 * 1000));
    return elapsedDays + 1;
  };

  const setCharges = (days) => {
    const receivedByCharges = ((deposit.willReceived / deposit.days) * days).toFixed(2);
    const lastCharge = deposit.charges >= deposit.days;

    if (!receivedByCharges) return;

    if (lastCharge) {
      updateDoc(doc(firestore, "users", signedInUser.email), {
        [`paymentMethods.${deposit.paymentMethod}.available`]: increment(deposit.amount),
      });
    }

    updateDoc(doc(firestore, "users", signedInUser.email, "deposits", `${deposit.key}`), {
      charges: increment(days),
      received: increment(+receivedByCharges),
      status: lastCharge ? "completed" : "active",
    }).then(() => {
      addDoc(collection(firestore, "transactions"), {
        account_id: signedInUser.uid,
        amount: +receivedByCharges,
        status: "Выполнено",
        type: "Начисления",
        date: new Date(),
        email: signedInUser.email,
        executor: deposit.executor,
      });

      updateDoc(doc(firestore, "users", signedInUser.email), {
        earned: increment(+receivedByCharges),
        [`paymentMethods.${deposit.paymentMethod}.available`]: increment(+receivedByCharges),
      });
    });
  };

  useEffect(() => {
    const depositIsNotEnded = countdownIsEnded && deposit?.charges < deposit?.days;

    if (depositIsNotEnded) {
      setCharges(getElapsedDays(timeLeft));
    }
  }, [countdownIsEnded]);

  const formattedHours = declensionNum(hours, [
    t("personal_area.hours_1"),
    t("personal_area.hours_2"),
    t("personal_area.hours_3"),
  ]);
  const formattedMinutes = declensionNum(minutes, [
    t("personal_area.minutes_1"),
    t("personal_area.minutes_2"),
    t("personal_area.minutes_3"),
  ]);
  const formattedSeconds = declensionNum(seconds, [
    t("personal_area.seconds_1"),
    t("personal_area.seconds_2"),
    t("personal_area.seconds_3"),
  ]);

  return (
    <div className={`${styles["countdown-wrapper"]} ${styles[cn]}`}>
      {hours < -1 ? (
        <p className={styles["success"]}>Выполнено</p>
      ) : (
        <div className={styles["countdown"]}>
          {days === -1 ? (
            t("personal_area.loading")
          ) : (
            <>
              <div className={styles["hours"]}>
                <span>{hours}</span>
                <p>{formattedHours}</p>
              </div>
              <div className={styles["minutes"]}>
                <span>{minutes}</span>
                <p>{formattedMinutes}</p>
              </div>
              <div className={styles["seconds"]}>
                <span>{seconds}</span>
                <p>{formattedSeconds}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export { CountdownTimer };
