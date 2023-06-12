import styles from "./Plans.module.css";
import { useTranslation } from "react-i18next";
import { getPlans } from "../../../../utils/consts";
import { Radio } from "antd";
import Form from "antd/lib/form";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import { ProjectStatistic } from "../../../../components/Project-Statistic/Project-Statistic";
import { useOutletContext } from "react-router-dom";

const Plans = ({ deposits }) => {
  const { t } = useTranslation();
  const [openedDeposits, setOpenedDeposits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData } = useOutletContext();
  const [selectedProject, setSelectedProject] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    deposits.forEach((deposit) => {
      setOpenedDeposits((prevState) => [...prevState, Number(deposit.planNumber.match(/\d/g).join(""))]);
    });
  }, [deposits]);

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
    <>
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
                  disabled={openedDeposits[index] === index + 1 && !userData.canOpenAnyDeposit}
                >
                  {/*<div className={`${styles["plan-card"]}`}>*/}
                  <p className={styles["plan-payment"]}>{plan.payout}</p>
                  <img className={styles["plan-image"]} src={plan.image} alt={""} width={"100%"} />
                  <div className={styles["plan-name"]}>
                    <p>{t("tariffs.plan")}</p>
                    <p>{plan.projectName}</p>
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
                  {index === 5 ? null : (
                    <Button
                      className={styles["more-info"]}
                      onClick={() => {
                        showModal();
                        setSelectedProject(plan);
                      }}
                    >
                      Подробнее
                    </Button>
                  )}
                </Radio.Button>
              );
            })}
          </Slider>
        </Radio.Group>
      </Form.Item>
      <Modal
        cancelButtonProps={{ style: { display: "none" } }}
        width={"100%"}
        title="Информация о проекте"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ProjectStatistic project={selectedProject} />
      </Modal>
    </>
  );
};
export { Plans };
