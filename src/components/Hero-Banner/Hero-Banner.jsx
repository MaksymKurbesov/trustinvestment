import styles from "./Hero-Banner.module.css";
import { useEffect, useRef, useState } from "react";
import useLottie from "lottie-react";
import heroAnimation from "../../assets/lottie-animations/hero-animation.json";
import BackgroundImage from "../../assets/images/main-bg.svg";
import BackgroundDubaiImage from "../../assets/images/hero-banner2.webp";
import LineWaves from "../../assets/lottie-animations/line-waves2.json";

const HeroBanner = () => {
  const lottieAnimation = useLottie({
    animationData: LineWaves,
  });

  return (
    <section data-aos="fade-right" data-aos-delay={500} className={`${styles["hero-banner-wrapper"]} devtools`}>
      <div className={styles["background-dubai"]}>
        <img src={BackgroundDubaiImage} alt={""} />
      </div>
      <div className={styles["texts"]}>
        <h1 data-aos="fade-up" data-aos-delay={500}>
          TRUST INVESTMENT
        </h1>

        <p data-aos="fade-down" data-aos-delay={500}>
          Мы международный холдинг по работе с недвижимостью на рынке ОАЭ, который объединяет сразу несколько глобальных
          направлений, таких как: инвестиционная онлайн платформа, строительство и проектирование, отдел продаж и сдачи
          в аренду, отдел планирования и разработок.
        </p>
      </div>
      <div id="lottie-animation" className={styles["lottie-animation"]}>
        {lottieAnimation}
      </div>
      <svg
        className={styles["waves"]}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0
          24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g className={styles["parallax"]}>
          <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(0, 21, 41, 0.8)" />
          <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(0, 21, 41, 0.5)" />
          <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(0, 21, 41, 0.3)" />
          <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(0, 21, 41, 1)" />
        </g>
      </svg>
    </section>
  );
};

export { HeroBanner };
