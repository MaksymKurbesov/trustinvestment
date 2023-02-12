import React from "react";
import styles from "./Roadmap.module.css";

const Roadmap = () => {
  return (
    <section className={styles["timeline"]}>
      <h1>Roadmap Trust Investment </h1>
      <p className={styles["leader"]}>По мере выполнения пунктов или добавления новых - карта будет обновляться.</p>
      <div className={styles["demo-card-wrapper"]}>
        <div data-aos={"fade-right"} className={`${styles["demo-card"]} ${styles["demo-card--step1"]}`}>
          <div className={styles["head"]}>
            <div className={styles["number-box"]}>
              <span>2013</span>
            </div>
            <h2>
              Май
              {/*<span className={styles["small"]}>Subtitle</span> Technology*/}
            </h2>
          </div>
          <div className={styles["body"]}>
            <p>Основание компании Trust Investment, как самостоятельного юридического лица в ОАЭ.</p>
            <img src="http://placehold.it/1000x500" alt="Graphic" />
          </div>
        </div>

        <div data-aos={"fade-left"} className={`${styles["demo-card"]} ${styles["demo-card--step2"]}`}>
          <div className={styles["head"]}>
            <div className={styles["number-box"]}>
              <span>2019</span>
            </div>
            <h2>
              {/*<span className={styles["small"]}>Subtitle</span> Confidence*/}
              <span className={styles["small"]}></span> Сентябрь
            </h2>
          </div>
          <div className={styles["body"]}>
            <p>Построено более 200 объектов недвижимости на территории ОАЭ.</p>
            <img src="http://placehold.it/1000x500" alt="Graphic" />
          </div>
        </div>

        <div data-aos={"fade-right"} className={`${styles["demo-card"]} ${styles["demo-card--step3"]}`}>
          <div className={styles["head"]}>
            <div className={styles["number-box"]}>
              <span>2020</span>
            </div>
            <h2>
              {/*<span className={styles["small"]}>Subtitle</span> Adaptation*/}
              <span className={styles["small"]}></span> Январь
            </h2>
          </div>
          <div className={styles["body"]}>
            <p>Начало привлечения инвестиций со стороны корпоративного сектора.</p>
            <img src="http://placehold.it/1000x500" alt="Graphic" />
          </div>
        </div>

        <div data-aos={"fade-left"} className={`${styles["demo-card"]} ${styles["demo-card--step4"]}`}>
          <div className={styles["head"]}>
            <div className={styles["number-box"]}>
              <span>2020</span>
            </div>
            <h2>
              <span className={styles["small"]}></span> Июнь
            </h2>
          </div>
          <div className={styles["body"]}>
            <p>Запуск международной инвестиционной платформы Trust Investment для частных лиц.</p>
            <img src="http://placehold.it/1000x500" alt="Graphic" />
          </div>
        </div>

        <div data-aos={"fade-right"} className={`${styles["demo-card"]} ${styles["demo-card--step5"]}`}>
          <div className={styles["head"]}>
            <div className={styles["number-box"]}>
              <span>2022</span>
            </div>
            <h2>
              <span className={styles["small"]}></span> Декабрь
            </h2>
          </div>
          <div className={styles["body"]}>
            <p>Онлайн инвестиции для клиентов из стран Европы и Азии.</p>
            <img src="http://placehold.it/1000x500" alt="Graphic" />
          </div>
        </div>
        <div data-aos={"fade-left"} className={`${styles["demo-card"]} ${styles["demo-card--step6"]}`}>
          <div className={styles["head"]}>
            <div className={styles["number-box"]}>
              <span>2023</span>
            </div>
            <h2>
              <span className={styles["small"]}></span> Июнь
            </h2>
          </div>
          <div className={styles["body"]}>
            <p>Запуск международного приложения Trust Investment для большего удобства платформы.</p>
            <img src="http://placehold.it/1000x500" alt="Graphic" />
          </div>
        </div>
        <div data-aos={"fade-right"} className={`${styles["demo-card"]} ${styles["demo-card--step7"]}`}>
          <div className={styles["head"]}>
            <div className={styles["number-box"]}>
              <span>2025</span>
            </div>
            <h2>
              <span className={styles["small"]}></span> Февраль
            </h2>
          </div>
          <div className={styles["body"]}>
            <p>
              Компания Trust Investment будет принимать участие в постройке здания, занимающего 5-ку лидеров по высоте.
            </p>
            <img src="http://placehold.it/1000x500" alt="Graphic" />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Roadmap };
