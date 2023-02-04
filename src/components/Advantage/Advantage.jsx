import styles from "./Advantage.module.css";
import CountUp, { useCountUp } from "react-countup";
import Advantage1 from "assets/images/advantages/Asset 1.svg";
import Advantage2 from "assets/images/advantages/Asset 2.svg";
import Advantage3 from "assets/images/advantages/Asset 3.svg";
import Advantage4 from "assets/images/advantages/Asset 4.svg";
import Advantage5 from "assets/images/advantages/Asset 6.svg";
import Advantage6 from "assets/images/advantages/Asset 5.svg";

const Advantage = () => {
  return (
    <section className={styles["advantage"]}>
      <div className={`${styles["advantage-container"]}`}>
        <h2
          data-aos="fade-up"
          className={`${styles["advantage-title"]} section-title`}
        >
          Преимущества работы
        </h2>
        <div data-aos="fade-up" className={styles["advantage-wrapper"]}>
          <ul className={styles["advantages-list"]}>
            <li className={styles["advantages-list__item"]}>
              <div>
                <img src={Advantage1} height={100} />
                <h3>Впечатляющие результаты работы компании</h3>
              </div>
              <p>
                Спрос и заинтересованность компанией Trust Investment постоянно
                растёт, наш опыт накапливается и позволяет всегда добиваться
                поставленных целей.
              </p>
            </li>
            <li className={styles["advantages-list__item"]}>
              <div>
                <img src={Advantage2} height={100} />
                <h3>Современная онлайн платформа для инвестиций</h3>
              </div>
              <p>
                Для удобства клиента была разработана онлайн платформа с простым
                и информативным интерфейсом. Команда разработчиков работает над
                созданием приложения, что бы инвестиции стали еще проще и
                доступнее.
              </p>
            </li>
            <li className={styles["advantages-list__item"]}>
              <div>
                <img src={Advantage3} height={100} />
                <h3>Быстрый вывод прибыли</h3>
              </div>
              <p>
                Вы получите свою прибыль в течении 24 часов после оформления
                заявки даже в выходные дни и праздники.
              </p>
            </li>
            <li className={styles["advantages-list__item"]}>
              <div>
                <img src={Advantage4} height={100} />
                <h3>Низкий порог входа</h3>
              </div>
              <p>
                Вы можете начать инвестировать и зарабатывать, имея всего 100
                долларов. Выгодные тарифные планы для каждого.
              </p>
            </li>
            <li className={styles["advantages-list__item"]}>
              <div>
                <img src={Advantage5} height={100} />
                <h3>Реферальная программа </h3>
              </div>
              <p>
                С нами вы обретаете возможность привлечь друзей и
                единомышленников к инвестициям, получив при этом дополнительный
                доход.
              </p>
            </li>
            <li className={styles["advantages-list__item"]}>
              <div>
                <img src={Advantage6} height={100} />
                <h3>Защита наших клиентов</h3>
              </div>
              <p>
                Спокойствие наших партнеров и их уверенность в нас является
                приоритетом для нашей компании, поэтому наша платформа надежно
                защищена от неправомерных действий третьих лиц.
              </p>
            </li>
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
                <CountUp
                  end={2}
                  prefix={"$"}
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
