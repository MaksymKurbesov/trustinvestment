import styles from "./UserWallets.module.css";
import Slider from "react-slick";
import { WALLETS_ICONS } from "utils/consts";
import { useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

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
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 700,
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
  const { t, i18n } = useTranslation();

  return (
    <div className={styles["slider-wrapper"]}>
      <Slider ref={sliderRef} {...sliderSettings}>
        {sortedByAvailable.map((platform, i) => {
          return (
            <div key={i} className={styles["platform-balance-wrapper"]}>
              <div className={styles["platform-balance"]} key={i}>
                <div className={styles["title"]}>
                  <p className={styles["platform-name"]}>{platform[0] === "Bnb" ? "BNB Smart Chain" : platform[0]}</p>
                  <img src={WALLETS_ICONS[platform[0]]} width={155} alt={""} />
                </div>
                <ul className={styles["platform-statistic"]}>
                  <li>
                    <p>{t("personal_area.available")}</p>
                    <span>{platform[1].available.toFixed(1)} USD</span>
                  </li>
                  <li>
                    <p>{t("personal_area.deposited")}</p>
                    <span>{platform[1].deposited.toFixed(1)} USD</span>
                  </li>
                  <li>
                    <p>{t("personal_area.withdrawn")}</p>
                    <span>{platform[1].withdrawn.toFixed(1)} USD</span>
                  </li>
                  <li>
                    <p>{t("personal_area.referrals")}</p>
                    <span>{platform[1].referrals.toFixed(1)} USD</span>
                  </li>
                </ul>
              </div>
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
