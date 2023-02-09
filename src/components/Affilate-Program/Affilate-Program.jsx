import styles from "./Affilate-Program.module.css";
import useLottie from "lottie-react";
import partnerAnimation from "assets/lottie-animations/partner-animation.json";

const AffilateProgram = () => {
  const PartnerAnimation = useLottie({
    animationData: partnerAnimation,
  });

  return (
    <section className={styles["affilate-program"]}>
      <div className={"container"}>
        <h2 data-aos="fade-down" className={`${styles["affilate-title"]} section-title`}>
          Партнерская программа
        </h2>
        <div className={styles["affilate-program__wrapper"]}>
          <div className={styles["program-description"]} data-aos="fade-left">
            <p>
              Специально для наших клиентов компания Trust Investment разработала многоуровневую реферальную программу.
              Принять участие в данной программе может каждый клиент нашей компании, пройдя регистрацию на нашей онлайн
              платформе и разместивший минимум один собственный депозит.
            </p>
            <p>
              Процентная ставка от депозита привлеченных вами партнеров:
              <br /> <span>7% - 4% - 3% - 2% - 1%</span>
            </p>
          </div>

          <span data-aos="fade-right">{PartnerAnimation}</span>
        </div>
      </div>
    </section>
  );
};

export { AffilateProgram };
