import styles from "./Plans.module.css";
import Slider from "react-slick";
import { Plan } from "./Plan/Plan";
import { useTranslation } from "react-i18next";
import { getPlans } from "../../utils/consts";

const Plans = () => {
  const { t } = useTranslation();

  const settings = {
    speed: 500,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className={`${styles["plans-wrapper"]} plansRoot`}>
      <div>
        <h2 data-aos={"fade-up"} className={`${styles["plans-title"]} section-title`}>
          {t("tariffs.title")}
        </h2>
        <ul className={styles["plans-list"]}>
          <Slider {...settings}>
            {getPlans(t).map((plan, i) => {
              return <Plan plan={plan} key={i} index={i} />;
            })}
          </Slider>
        </ul>
      </div>
    </section>
  );
};

export { Plans };
