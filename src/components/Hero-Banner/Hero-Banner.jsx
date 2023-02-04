import styles from "./Hero-Banner.module.css";
import { useEffect } from "react";

const HeroBanner = () => {
  return (
    <section className={`${styles["hero-banner-wrapper"]} devtools`}>
      <div className={styles["texts"]}>
        <h1 data-aos="fade-up">TRUST INVESTMENT</h1>
        <p>
          Мы международный холдинг по работе с недвижимостью на рынке ОАЭ,
          который объединяет сразу несколько глобальных направлений, таких как:
          инвестиционная онлайн платформа, строительство и проектирование, отдел
          продаж и сдачи в аренду, отдел планирования и разработок.
        </p>
      </div>
    </section>
  );
};

export { HeroBanner };
