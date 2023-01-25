import styles from "./Time-To-Payment.module.css";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";
import waitAnimation from "assets/lottie-animations/wait-animation.json";
import useLottie from "lottie-react";

const TimeToPayment = () => {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date("2023, 01, 30").getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  const WaitAnimation = useLottie({
    animationData: waitAnimation,
  });

  return (
    <div className={styles["time-to-payment"]}>
      <div className={styles["wrapper"]}>
        {WaitAnimation}
        <CountdownTimer targetDate={dateTimeAfterThreeDays} />
      </div>
    </div>
  );
};

export { TimeToPayment };
