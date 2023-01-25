import PLANS_LIST from "./PLANS_LIST.js";
import styles from "./Plans.module.css";
import Slider from "react-slick";
import { Plan } from "./Plan/Plan";

const Plans = () => {
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
        <h2 className={"section-title"}>Тарифные планы</h2>
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
