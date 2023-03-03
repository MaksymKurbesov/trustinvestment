import { useCountdown } from "../../hooks/useCountdown";
import styles from "./CountdownTimer.module.css";
import { useContext, useEffect } from "react";
import { addDoc, collection, doc, increment, updateDoc } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import AuthContext from "../Auth-Provider/AuthContext";
import { declensionNum } from "../../utils/helpers";
import { useTranslation } from "react-i18next";

const SECONDS_IN_DAY = 86400;

const CountdownTimer = ({ targetDate = 0, depositID, receivedForDay, nickname, paymentMethod }) => {
  const { signedInUser } = useContext(AuthContext);
  const { firestore } = useContext(FirebaseContext);
  const [days, hours, minutes, seconds, timeLeft] = useCountdown(targetDate);
  const countdownIsEnded = timeLeft <= 0;
  const { t, i18n } = useTranslation();

  const getElapsedDays = (time) => {
    let elapsedDays = Math.floor(Math.abs(time) / (86400 * 1000));
    return elapsedDays + 1;
  };

  const setCharges = (days) => {
    const receivedByCharges = (receivedForDay * days).toFixed(2);

    if (!receivedByCharges) return;

    updateDoc(doc(firestore, "users", signedInUser.email, "deposits", `${depositID}`), {
      charges: increment(days),
      received: increment(+receivedByCharges),
    }).then(() => {
      addDoc(collection(firestore, "transactions"), {
        account_id: signedInUser.uid,
        amount: +receivedByCharges,
        status: "Выполнено",
        type: "Начисления",
        date: new Date(),
        email: signedInUser.email,
        executor: nickname,
      });

      updateDoc(doc(firestore, "users", signedInUser.email), {
        earned: increment(+receivedByCharges),
        [`paymentMethods.${paymentMethod}.available`]: increment(+receivedByCharges),
      });
    });
  };

  useEffect(() => {
    if (countdownIsEnded && receivedForDay) {
      setCharges(getElapsedDays(timeLeft));
    }
  }, [countdownIsEnded]);

  // const formattedDays = declensionNum(days, [t("personal.area_days_1"), "дня", "дней"]);
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
    <div className={styles["countdown-wrapper"]}>
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
    </div>
  );
};

export { CountdownTimer };
