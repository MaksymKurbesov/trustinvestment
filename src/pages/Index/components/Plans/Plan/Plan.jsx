import styles from "./Plan.module.css";
import { useTranslation } from "react-i18next";

const Plan = ({ plan, index }) => {
  const { t } = useTranslation();

  return (
    <div className={`${styles[`plan${index + 1}`]} ${styles["plan"]}`}>
      <div className={`${styles["plan-card"]}`}>
        <p className={styles["plan-payment"]}>{plan.payout}</p>
        <div className={styles["plan-name"]}>
          <p>{t("tariffs.plan")}</p>
          <p>{plan.name}</p>
        </div>
        <div className={styles["card-info-wrapper"]}>
          {!plan.individual ? (
            <>
              <div className={styles["card-info"]}>
                <p>{plan.payouts}</p>
                <span>{plan.percent}%</span>
              </div>
              <div className={styles["card-info"]}>
                <p>{t("tariffs.days")}</p> <span>{plan.days}</span>
              </div>
            </>
          ) : null}
          <div className={styles["card-info"]}>
            <p>{t("tariffs.min")}</p> <span>{plan.min}$</span>
          </div>
          <div className={styles["card-info"]}>
            <p>{t("tariffs.max")}</p>
            <span>{plan.max}$</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Plan };
