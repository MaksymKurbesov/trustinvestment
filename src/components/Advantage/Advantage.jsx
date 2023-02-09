import styles from "./Advantage.module.css";
import CountUp, { useCountUp } from "react-countup";
import { ADVANTAGES_LIST } from "./ADVANTAGES_LIST";

const Advantage = () => {
  return (
    <section className={styles["advantage"]}>
      <div className={`${styles["advantage-container"]}`}>
        <h2 data-aos="fade-up" className={`${styles["advantage-title"]} section-title`}>
          Преимущества работы
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
                <CountUp end={100} enableScrollSpy scrollSpyDelay={1000}>
                  {({ countUpRef }) => {
                    return <span ref={countUpRef} />;
                  }}
                </CountUp>
                <p>Компаний</p>
              </li>
              <li>
                <CountUp end={50} enableScrollSpy={true} scrollSpyDelay={1000}>
                  {({ countUpRef }) => {
                    return <span ref={countUpRef} />;
                  }}
                </CountUp>
                <p>Членов команды</p>
              </li>
              <li>
                <CountUp end={2} prefix={"$"} suffix={"M"} enableScrollSpy={true} scrollSpyDelay={1000}>
                  {({ countUpRef }) => {
                    return <span ref={countUpRef} />;
                  }}
                </CountUp>
                <p>Капитал</p>
              </li>
              <li>
                <CountUp end={7} enableScrollSpy={true} scrollSpyDelay={1000}>
                  {({ countUpRef }) => {
                    return <span ref={countUpRef} />;
                  }}
                </CountUp>
                <p>Год опыта</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Advantage };
