import styles from "./Advantage.module.css";
import CountUp, { useCountUp } from "react-countup";
import { useTranslation } from "react-i18next";
import Advantage1 from "../../../../assets/images/advantages/Asset 1.svg";
import Advantage2 from "../../../../assets/images/advantages/Asset 2.svg";
import Advantage3 from "../../../../assets/images/advantages/Asset 3.svg";
import Advantage4 from "../../../../assets/images/advantages/Asset 4.svg";
import Advantage5 from "../../../../assets/images/advantages/Asset 6.svg";
import Advantage6 from "../../../../assets/images/advantages/Asset 5.svg";

const Advantage = () => {
  const { t, i18n } = useTranslation();
  const ADVANTAGES_LIST = [
    {
      icon: Advantage1,
      title: t("benefits.1.title"),
      description: t("benefits.1.description"),
    },
    {
      icon: Advantage2,
      title: t("benefits.2.title"),
      description: t("benefits.2.description"),
    },
    {
      icon: Advantage3,
      title: t("benefits.3.title"),
      description: t("benefits.3.description"),
    },
    {
      icon: Advantage4,
      title: t("benefits.4.title"),
      description: t("benefits.4.description"),
    },
    {
      icon: Advantage5,
      title: t("benefits.5.title"),
      description: t("benefits.5.description"),
    },
    {
      icon: Advantage6,
      title: t("benefits.6.title"),
      description: t("benefits.6.description"),
    },
  ];

  return (
    <section className={styles["advantage"]}>
      <div className={`${styles["advantage-container"]}`}>
        <h2 data-aos="fade-up" className={`${styles["advantage-title"]} section-title`}>
          {t("benefits.title")}
        </h2>
        <div data-aos="fade-up" className={styles["advantage-wrapper"]}>
          <ul className={styles["advantages-list"]}>
            {ADVANTAGES_LIST.map((item, index) => {
              return (
                <li
                  key={index}
                  className={styles["advantages-list__item"]}
                  data-aos="fade-left"
                  data-aos-delay={100 * index}
                >
                  <div>
                    <img src={item.icon} height={100} />
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.description}</p>
                </li>
              );
            })}
          </ul>
          <div className={styles["statistic"]}>
            <ul className={styles["statistic-list"]}>
              <li>
                <CountUp end={50} enableScrollSpy scrollSpyDelay={1000}>
                  {({ countUpRef }) => {
                    return <span ref={countUpRef} />;
                  }}
                </CountUp>
                <p>{t("statistic.companies")}</p>
              </li>
              <li>
                <CountUp end={100} enableScrollSpy={true} scrollSpyDelay={1000}>
                  {({ countUpRef }) => {
                    return <span ref={countUpRef} />;
                  }}
                </CountUp>
                <p>{t("statistic.team_members")}</p>
              </li>
              <li>
                <CountUp end={250} prefix={"$"} suffix={"M"} enableScrollSpy={true} scrollSpyDelay={1000}>
                  {({ countUpRef }) => {
                    return <span ref={countUpRef} />;
                  }}
                </CountUp>
                <p>{t("statistic.capital")}</p>
              </li>
              <li>
                <CountUp end={10} enableScrollSpy={true} scrollSpyDelay={1000}>
                  {({ countUpRef }) => {
                    return <span ref={countUpRef} />;
                  }}
                </CountUp>
                <p>{t("statistic.year_of_experience")}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Advantage };
