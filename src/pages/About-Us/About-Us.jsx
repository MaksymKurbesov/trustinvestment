import styles from "./About-Us.module.css";
import AboutCompanyImage from "assets/images/about-company-image.svg";
import AboutCompanyImage2 from "assets/images/about-company-image2.svg";
import OurClient from "assets/images/our-client.jpg";
import TeamMember1 from "assets/images/team-members/1.png";
import TeamMember2 from "assets/images/team-members/2.png";
import TeamMember3 from "assets/images/team-members/3.png";
import TeamMember4 from "assets/images/team-members/4.png";
import TeamMember5 from "assets/images/team-members/5.png";
import TeamMember6 from "assets/images/team-members/6.png";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from "react";

const MEMBERS_LIST = [
  {
    name: "Arif Mohd Al Alawi",
    image: TeamMember2,
    position: "CEO",
    links: {
      facebook: "",
      twitter: "",
      linkedin: "https://www.linkedin.com/in/arif-mohd-al-alawi-0601321a/",
      email: "arif@dubaicultiv8.ae",
    },
  },
  {
    name: "Vadym Shkarupeta",
    image: TeamMember3,
    position: "CTO",
    links: {
      facebook: "",
      twitter: "",
      linkedin: "https://www.linkedin.com/in/vadym-shkarupeta-37808a1a3/",
      email: "",
    },
  },
  {
    name: "Yousaf Abbasi",
    image: TeamMember1,
    position: "Project Financing",
    links: {
      facebook: "",
      twitter: "https://twitter.com/yousafabbasi",
      linkedin: "https://www.linkedin.com/in/yousafabbasi/",
      email: "",
    },
  },
  {
    name: "Volodymyr Derunov",
    image: TeamMember4,
    position: "Frontend Developer",
    links: {
      facebook: "",
      twitter: "",
      linkedin: "https://www.linkedin.com/in/vderunov/",
      email: "",
    },
  },
  {
    name: "Mykola Siutkin",
    image: TeamMember5,
    position: "Co-founder",
    links: {
      facebook: "",
      twitter: "",
      linkedin: "linkedin.com/in/siutkin",
      email: "",
    },
  },
  {
    name: "Victor Guixer",
    image: TeamMember6,
    position: "Co-founder",
    links: {
      facebook: "",
      twitter: "https://twitter.com/victorguixer",
      linkedin: "linkedin.com/in/victorguixer",
      email: "arif@dubaicultiv8.ae",
    },
  },
];

const AboutUs = () => {
  const sliderRef = useRef(null);

  const settings = {
    speed: 500,
    infinite: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className={`${styles["about-us"]}`}>
      <div className={`${styles["about-us__container"]}`}>
        <h2 className={styles["about-us__title"]}>O нас</h2>
        <p className={styles["about-us__subtitle"]}>
          Если ты хочешь знать о нас больше, то ты в правильном месте. Прочитай,
          чтобы понять как мы можем помочь тебе с инвестированием в
          недвижимость.
        </p>
        <ul className={styles["features-list"]}>
          <li>
            <span>100+</span> Компаний
          </li>
          <li>
            <span>50+</span> Членов команды
          </li>
          <li>
            <span>2М+</span> Капитал
          </li>
          <li>
            <span>7+</span> Год опыта
          </li>
        </ul>
        <div className={styles["about-company"]}>
          <div className={styles["about-company-wrapper"]}>
            <h3 className={styles["about-company-title"]}>О компании</h3>
            <div
              className={`${styles["about-company-text"]} ${styles["text"]}`}
            >
              <img
                className={styles["decorate-image1"]}
                src={AboutCompanyImage}
                width={"50%"}
              />
              <div>
                <p>
                  <b>TRUST INVESTMENT</b> – это дочерняя компания международного
                  холдинга Azizi Group, основанная в мае 2013 года.
                </p>
                <p>
                  Компания объединяет сразу несколько глобальных направлений:
                  строительство высоток с апартаментами, строительство вилл,
                  одноэтажных домов, объединенных в коттеджные поселки, отдел
                  продаж и сдачи в аренду коммерческой недвижимости
                  инвестиционная онлайн платформа.
                </p>
                <p>
                  Вместе с Azizi Development участвовали в постройке разных
                  проектов, расположенных в самых популярных районах эмиратов:
                  Al Furjan ⁃ Downtown Jebel Ali ⁃ Dubai Healthcare City ⁃
                  Sports City ⁃ Studio City.
                </p>
              </div>
            </div>
            <h3
              className={`${styles["about-company-title"]} ${styles["vector"]}`}
            >
              Чем мы занимаемся?
            </h3>
            <div className={styles["about-company-text"]}>
              <img
                className={styles["decorate-image2"]}
                src={AboutCompanyImage2}
                width={"50%"}
              />
              <div>
                <p>
                  Основным и самым значимым активом компании является жилая
                  недвижимость, то есть квартиры и апартаменты в высотках, а
                  также виллы и одноэтажные дома. Чуть менее значимым
                  направлением является продажа и аренда площадей под кафе, бары
                  и рестораны, в туристических местах ОАЭ.
                </p>
                <p>
                  Так же занимаемся скупкой недвижимости на вторичном рынке
                  недвижимости, реновацией этих объектов, перепродажей в
                  последствии. С 2020 года <b>Trust Investment</b> создала
                  программу привлечения инвестиций со стороны корпоративного
                  сектора. В 2022 году в рамках планового развития
                  инвестиционной и строительной деятельности наша компания
                  открыла онлайн направление для привлечения инвестиций со
                  стороны частных лиц.
                </p>
              </div>
            </div>
          </div>
          <div className={styles["our-team"]}>
            <h3 className={styles["about-company-title"]}>Наша Команда</h3>
            <div className={styles["team-members"]}>
              <Slider ref={sliderRef} {...settings}>
                {MEMBERS_LIST.map((member, i) => {
                  return (
                    <div className={styles["member-slide"]} key={i}>
                      <img src={member.image} width={"100%"} />
                      <div>
                        <p>{member.name}</p>
                        <p>{member.position}</p>
                        {/*<p>{member.}</p>*/}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export { AboutUs };
