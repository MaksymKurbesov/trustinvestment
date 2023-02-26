import styles from "./Plans.module.css";
import Slider from "react-slick";
import { Plan } from "./Plan/Plan";
import { useTranslation } from "react-i18next";
import Img1 from "../../assets/images/1.webp";
import Img2 from "../../assets/images/2.webp";
import Img3 from "../../assets/images/3.webp";
import Img4 from "../../assets/images/4.webp";
import Img5 from "../../assets/images/5.webp";
import Img6 from "../../assets/images/6.webp";

const Plans = () => {
  const { t, i18n } = useTranslation();
  const PLANS_LIST = [
    {
      title: `${t("tariffs.plan")} 1`,
      percent: 1.5,
      days: 30,
      min: 100,
      max: 1500,
      image: Img1,
    },
    {
      title: `${t("tariffs.plan")} 2`,
      percent: 2.3,
      days: 24,
      min: 1500,
      max: 8000,
      image: Img2,
    },
    {
      title: `${t("tariffs.plan")} 3`,
      percent: 3.5,
      days: 18,
      min: 8000,
      max: 15000,
      image: Img3,
    },
    {
      title: `${t("tariffs.plan")} 4`,
      percent: 156,
      days: 10,
      min: 15000,
      max: 40000,
      image: Img4,
    },
    {
      title: `${t("tariffs.plan")} 5`,
      percent: 145,
      days: 6,
      min: 40000,
      max: 80000,
      image: Img5,
    },
    {
      title: `${t("tariffs.plan")} 6`,
      percent: "Индивидуально",
      days: "",
      min: 80000,
      max: 1000000,
      image: Img6,
      individual: true,
    },
  ];

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
            {PLANS_LIST.map((plan, i) => {
              return <Plan plan={plan} key={i} index={i} />;
            })}
          </Slider>
        </ul>
      </div>
    </section>
  );
};

export { Plans };
