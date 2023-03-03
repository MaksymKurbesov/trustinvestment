import styles from "./Time-To-Payment.module.css";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";
import waitAnimation from "assets/lottie-animations/wait-animation.json";
import useLottie from "lottie-react";
import { useTranslation } from "react-i18next";

const DAY_IN_MS = 86400 * 1000;

const TimeToPayment = ({ nearestAccrual, depositsIsEmpty }) => {
  const { t, i18n } = useTranslation();

  console.log(depositsIsEmpty, "depositsIsEmpty");

  const WaitAnimation = useLottie({
    animationData: waitAnimation,
  });

  return (
    <div className={styles["time-to-payment"]}>
      <div className={styles["wrapper"]}>
        {WaitAnimation}
        <div className={styles["next-accrual"]}>
          <p>{t("personal_area.next_accrual_in")}</p>
          {nearestAccrual || depositsIsEmpty ? (
            <CountdownTimer targetDate={nearestAccrual + DAY_IN_MS} />
          ) : (
            t("personal_area.loading")
          )}
        </div>
      </div>
    </div>
  );
};

export { TimeToPayment };
