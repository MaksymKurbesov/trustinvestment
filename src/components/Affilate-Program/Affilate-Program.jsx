import styles from "./Affilate-Program.module.css";
import useLottie from "lottie-react";
import partnerAnimation from "assets/lottie-animations/partner-animation.json";
import Coins from "../../assets/images/coins.png";
import { useTranslation } from "react-i18next";

const AffilateProgram = () => {
  const PartnerAnimation = useLottie({
    animationData: partnerAnimation,
  });
  const { t, i18n } = useTranslation();

  return (
    <section className={styles["affilate-program"]}>
      <div className={"container"}>
        <h2 data-aos="fade-down" className={`${styles["affilate-title"]} section-title`}>
          {t("partners.title")}
        </h2>
        <div className={styles["affilate-program__wrapper"]}>
          <p data-aos="fade-down" className={styles["desktop-text"]}>
            {t("partners.subtitle")}
          </p>
          <div className={styles["wrapper"]}>
            <div className={styles["program-description"]} data-aos="fade-left">
              <div className={styles["partner-animation"]} data-aos="fade-right">
                {PartnerAnimation}
              </div>
            </div>
            <p data-aos="fade-down" className={styles["mobile-text"]}>
              {t("partners.subtitle")}
            </p>
            <div className={styles["percentage-levels"]} data-aos="fade-right">
              {/*<span>Level 1</span>*/}
              {/*<span>Level 2</span>*/}
              {/*<span>Level 3</span>*/}
              {/*<span>Level 4</span>*/}
              {/*<span>Level 5</span>*/}
              <img src={Coins} width={"100%"} className={styles["coins"]} />
              <p>{t("partners.levels_title")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AffilateProgram };
