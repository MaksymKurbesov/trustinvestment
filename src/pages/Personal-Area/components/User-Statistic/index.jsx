import React from "react";
import styles from "./User-Statistic.module.css";
import InvestmentIcon from "../../../../assets/images/user-statistic/Investment.png";
import EarnedIcon from "../../../../assets/images/user-statistic/Earned.png";
import WithdrawnIcon from "../../../../assets/images/user-statistic/Withdrawn.png";
import ReferalsIcon from "../../../../assets/images/user-statistic/Referals.png";
import { useTranslation } from "react-i18next";

const UserStatistic = ({ userData }) => {
  const { t } = useTranslation();

  return (
    <div className={styles["user-statistic"]}>
      <div className={styles["user-statistic__item"]}>
        <img src={InvestmentIcon} width={50} alt={"Иконка"} />
        <div className={styles["info"]}>
          <p>{t("personal_area.invested")}:</p>
          <span>{userData.invested.toFixed(1)} USD</span>
        </div>
      </div>
      <div className={styles["user-statistic__item"]}>
        <img src={EarnedIcon} width={50} alt={"Иконка"} />
        <div className={styles["info"]}>
          <p>{t("personal_area.earned")}:</p>
          <span>{userData.earned.toFixed(1)} USD</span>
        </div>
      </div>
      <div className={styles["user-statistic__item"]}>
        <img src={WithdrawnIcon} width={50} alt={"Иконка"} />
        <div className={styles["info"]}>
          <p>{t("personal_area.withdrawn")}:</p>
          <span>{userData.withdrawn.toFixed(1)} USD</span>
        </div>
      </div>
      <div className={styles["user-statistic__item"]}>
        <img src={ReferalsIcon} width={50} alt={"Иконка"} />
        <div className={styles["info"]}>
          <p>{t("personal_area.referrals")}:</p>
          <span>{userData.referals.toFixed(1)} USD</span>
        </div>
      </div>
    </div>
  );
};

export { UserStatistic };
