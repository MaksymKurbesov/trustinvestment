import { useCountdown } from "../../hooks/useCountdown";
import styles from "./CountdownTimer.module.css";
import { useEffect } from "react";

function declensionNum(num, words) {
  return words[num % 100 > 4 && num % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]];
}

const CountdownTimer = ({ targetDate = 0, resetHandler }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const countdownIsEnded = days === 0 && hours === 0 && minutes === 0 && seconds === 1;

  useEffect(() => {
    if (countdownIsEnded) {
      resetHandler();
    }
  }, [seconds]);

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
