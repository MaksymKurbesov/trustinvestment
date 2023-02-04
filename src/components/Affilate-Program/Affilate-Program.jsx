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
        <h2
          data-aos="fade-down"
          className={`${styles["affilate-title"]} section-title`}
        >
          Партнерская программа
        </h2>
        <div className={styles["affilate-program__wrapper"]}>
          <p className={styles["program-description"]} data-aos="fade-left">
            Компания Trust Investments разработала специальную многоуровневую
            партнерскую программу. Участником данной программы может стать
            абсолютно любой Человек, прошедший регистрацию на нашем
            инвестиционном ресурсе и разместивший минимум один собственный
            депозит. Свою персональную партнерскую ссылку вы можете найти в
            личном кабинете. Делитесь этой ссылкой со своими друзьями и
            рассказывайте о преимуществах компании Trust Investments. Сразу как
            приглашенный вами новый участник оформит депозит, вы получите
            моментальное вознаграждение на свой баланс. Обратите внимание что
            программа многоуровневая и вознаграждение вы будете получать также с
            тех, кого пригласили приглашенные вами участники. 8%-4%-2%-1%
          </p>
          <span data-aos="fade-right">{PartnerAnimation}</span>
        </div>
      </div>
    </section>
  );
};

export { AffilateProgram };
