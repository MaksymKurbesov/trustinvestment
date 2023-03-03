import styles from "./Partners-Program.module.css";
import Button from "antd/lib/button";
import AffilateImage from "assets/images/affiliate-image.png";
import { useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

const PartnersProgram = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div className={`${styles["partner-program"]} container`}>
      <div className={styles["main"]}>
        <h2 data-aos={"fade-down"} className={styles["title"]}>
          {t("become_partner.title")}
        </h2>
        <img
          data-aos={"fade-left"}
          data-aos-delay={400}
          src={AffilateImage}
          alt={"Декоративное изображение для партнёрской программы"}
          style={{ width: "100%" }}
        />
        <p data-aos={"fade-up"} className={styles["subtitle"]} data-aos-delay={200}>
          {t("become_partner.subtitle")}
        </p>
        <Button
          data-aos={"fade-up"}
          data-aos-delay={500}
          type={"primary"}
          className={styles["register-button"]}
          onClick={() => {
            navigate("/register");
          }}
        >
          {t("become_partner.button_text")}
        </Button>
        {/*</div>*/}
      </div>
      <div className={styles["program-description"]}>
        <p data-aos={"fade-left"} data-aos-offset={300}>
          <span>{t("become_partner.what_is_title")}</span>
          <Trans i18nKey="become_partner.what_is_descr" components={{ bolder: <b /> }} />
          {/*{t("become_partner.what_is_descr")}*/}
        </p>
        <p data-aos={"fade-right"} data-aos-offset={300}>
          <span>{t("become_partner.how_to_start_title")}</span>
          <Trans i18nKey="become_partner.how_to_start_descr" components={{ bolder: <b /> }} />
        </p>
      </div>
      <div className={styles["how-to-work"]}>
        <h3 data-aos={"fade-up"} className={styles["how-to-work__title"]}>
          {t("become_partner.how_its_work.title")}
        </h3>
        <div className={styles["how-to-work-wrapper"]}>
          <div data-aos={"fade-left"} className={styles["how-to-work__item"]}>
            <span>1</span>
            <div>
              <h3>{t("become_partner.how_its_work.1.title")}</h3>
              <p>{t("become_partner.how_its_work.1.description")}</p>
            </div>
          </div>
          <div data-aos={"fade-left"} data-aos-delay={200} className={styles["how-to-work__item"]}>
            <span>2</span>
            <div>
              <h3 className={styles["how-to-work__title"]}>{t("become_partner.how_its_work.2.title")}</h3>
              <p>{t("become_partner.how_its_work.2.description")}</p>
            </div>
          </div>
          <div data-aos={"fade-left"} data-aos-delay={300} className={styles["how-to-work__item"]}>
            <span>3</span>
            <div>
              <h3>{t("become_partner.how_its_work.3.title")}</h3>
              <p>{t("become_partner.how_its_work.3.description")}</p>
            </div>
          </div>
          <div data-aos={"fade-left"} data-aos-delay={400} className={styles["how-to-work__item"]}>
            <span>4</span>
            <div>
              <h3>{t("become_partner.how_its_work.4.title")}</h3>
              <p>{t("become_partner.how_its_work.4.description")}</p>
            </div>
          </div>
          <div data-aos={"fade-left"} data-aos-delay={500} className={styles["how-to-work__item"]}>
            <span>5</span>
            <div>
              <h3>{t("become_partner.how_its_work.5.title")}</h3>
              <p>{t("become_partner.how_its_work.5.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PartnersProgram };
