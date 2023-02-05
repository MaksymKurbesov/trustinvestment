import styles from "./Time-To-Payment.module.css";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";
import waitAnimation from "assets/lottie-animations/wait-animation.json";
import useLottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Auth-Provider/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { FirebaseContext } from "../../index";

const TimeToPayment = ({ startDate, isCommonPlan, charges }) => {
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
    let earned = currentUser.earned;
    const receivedForDay = activeDepositsLastItem.willReceived / activeDepositsLastItem.days;

    activeDepositsLastItem.charges += 1;
    activeDepositsLastItem.received += receivedForDay;
    earned += receivedForDay;

    updateDoc(doc(firestore, "users", currentUser.email), {
      "deposits.active": [...activeDeposits],
      earned: earned,
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
