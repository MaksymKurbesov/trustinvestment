import Card from "antd/lib/card";
import List from "antd/lib/list";
import styles from "./Plans.module.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Img1 from "../../assets/images/1.webp";
import Img2 from "../../assets/images/2.webp";
import Img3 from "../../assets/images/3.webp";
import Img4 from "../../assets/images/4.webp";
import Img5 from "../../assets/images/5.webp";
import Img6 from "../../assets/images/6.webp";

const grid = {
  gutter: 20,
  xs: 1,
  sm: 1,
  md: 2,
  lg: 2,
  xl: 2,
  xxl: 3,
};

const Plans = ({ tariffHandler }) => {
  const [chosenPlan, setChosenPlan] = useState(null);
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

  return (
    <List
      className={"plans-listRoot"}
      grid={grid}
      dataSource={PLANS_LIST}
      renderItem={(item, index) => {
        return (
          <List.Item
            onClick={() => {
              setChosenPlan(index);
              tariffHandler(PLANS_LIST[index]);
            }}
          >
            <Card
              title={index === 5 ? t("tariffs.individually") : item.title}
              extra={index < 3 ? t("tariffs.pay_everyday") : t("tariffs.end_term")}
              className={`${styles["plan-card"]} ${chosenPlan === index ? styles["active"] : ""}`}
            >
              {item.individual ? (
                ""
              ) : (
                <>
                  <div className={styles["plan-card-info"]}>
                    {index === 3 || index === 4 ? `${t("tariffs.end_term")}` : `${t("tariffs.in_day")}`}
                    <span>{item.percent}%</span>
                  </div>
                  <div className={styles["plan-card-info"]}>
                    {t("tariffs.days")} <span>{item.days}</span>
                  </div>
                </>
              )}

              <div className={styles["plan-card-info"]}>
                {t("tariffs.min")} <span>{item.min}$</span>
              </div>
              <div className={styles["plan-card-info"]}>
                {t("tariffs.max")}
                <span>{item.max}$</span>
              </div>
            </Card>
          </List.Item>
        );
      }}
    />
  );
};
export { Plans };
