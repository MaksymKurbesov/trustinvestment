import styles from "./Time-To-Payment.module.css";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";
import waitAnimation from "assets/lottie-animations/wait-animation.json";
import useLottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Auth-Provider/AuthContext";
import { addDoc, collection, doc, increment, query, updateDoc, where } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { FullTimer } from "../Timer/FullTimer";

const TimeToPayment = ({ activeDeposits, timersHandler }) => {
  const [nearestReward, setNearestReward] = useState(new Date());
  const { currentUser } = useContext(AuthContext);
  const { firestore } = useContext(FirebaseContext);
  const [isRewarded, setIsRewarded] = useState(false);
  const q = query(collection(firestore, "users", currentUser.email, "deposits"), where("status", "==", "active"));

  const getNearestAccrualDate = (deposits) => {
    let nearestDate;
    let nearestDateArray = [];

    deposits.forEach((deposit) => {
      nearestDate = new Date(deposit.date.seconds * 1000);
      nearestDate.setDate(nearestDate.getDate() + deposit.charges + 1);

      let rewardDate = Date.now() * 1000 - deposit.date.seconds;

      nearestDateArray.push(nearestDate.getTime());
      timersHandler(nearestDateArray);

      if (rewardDate < nearestDate) {
        nearestDate = rewardDate;
      }
    });

    return nearestDate.getTime();
  };

  useEffect(() => {
    if (activeDeposits.length === 0) return;
    setNearestReward(getNearestAccrualDate(activeDeposits));
  }, [activeDeposits]);

  useEffect(() => {
    // onSnapshot(q, (changedDoc) => {
    //   if (isRewarded) return;
    //   changedDoc.docChanges().forEach((item) => {
    //     if (item.type === "modified") {
    //       setStartTime(getNearestAccrualDate(activeDeposits));
    //       setIsRewarded(false);
    //     }
    //   });
    // });
  }, []);

  useEffect(() => {
    if (activeDeposits.length === 0) return;

    activeDeposits.forEach((deposit, index) => {
      const nextDepositRewardDate = new Date(deposit.date.seconds * 1000);
      nextDepositRewardDate.setDate(nextDepositRewardDate.getDate() + deposit.charges + 1);
      const receivedForDay = deposit.willReceived / deposit.days;

      const intervalFn = () => {
        if (nextDepositRewardDate.getTime() < nearestReward && !isRewarded) {
          setIsRewarded(true);

          updateDoc(doc(firestore, "users", currentUser.email, "deposits", `${index}`), {
            charges: increment(1),
            received: increment(Math.round(receivedForDay)),
          }).then(() => {
            setIsRewarded(false);
            addDoc(collection(firestore, "transactions"), {
              account_id: currentUser.uid,
              amount: receivedForDay,
              status: "Выполнено",
              type: "Начисления",
              date: new Date(),
              email: currentUser.email,
              executor: currentUser.nickname,
            });
          });

          updateDoc(doc(firestore, "users", currentUser.email), {
            earned: increment(receivedForDay),
          });

          clearInterval(rewardInterval);
        }
      };

      const rewardInterval = setInterval(intervalFn, 1000);
    });
  }, [activeDeposits]);

  const WaitAnimation = useLottie({
    animationData: waitAnimation,
  });

  return (
    <div className={styles["time-to-payment"]}>
      <div className={styles["wrapper"]}>
        {WaitAnimation}
        {/*{nearestReward === 0 ? (*/}
        {/*  "Сделайте первый вклад"*/}
        {/*) : (*/}
        {/*  <>*/}
        {/*    <p>Следующее начисление через</p>*/}

        {/*  </>*/}
        {/*)}*/}
        <div className={styles["next-accrual"]}>
          <p>Следующее начисление через</p>
          <CountdownTimer targetDate={nearestReward} resetHandler={() => {}} />
        </div>

        {/*<FullTimer />*/}
      </div>
    </div>
  );
};

export { TimeToPayment };
