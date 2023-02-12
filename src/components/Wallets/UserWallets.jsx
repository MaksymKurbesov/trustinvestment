import styles from "./UserWallets.module.css";
import Slider from "react-slick";
import { ICONS } from "../../utils/ICONS";
import { useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

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
        centerMode: true,
        centerPadding: "0px",
        variableWidth: true,
        infinite: true,
        dots: true,
      },
    },
  ],
};

const UserWallets = ({ paymentMethods }) => {
  const sliderRef = useRef();
  const sortedByAvailable = Object.entries(paymentMethods).sort((a, b) => b[1].available - a[1].available);

  return (
    <div className={styles["slider-wrapper"]}>
      <Slider ref={sliderRef} {...sliderSettings}>
        {sortedByAvailable.map((platform, i) => {
          return (
            <div className={styles["platform-balance"]} key={i}>
              <div className={styles["title"]}>
                <p className={styles["platform-name"]}>{platform[0]}</p>
                <img src={ICONS[platform[0]]} width={35} alt={""} />
              </div>
              <ul className={styles["platform-statistic"]}>
                <li>
                  <p>Доступно</p>
                  <span>{platform[1].available} USD</span>
                </li>
                <li>
                  <p>Пополнено</p>
                  <span>{platform[1].deposited} USD</span>
                </li>
                <li>
                  <p>Выведено</p>
                  <span>{platform[1].withdrawn} USD</span>
                </li>
                <li>
                  <p>Реферальные</p>
                  <span>{platform[1].referrals} USD</span>
                </li>
              </ul>
            </div>
          );
        })}
      </Slider>
      <div className={styles["custom-arrows"]}>
        <button onClick={() => sliderRef.current.slickPrev()}>
          <LeftOutlined />
        </button>
        <button onClick={() => sliderRef.current.slickNext()}>
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

export { UserWallets };
