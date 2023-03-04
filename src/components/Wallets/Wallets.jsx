import styles from "./Wallet.module.css";
import Slider from "react-slick";
import { ICONS } from "../../pages/Personal-Area/ICONS";

const sliderSettings = {
  speed: 500,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  adaptiveHeight: true,

  responsive: [
    {
      breakpoint: 1700,
      settings: {
        slidesToShow: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        infinite: true,
        dots: true,
      },
    },
  ],
};

const Wallets = ({ paymentMethods }) => {
  return (
    <div className={styles["slider-wrapper"]}>
      <Slider {...sliderSettings}>
        {paymentMethods.map((platform, i) => {
          return (
            <div className={styles["platform-balance"]} key={i}>
              <div className={styles["title"]}>
                <p className={styles["platform-name"]}>{platform.name}</p>
                <img src={ICONS[i]} width={35} />
              </div>
              <ul className={styles["platform-statistic"]}>
                <li>
                  <p>Доступно</p>
                  <span>{platform.available} USD</span>
                </li>
                <li>
                  <p>Пополнено</p>
                  <span>{platform.deposited} USD</span>
                </li>
                <li>
                  <p>Выведено</p>
                  <span>{platform.withdrawn} USD</span>
                </li>
                <li>
                  <p>Реферальные</p>
                  <span>{platform.referals} USD</span>
                </li>
              </ul>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export { Wallets };