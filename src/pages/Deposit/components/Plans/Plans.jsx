import styles from "./Plans.module.css";
import { useTranslation } from "react-i18next";
import { getPlans } from "../../../../utils/consts";
import { Radio } from "antd";
import Form from "antd/lib/form";
import Slider from "react-slick";
import PlanImage1 from "assets/images/plans/1.webp";
import PlanImage2 from "assets/images/plans/2.webp";
import PlanImage3 from "assets/images/plans/3.webp";
import PlanImage4 from "assets/images/plans/4.webp";
import PlanImage5 from "assets/images/plans/5.webp";
import PlanImage6 from "assets/images/plans/6.webp";

const IMAGES = [PlanImage1, PlanImage2, PlanImage3, PlanImage4, PlanImage5, PlanImage6];

const Plans = () => {
  const { t } = useTranslation();
  const settings = {
    speed: 500,
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Form.Item
      name={"plan"}
      rules={[
        {
          required: true,
          message: t("tariffs.choose_plan_warning"),
        },
      ]}
    >
      <Radio.Group className={`${styles["plans"]} deposit`}>
        <Slider {...settings}>
          {getPlans(t).map((plan, index) => {
            return (
              <Radio.Button
                className={`${styles[`plan${index + 1}`]} ${styles["plan"]}`}
                key={index}
                value={getPlans(t)[index]}
              >
                {/*<div className={`${styles["plan-card"]}`}>*/}
                <p className={styles["plan-payment"]}>{plan.payout}</p>
                <img className={styles["plan-image"]} src={IMAGES[index]} alt={""} width={"100%"} />
                <div className={styles["plan-name"]}>
                  <p>{t("tariffs.plan")}</p>
                  <p>{plan.name}</p>
                </div>
                <div className={styles["card-info-wrapper"]}>
                  {!plan.individual ? (
                    <>
                      <div className={styles["card-info"]}>
                        <p>{plan.payouts}</p>
                        <span>{plan.percent}%</span>
                      </div>
                      <div className={styles["card-info"]}>
                        <p>{t("tariffs.days")}</p> <span>{plan.days}</span>
                      </div>
                    </>
                  ) : null}
                  <div className={styles["card-info"]}>
                    <p>{t("tariffs.min")}</p> <span>{plan.min}$</span>
                  </div>
                  <div className={styles["card-info"]}>
                    <p>{t("tariffs.max")}</p>
                    <span>{plan.max}$</span>
                  </div>
                </div>
                {/*</div>*/}
              </Radio.Button>
            );
          })}
        </Slider>
      </Radio.Group>
    </Form.Item>
  );
};
export { Plans };
