import { useCountdown } from "../../hooks/useCountdown";
import styles from "./CountdownTimer.module.css";
import { declensionNum } from "../../utils/helpers";
import { useTranslation } from "react-i18next";

const CountdownTimer = ({ targetDate = 0, cn }) => {
  const [days, hours, minutes, seconds] = useCountdown(typeof targetDate === "number" ? targetDate : null);
  const { t } = useTranslation();

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
        <p className={styles["success"]}>{t("sign_in.success")}</p>
      ) : (
        <div className={styles["countdown"]}>
          {days < 0 ? (
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
