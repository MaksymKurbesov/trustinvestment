import styles from "./Plan.module.css";
import { useTranslation } from "react-i18next";

const Plan = ({ plan, index }) => {
  const { image, percent, days, min, max } = plan;
  const { t, i18n } = useTranslation();

  return (
    <div className={styles["plans-list__item"]} data-aos="fade-up" data-aos-delay={100 * index}>
      <div className={styles["plan-count"]}>
        {t("tariffs.plan")} {index + 1}
      </div>
      <img src={image} width={"100%"} height={250} alt={""} />
      <div className={styles["description"]}>
        <ul>
          <li className={percent === "Индивидуально" ? styles["plan-percent"] : ""}>
            {percent === "Индивидуально" ? (
              <p>{t("tariffs.individually")}</p>
            ) : (
              <>
                <span>{percent}%</span>
                {index === 3 || index === 4 ? `${t("tariffs.end_term")}` : `${t("tariffs.in_day")}`}
              </>
            )}
          </li>
          {index === 5 ? null : (
            <li>
              <span>{days}</span>
              {t("tariffs.days")}
            </li>
          )}
          <li>
            <span>{min}$</span>
            {t("tariffs.min")}
          </li>
          <li>
            <span>{max}$</span>
            {t("tariffs.max")}
          </li>
        </ul>
      </div>
    </div>
  );
};

export { Plan };
