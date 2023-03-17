import Card from "antd/lib/card";
import styles from "./Plans.module.css";
import { useTranslation } from "react-i18next";
import { getPlans } from "../../../../utils/consts";
import { Radio } from "antd";
import Form from "antd/lib/form";

const Plans = () => {
  const { t } = useTranslation();
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
        {getPlans(t).map((plan, index) => {
          return (
            <Radio.Button className={styles["plan"]} key={index} value={getPlans(t)[index]}>
              <Card className={`${styles["plan-card"]}`}>
                <div className={styles["background-image"]}>
                  <p className={styles["plan-number"]}>{index === 5 ? t("tariffs.individually") : plan.title}</p>
                  <p className={styles["plan-payment"]}>
                    {index < 3 ? t("tariffs.pay_everyday") : t("tariffs.end_term")}
                  </p>

                  <img src={plan.image} alt={""} width={"100%"} height={150} />
                </div>
                <div className={styles["card-info"]}>
                  {plan.individual ? (
                    ""
                  ) : (
                    <>
                      <div className={styles["plan-card-info"]}>
                        <p>{index === 3 || index === 4 ? `${t("tariffs.end_term")}` : `${t("tariffs.in_day")}`}</p>
                        <span>{plan.percent}%</span>
                      </div>
                      <div className={styles["plan-card-info"]}>
                        <p>{t("tariffs.days")}</p> <span>{plan.days}</span>
                      </div>
                    </>
                  )}

                  <div className={styles["plan-card-info"]}>
                    <p>{t("tariffs.min")}</p> <span>{plan.min}$</span>
                  </div>
                  <div className={styles["plan-card-info"]}>
                    <p>{t("tariffs.max")}</p>
                    <span>{plan.max}$</span>
                  </div>
                </div>
              </Card>
            </Radio.Button>
          );
        })}
      </Radio.Group>
    </Form.Item>
  );
};
export { Plans };
