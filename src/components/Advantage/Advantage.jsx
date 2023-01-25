import styles from "./Advantage.module.css";
import CountUp, { useCountUp } from "react-countup";

const Advantage = () => {
  return (
    <section className={styles["advantage"]}>
      <div className={`${styles["advantage-container"]}`}>
        <h2 data-aos="fade-up" className={"section-title"}>
          Преимущества работы
        </h2>
        <div data-aos="fade-up" className={styles["advantage-wrapper"]}>
          <p className={styles["advantage-text"]}>
            Потребности клиентов всегда были основной ценностью Azizi
            Properties, а значит и нашими, так как наша кампания родилась внутри
            Azizi. Поэтому были созданы объекты, обеспечивающие современную
            городскую жизнь и в то же время обеспечивающие безопасность и
            безопасность для славной семейной жизни. Azizi Properties завоевала
            множество наград за свою недвижимость, в том числе, за ту
            недвижимость в постройке которой, Trust Investments брали участие,
            например, трижды подряд она получала награду «Девелопер года».
            Компания развивает не только отдельные проекты в сфере недвижимости,
            но часто целые сообщества, которые гарантируют высокий уровень жизни
            и идеальное сочетание семейной жизни, отдыха и бизнеса. Trust
            Investments использует опыт ведущих специалистов в области
            проектирования, строительства, маркетинга, менеджмента.
          </p>
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
                <CountUp
                  end={2}
                  suffix={"M"}
                  enableScrollSpy={true}
                  scrollSpyDelay={1000}
                >
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
