import styles from "./Time-To-Payment.module.css";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";
import waitAnimation from "assets/lottie-animations/wait-animation.json";
import useLottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Auth-Provider/AuthContext";
import { doc, increment, updateDoc } from "firebase/firestore";
import { FirebaseContext } from "../../index";

const TimeToPayment = ({ startDate, charges }) => {
  const [startTime, setStartTime] = useState(new Date());
  const { currentUser } = useContext(AuthContext);
  const { firestore } = useContext(FirebaseContext);

  const startTimer = () => {
    const t = new Date(startTime);
    t.setDate(t.getDate() + charges);
    return t;
  };

  const resetTimer = () => {
    const activeDeposits = currentUser.deposits.active;
    const activeDepositsLastItem = activeDeposits[activeDeposits.length - 1];
    const receivedForDay = +(activeDepositsLastItem.willReceived / activeDepositsLastItem.days).toFixed(2);

    activeDepositsLastItem.charges += 1;
    activeDepositsLastItem.received += receivedForDay;

    updateDoc(doc(firestore, "users", currentUser.email), {
      "deposits.active": [...activeDeposits],
      earned: increment(receivedForDay),
    });
  };

  useEffect(() => {
    const t = new Date(startDate.seconds * 1000);
    setStartTime(t);
  }, [startDate]);

  const WaitAnimation = useLottie({
    animationData: waitAnimation,
  });

  return (
    <div className={styles["time-to-payment"]}>
      <div className={styles["wrapper"]}>
        {WaitAnimation}
        <CountdownTimer targetDate={startDate !== 0 ? startTimer() : 0} resetHandler={resetTimer} />
      </div>
    </div>
  );
};

export { TimeToPayment };
