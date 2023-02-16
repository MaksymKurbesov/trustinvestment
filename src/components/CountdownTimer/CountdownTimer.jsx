import { useCountdown } from "../../hooks/useCountdown";
import styles from "./CountdownTimer.module.css";
import { useContext, useEffect } from "react";
import { addDoc, collection, doc, increment, updateDoc } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import AuthContext from "../Auth-Provider/AuthContext";
import { declensionNum } from "../../utils/helpers";

const SECONDS_IN_DAY = 86400;

const CountdownTimer = ({ targetDate = 0, depositID, receivedForDay, nickname, paymentMethod }) => {
  const { signedInUser } = useContext(AuthContext);
  const { firestore } = useContext(FirebaseContext);
  const [days, hours, minutes, seconds, timeLeft] = useCountdown(targetDate);
  // const countdownIsEnded = days === 0 && hours === 0 && minutes === 0 && seconds <= 1;
  const countdownIsEnded = timeLeft <= 0;

  const getElapsedDays = (time) => {
    let elapsedDays = Math.floor(Math.abs(time) / (86400 * 1000));
    return elapsedDays + 1;
  };

  const setCharges = (days) => {
    const receivedByCharges = receivedForDay * days;

    updateDoc(doc(firestore, "users", signedInUser.email, "deposits", `${depositID}`), {
      charges: increment(days),
      received: increment(+receivedByCharges.toFixed(2)),
    }).then(() => {
      addDoc(collection(firestore, "transactions"), {
        account_id: signedInUser.uid,
        amount: receivedByCharges,
        status: "Выполнено",
        type: "Начисления",
        date: new Date(),
        email: signedInUser.email,
        executor: nickname,
      });

      updateDoc(doc(firestore, "users", signedInUser.email), {
        earned: increment(receivedByCharges),
        [`paymentMethods.${paymentMethod}.available`]: increment(receivedByCharges),
      });
    });
  };

  // console.log(timeLeft, "timeLeft");

  useEffect(() => {
    if (countdownIsEnded && receivedForDay) {
      setCharges(getElapsedDays(timeLeft));
    }
  }, [countdownIsEnded]);

  const formattedDays = declensionNum(days, ["день", "дня", "дней"]);
  const formattedHours = declensionNum(hours, ["час", "часа", "часов"]);
  const formattedMinutes = declensionNum(minutes, ["минута", "минуты", "минут"]);
  const formattedSeconds = declensionNum(seconds, ["секунда", "секунды", "секунд"]);

  return (
    <div className={styles["countdown-wrapper"]}>
      <div className={styles["countdown"]}>
        {days === -1 ? (
          "Загрузка..."
        ) : (
          <>
            {/*<div className={styles["days"]}>{`${days} ${formattedDays}`}</div>*/}
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
