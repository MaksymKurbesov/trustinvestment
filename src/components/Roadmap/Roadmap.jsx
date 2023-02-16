import React from "react";
import styles from "./Roadmap.module.css";
import Background from "assets/images/roadmap.png";
import DashedLine from "assets/images/dashed-line-long.png";

const Roadmap = () => {
  return (
    <div className={styles["roadmap"]}>
      <h2>Roadmap Trust Investment</h2>
      <ul className={styles["roadmap-list"]}>
        <li>
          <div className={styles["text"]}>
            <span>Май 2013</span>{" "}
            <p>Основание компании Trust Investment как самостоятельного юридического лица в ОАЭ.</p>
          </div>
          <img className={styles["dashed-line"]} src={DashedLine} width={150} />
        </li>
        <li>
          <div className={styles["text"]}>
            <span> Сентябрь 2019</span> <p>Построено более 200 объектов недвижимости на территории ОАЭ.</p>
          </div>
          <img className={styles["dashed-line2"]} src={DashedLine} width={150} />
        </li>
        <li>
          <div className={styles["text"]}>
            <span> Январь 2020</span> <p>Начало привлечений инвестиций со стороны корпоративного сектора.</p>
          </div>
          <img className={styles["dashed-line"]} src={DashedLine} width={150} />
        </li>
        <li>
          <div className={styles["text"]}>
            <span> Июнь 2020</span>
            <p>
              Запуск международной онлайн платформы Trust Investment для частных лиц, что бы развиваться и зарабатывать
              мог каждый желающий.
            </p>
          </div>
          <img className={styles["dashed-line2"]} src={DashedLine} width={150} />
        </li>
        <li>
          <div className={styles["text"]}>
            <span> Декабрь 2022</span> <p>Открытие возможности онлайн инвестиций для клиентов из Европы и Азии.</p>
          </div>
          <img className={styles["dashed-line"]} src={DashedLine} width={150} />
        </li>
        <li>
          <div className={styles["text"]}>
            <span> Июль 2023</span>{" "}
            <p>Запуск международного приложения «Trust Investment» для большего удобства платформы.</p>
          </div>
          <img className={styles["dashed-line2"]} src={DashedLine} width={150} />
        </li>
        <li>
          <div className={styles["text"]}>
            <span> Февраль 2025</span>
            <p>
              Компания Trust Investment будет принимать участие в постройке здания, входящее в 5-ку лидеров по своей
              высоте.
            </p>
          </div>
        </li>
      </ul>
      {/*<img className={styles["background"]} src={Background} alt={""} />*/}
    </div>
  );
};

export { Roadmap };
