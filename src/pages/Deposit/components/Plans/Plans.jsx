import styles from "./Plans.module.css";
import { useTranslation } from "react-i18next";
import { getPlans } from "../../../../utils/consts";
import { Radio, Button } from "antd";
import Form from "antd/lib/form";
import Slider from "react-slick";
import PlanImage1 from "assets/images/plans/1.png";
import PlanImage2 from "assets/images/plans/2.webp";
import PlanImage3 from "assets/images/plans/3.webp";
import PlanImage4 from "assets/images/plans/4.webp";
import PlanImage5 from "assets/images/plans/5.webp";
import PlanImage6 from "assets/images/plans/6.webp";
import Modal from "antd/lib/modal";
import { useState } from "react";

const IMAGES = [PlanImage1, PlanImage2, PlanImage3, PlanImage4, PlanImage5, PlanImage6];

const Plans = ({ form }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [choosedPlan, setChoosedPlan] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      <>
        <table className={styles["plan-table"]}>
          <thead>
            <tr>
              <th></th>
              <th>Название</th>
              <th>В день</th>
              <th>Дней</th>
              <th>Мин. депозит</th>
              <th>Макс. депозит</th>
              <th>Выплата</th>
              <th></th>
            </tr>
          </thead>

          {/*<Radio.Group>*/}
          <tbody>
            {getPlans(t).map((plan, index) => {
              return (
                <tr
                  className={`${styles["table-row"]} ${choosedPlan?.plan === index + 1 ? styles["active"] : ""}`}
                  onClick={() => {
                    form.setFieldValue("plan", plan);
                    setChoosedPlan(plan);
                  }}
                  // onClick={() => {
                  //   setChoosedPlan(getPlans(t)[index]);
                  //   console.log(choosedPlan?.plan, "choosedplan");
                  //   console.log(index, "index");
                  // }}
                  key={index}
                >
                  <td>
                    <img className={styles["plan-image"]} src={IMAGES[0]} alt={""} width={100} />
                  </td>
                  <td>{plan.name}</td>
                  <td>{index < 5 ? `${plan.percent}%` : t("tariffs.individually")}</td>
                  <td>{plan.days}</td>
                  <td>{plan.min}$</td>
                  <td>{plan.max}$</td>
                  <td>{index < 3 ? "Ежедневно" : "В конце срока"}</td>
                  <td>
                    <Button onClick={showModal}>Подробнее</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal title={choosedPlan?.plan} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    </Form.Item>
  );
};
export { Plans };
