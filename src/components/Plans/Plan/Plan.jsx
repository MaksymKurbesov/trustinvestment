import styles from "./Plan.module.css";

const Plan = ({ plan, index }) => {
  return (
    <div
      className={styles["plans-list__item"]}
      data-aos="fade-up"
      data-aos-delay={100 * index}
    >
      <img src={plan.image} width={"100%"} height={250} alt={""} />
      <div className={styles["description"]}>
        <ul>
          <li>
            {plan.percent === "Индивидуально" ? (
              plan.percent
            ) : (
              <>
                <span>{plan.percent}%</span>в день
              </>
            )}
          </li>
          <li>
            <span>{plan.days}</span>
            дней
          </li>
          <li>
            <span>{plan.min}$</span>
            Мин. вклад
          </li>
          <li>
            <span>{plan.max}$</span>
            Макс. вклад
          </li>
        </ul>
      </div>
    </div>
  );
};

export { Plan };
