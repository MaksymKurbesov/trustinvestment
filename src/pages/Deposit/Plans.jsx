import { Card, List } from "antd";
import styles from "./Plans.module.css";
import { useState } from "react";
import PLANS_LIST from "../../components/Plans/PLANS_LIST";

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
              title={index === 5 ? "Индивидуальный" : item.title}
              extra={index < 3 ? "Выплата ежедневно" : "В конце срока"}
              className={`${styles["plan-card"]} ${
                chosenPlan === index ? styles["active"] : ""
              }`}
            >
              {item.individual ? (
                ""
              ) : (
                <>
                  <div className={styles["plan-card-info"]}>
                    в день <span>{item.percent}%</span>
                  </div>
                  <div className={styles["plan-card-info"]}>
                    дней <span>{item.days}</span>
                  </div>
                </>
              )}

              <div className={styles["plan-card-info"]}>
                мин.вклад <span>{item.min}$</span>
              </div>
              <div className={styles["plan-card-info"]}>
                макс.вклад <span>{item.max}$</span>
              </div>
            </Card>
          </List.Item>
        );
      }}
    />
  );
};
export { Plans };
