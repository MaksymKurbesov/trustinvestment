import styles from "./Personal-Area.module.css";
import InvestmentIcon from "assets/images/user-statistic/Investment.png";
import EarnedIcon from "assets/images/user-statistic/Earned.png";
import WithdrawnIcon from "assets/images/user-statistic/Withdrawn.png";
import ReferalsIcon from "assets/images/user-statistic/Referals.png";
import { DepositsStatus } from "components/Deposits-Status/Deposits-Status";
import { TimeToPayment } from "components/Time-To-Payment/Time-To-Payment";
import { UserWallets } from "components/Wallets/UserWallets";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../components/Auth-Provider/AuthContext";

const PersonalArea = () => {
  const { currentUser } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(0);
  const [charges, setCharges] = useState(0);

  useEffect(() => {
    if (currentUser && currentUser.deposits.active.length > 0) {
      const activeDeposits = currentUser.deposits.active;
      setStartDate(activeDeposits[activeDeposits.length - 1].date);
      setCharges(activeDeposits[activeDeposits.length - 1].charges);
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className={`${styles["my-account-page"]} accountRoot`}>
      <h2 className={"my-account-title"}>Личный кабинет</h2>
      <div className={styles["my-account"]}>
        <UserWallets paymentMethods={currentUser.paymentMethods} />
        <div className={styles["user-statistic"]}>
          <div className={styles["user-statistic__item"]}>
            <img src={InvestmentIcon} width={50} alt={"Иконка"} />
            <div className={styles["info"]}>
              <p>Инвестировано:</p>
              <span>{currentUser.invested} USD</span>
            </div>
          </div>
          <div className={styles["user-statistic__item"]}>
            <img src={EarnedIcon} width={50} alt={"Иконка"} />
            <div className={styles["info"]}>
              <p>Заработано:</p>
              <span>{currentUser.earned} USD</span>
            </div>
          </div>
          <div className={styles["user-statistic__item"]}>
            <img src={WithdrawnIcon} width={50} alt={"Иконка"} />
            <div className={styles["info"]}>
              <p>Выведено:</p>
              <span>{currentUser.withdrawn} USD</span>
            </div>
          </div>
          <div className={styles["user-statistic__item"]}>
            <img src={ReferalsIcon} width={50} alt={"Иконка"} />
            <div className={styles["info"]}>
              <p>Реферальных:</p>
              <span>{currentUser.referals} USD</span>
            </div>
          </div>
        </div>
        <DepositsStatus />
        <TimeToPayment charges={charges + 1} startDate={startDate} isCommonPlan={true} />
      </div>
    </div>
  );
};

export { PersonalArea };
