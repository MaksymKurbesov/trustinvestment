import { Card, List, Radio } from "antd";
import styles from "./Plans.module.css";
import { useState } from "react";

const data = [
  {
    title: "План 1",
    // cover: <img src={PlanBackground} />,
    inDay: 0.75,
    days: 26,
    minDeposit: 120,
    maxDeposit: 1500,
  },
  {
    title: "План 2",
    inDay: 1.45,
    days: 22,
    minDeposit: 1650,
    maxDeposit: 7000,
  },
  {
    title: "План 3",
    inDay: 2.35,
    days: 18,
    minDeposit: 7500,
    maxDeposit: 15000,
  },

  {
    title: "План 4",
    inDay: 13.95,
    days: 10,
    minDeposit: 15500,
    maxDeposit: 40000,
  },
  {
    title: "План 5",
    inDay: 12.25,
    days: 6,
    minDeposit: 40550,
    maxDeposit: 80000,
  },
  {
    title: "План 6",
    inDay: "Индивидуально",
    days: 26,
    minDeposit: 80000,
    maxDeposit: 100000,
    individual: true,
  },
];

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
      dataSource={data}
      renderItem={(item, index) => {
        return (
          <List.Item
            onClick={() => {
              setChosenPlan(index);
              tariffHandler(data[index]);
            }}
          >
            <Card
              title={item.title}
              className={`${styles["plan-card"]} ${
                chosenPlan === index ? styles["active"] : ""
              }`}
            >
              {item.individual ? (
                ""
              ) : (
                <>
                  {" "}
                  <div className={styles["plan-card-info"]}>
                    в день <span>{item.inDay}%</span>
                  </div>
                  <div className={styles["plan-card-info"]}>
                    дней <span>{item.days}</span>
                  </div>
                </>
              )}

              <div className={styles["plan-card-info"]}>
                мин.вклад <span>{item.minDeposit}$</span>
              </div>
              <div className={styles["plan-card-info"]}>
                макс.вклад <span>{item.maxDeposit}$</span>
              </div>
            </Card>
          </List.Item>
        );
      }}
    />
  );
  // return (
  //   <Radio.Group>
  //     {data.map((item, index) => {
  //       return (
  //         <Radio value={index} key={index}>
  //           <List.Item
  //           // onClick={() => {
  //           //   setChosenPlan(index);
  //           // }}
  //           >
  //             <Card
  //               title={item.title}
  //               className={`${styles["plan-card"]} ${
  //                 chosenPlan === index ? styles["active"] : ""
  //               }`}
  //             >
  //               {item.individual ? (
  //                 ""
  //               ) : (
  //                 <>
  //                   {" "}
  //                   <div className={styles["plan-card-info"]}>
  //                     в день <span>{item.inDay}%</span>
  //                   </div>
  //                   <div className={styles["plan-card-info"]}>
  //                     дней <span>{item.days}</span>
  //                   </div>
  //                 </>
  //               )}
  //
  //               <div className={styles["plan-card-info"]}>
  //                 мин.вклад <span>{item.minDeposit}$</span>
  //               </div>
  //               <div className={styles["plan-card-info"]}>
  //                 макс.вклад <span>{item.maxDeposit}$</span>
  //               </div>
  //             </Card>
  //           </List.Item>
  //         </Radio>
  //       );
  //     })}
  //   </Radio.Group>
  // );
};
export { Plans };
