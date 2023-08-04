import styles from "./Hero-Banner.module.css";
import useLottie from "lottie-react";
import BackgroundDubaiImage from "../../../../assets/images/hero-banner2.webp";
import LineWaves from "../../../../assets/lottie-animations/line-waves2.json";
import { useTranslation } from "react-i18next";
import { Waves } from "../../../../components/Waves/Waves";

const HeroBanner = () => {
  const lottieAnimation = useLottie({
    animationData: LineWaves,
  });
  const { t } = useTranslation();

  return (
    <section className={`${styles["hero-banner-wrapper"]} devtools`}>
      <div className={styles["background-dubai"]}>
        <img src={BackgroundDubaiImage} alt={""} data-aos="fade-left" data-aos-delay={300} />
      </div>
      <div className={styles["texts"]}>
        <h1 data-aos="fade-up" data-aos-delay={500}>
          {t("app_name")}
        </h1>

        <p data-aos="fade-down" data-aos-delay={500}>
          {t("hero_text")}
        </p>
      </div>
      <div id="lottie-animation" className={styles["lottie-animation"]} data-aos="new-animation" data-aos-delay={500}>
        {lottieAnimation}
      </div>

      <Waves cn={"hero-banner-waves"} />
    </section>
  );
};

export { HeroBanner };
