import styles from "./Time-To-Payment.module.css";
import { CountdownTimer } from "../../../../components/CountdownTimer/CountdownTimer";
import waitAnimation from "assets/lottie-animations/wait-animation.json";
import useLottie from "lottie-react";
import { useTranslation } from "react-i18next";

const TimeToPayment = ({ nearestAccrual }) => {
  const { t } = useTranslation();

  const WaitAnimation = useLottie({
    animationData: waitAnimation,
  });

  return (
    <div className={styles["time-to-payment"]}>
      <div className={styles["wrapper"]}>
        {WaitAnimation}
        <div className={styles["next-accrual"]}>
          <p>{t("personal_area.next_accrual_in")}</p>
          {nearestAccrual ? <CountdownTimer targetDate={nearestAccrual} /> : t("personal_area.loading")}
        </div>
      </div>
    </div>
  );
};

export { TimeToPayment };
