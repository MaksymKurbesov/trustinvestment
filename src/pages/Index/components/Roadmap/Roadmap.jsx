import React from "react";
import styles from "./Roadmap.module.css";
// import DashedLine from "assets/images/dashed-line-long.png";
// import DashedLine from "assets/images/dashed-line-new.svg";
import { useTranslation } from "react-i18next";
import { DashedLine } from "./Dashed-Line";

const Roadmap = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles["roadmap"]}>
      <h2 data-aos="fade-down">TRUST INVESTMENT ROADMAP</h2>
      <ul className={styles["roadmap-list"]}>
        <li data-aos="fade-right" data-aos-offset={200}>
          <div className={styles["text"]}>
            <span>{t("roadmap.may")} 2013</span>
            <p>{t("roadmap.1")}</p>
          </div>

          <DashedLine cn={"dashed-line"} />
          {/*<img className={styles["dashed-line"]} src={DashedLine} width={150} />*/}
        </li>
        <li data-aos="fade-right" data-aos-offset={200} data-aos-delay={window.innerWidth < 800 ? 0 : 200}>
          <div className={styles["text"]}>
            <span>{t("roadmap.september")} 2019</span>
            <p>{t("roadmap.2")}</p>
          </div>
          <DashedLine cn={"dashed-line2"} />
          {/*<img className={styles["dashed-line2"]} src={DashedLine} width={150} />*/}
        </li>
        <li data-aos="fade-right" data-aos-offset={200} data-aos-delay={window.innerWidth < 800 ? 0 : 300}>
          <div className={styles["text"]}>
            <span>{t("roadmap.january")} 2020</span>
            <p>{t("roadmap.3")}</p>
          </div>
          <DashedLine cn={"dashed-line"} />
          {/*<img className={styles["dashed-line"]} src={DashedLine} width={150} />*/}
        </li>
        <li data-aos="fade-right" data-aos-offset={200} data-aos-delay={window.innerWidth < 800 ? 0 : 400}>
          <div className={styles["text"]}>
            <span>{t("roadmap.june")} 2020</span>
            <p>{t("roadmap.4")}</p>
          </div>
          <DashedLine cn={"dashed-line2"} />
          {/*<img className={styles["dashed-line2"]} src={DashedLine} width={150} />*/}
        </li>
        <li data-aos="fade-right" data-aos-offset={200} data-aos-delay={window.innerWidth < 800 ? 0 : 500}>
          <div className={styles["text"]}>
            <span>{t("roadmap.december")} 2022</span>
            <p>{t("roadmap.5")}</p>
          </div>
          <DashedLine cn={"dashed-line"} />
          {/*<img className={styles["dashed-line"]} src={DashedLine} width={150} />*/}
        </li>
        <li data-aos="fade-right" data-aos-offset={200} data-aos-delay={window.innerWidth < 800 ? 0 : 600}>
          <div className={styles["text"]}>
            <span>{t("roadmap.october")} 2023</span>
            <p>{t("roadmap.6")}</p>
          </div>
          <DashedLine cn={"dashed-line2"} />
          {/*<img className={styles["dashed-line2"]} src={DashedLine} width={150} />*/}
        </li>
        <li data-aos="fade-right" data-aos-offset={200} data-aos-delay={window.innerWidth < 800 ? 0 : 700}>
          <div className={styles["text"]}>
            <span>{t("roadmap.february")} 2025</span>
            <p>{t("roadmap.7")}</p>
          </div>
          {/*<img className={styles["dashed-line"]} src={DashedLine} width={150} />*/}
        </li>
      </ul>
      {/*<img className={styles["background"]} src={Background} alt={""} />*/}
    </div>
  );
};

export { Roadmap };
