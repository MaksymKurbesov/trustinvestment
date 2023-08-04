import styles from "./Plan.module.css";
import { useTranslation } from "react-i18next";

const Plan = ({ plan }) => {
  const { t } = useTranslation();

  return (
    <div className={`${styles["plan"]}`}>
      <div className={`${styles["plan-card"]}`}>
        <div className={styles["plan-name"]}>
          <p>{t("tariffs.plan")}</p>
          <p>{plan.projectName}</p>
        </div>
        <div className={styles["image-wrapper"]}>
          <img className={styles["plan-image"]} src={plan.image} width={"100%"} height={300} />
          <p className={styles["plan-payment"]}>{plan.payout}</p>
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
