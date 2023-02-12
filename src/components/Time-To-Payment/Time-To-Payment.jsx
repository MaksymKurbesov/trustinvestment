import styles from "./Time-To-Payment.module.css";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";
import waitAnimation from "assets/lottie-animations/wait-animation.json";
import useLottie from "lottie-react";

const TimeToPayment = ({ nearestAccrual }) => {
  const WaitAnimation = useLottie({
    animationData: waitAnimation,
  });

  return (
    <div className={styles["time-to-payment"]}>
      <div className={styles["wrapper"]}>
        {WaitAnimation}
        <div className={styles["next-accrual"]}>
          <p>Следующее начисление через</p>
          {nearestAccrual ? <CountdownTimer targetDate={nearestAccrual} /> : "Загрузка..."}
        </div>
      </div>
    </div>
  );
};

export { TimeToPayment };
