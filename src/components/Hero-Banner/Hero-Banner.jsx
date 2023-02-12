import styles from "./Hero-Banner.module.css";
import { useEffect } from "react";
import useLottie from "lottie-react";
import heroAnimation from "../../assets/lottie-animations/hero-animation.json";

const HeroBanner = () => {
  const lottieAnimation = useLottie({
    animationData: heroAnimation,
  });

  return (
    <section data-aos="fade-right" className={`${styles["hero-banner-wrapper"]} devtools`}>
      <div className={styles["texts"]}>
        <h1 data-aos="fade-up">TRUST INVESTMENT</h1>
        {/*<p data-aos="fade-down">*/}
        {/*  Мы международный холдинг по работе с недвижимостью на рынке ОАЭ, который объединяет сразу несколько глобальных*/}
        {/*  направлений, таких как: инвестиционная онлайн платформа, строительство и проектирование, отдел продаж и сдачи*/}
        {/*  в аренду, отдел планирования и разработок.*/}
        {/*</p>*/}
      </div>
      {/*<div className={styles["lottie-animation"]}>{lottieAnimation}</div>*/}
    </section>
  );
};

export { HeroBanner };
