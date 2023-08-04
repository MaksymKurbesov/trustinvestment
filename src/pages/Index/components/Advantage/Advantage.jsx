import styles from "./Advantage.module.css";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import Advantage1 from "../../../../assets/images/advantages/Asset 1.svg";
import Advantage2 from "../../../../assets/images/advantages/Asset 2.svg";
import Advantage3 from "../../../../assets/images/advantages/Asset 3.svg";
import Advantage4 from "../../../../assets/images/advantages/Asset 4.svg";
import Advantage5 from "../../../../assets/images/advantages/Asset 6.svg";
import Advantage6 from "../../../../assets/images/advantages/Asset 5.svg";

const Advantage = () => {
  const { t } = useTranslation();
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

  const STATISTIC_COUNTS = [
    {
      end: 50,
      prefix: "",
      suffix: "",
      title: t("statistic.companies"),
    },
    {
      end: 200,
      prefix: "",
      suffix: "",
      title: t("statistic.team_members"),
    },
    {
      end: 250,
      prefix: "$",
      suffix: "M",
      title: t("statistic.capital"),
    },
    {
      end: 10,
      prefix: "",
      suffix: "",
      title: t("statistic.year_of_experience"),
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
              {STATISTIC_COUNTS.map((item) => {
                const { end, prefix, suffix, title } = item;

                return (
                  <li>
                    <CountUp end={end} prefix={prefix} suffix={suffix} enableScrollSpy scrollSpyDelay={1000}>
                      {({ countUpRef }) => {
                        return <span ref={countUpRef} />;
                      }}
                    </CountUp>
                    <p>{title}</p>
                  </li>
                );
              })}
            </ul>
            <div className={styles["video-presentation"]}>
              <h2 data-aos="fade-left" className={`${styles["presentation-title"]} section-title`}>
                {t("statistic.video_presentation")}
              </h2>
              <iframe
                data-aos="fade-right"
                width="720"
                height="420"
                src="https://www.youtube.com/embed/n67lcXDWKzM"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Advantage };
