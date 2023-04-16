import styles from "./About-Us.module.css";
import AboutCompanyImage from "../../assets/images/about-company-image.svg";
import AboutCompanyImage2 from "../../assets/images/about-company-image2.svg";
import TeamMember1 from "../../assets/images/team-members/1.png";
import TeamMember2 from "../../assets/images/team-members/2.png";
import TeamMember3 from "../../assets/images/team-members/3.png";
import TeamMember4 from "../../assets/images/team-members/4.png";
import TeamMember5 from "../../assets/images/team-members/5.png";
import TeamMember6 from "../../assets/images/team-members/6.png";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from "react";
import { useTranslation, Trans, Translation } from "react-i18next";

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
  const { t, i18n } = useTranslation();

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
        <h2 data-aos={"fade-down"} className={styles["about-us__title"]}>
          {t("about_us.title")}
        </h2>
        <p data-aos={"fade-up"} className={styles["about-us__subtitle"]}>
          {t("about_us.subtitle")}
        </p>
        <ul className={styles["features-list"]}>
          <li data-aos={"zoom-in"}>
            <span>100+</span> {t("statistic.companies")}
          </li>
          <li data-aos={"zoom-in"} data-aos-delay={200}>
            <span>50+</span> {t("statistic.team_members")}
          </li>
          <li data-aos={"zoom-in"} data-aos-delay={300}>
            <span>2М+</span> {t("statistic.capital")}
          </li>
          <li data-aos={"zoom-in"} data-aos-delay={400}>
            <span>7+</span> {t("statistic.year_of_experience")}
          </li>
        </ul>
        <div className={styles["about-company"]}>
          <div className={styles["about-company-wrapper"]}>
            <h3 data-aos={"fade-up"} className={styles["about-company-title"]}>
              {t("about_us.about_company")}
            </h3>
            <div className={`${styles["about-company-text"]} ${styles["text"]}`}>
              <img
                data-aos={"fade-right"}
                className={styles["decorate-image1"]}
                src={AboutCompanyImage}
                width={"50%"}
              />
              <div data-aos={"fade-left"}>
                <Trans i18nKey="about_us.about_company_description" components={{ bolder: <b /> }} />
              </div>
            </div>
            <h3 data-aos={"fade-up"} className={`${styles["about-company-title"]} ${styles["vector"]}`}>
              {t("about_us.what_we_do")}
            </h3>
            <div className={styles["about-company-text"]}>
              <img
                data-aos={"fade-left"}
                data-aos-offset={300}
                className={styles["decorate-image2"]}
                src={AboutCompanyImage2}
                width={"50%"}
              />
              <div data-aos={"fade-right"} data-aos-offset={300}>
                <Trans i18nKey="about_us.what_we_do_description" components={{ bolder: <b /> }} />
              </div>
            </div>
          </div>
          <div className={styles["our-team"]}>
            <h3 data-aos={"fade-up"} className={styles["about-company-title"]}>
              {t("about_us.our_team")}
            </h3>
            <div className={styles["team-members"]}>
              <Slider ref={sliderRef} {...settings}>
                {MEMBERS_LIST.map((member, i) => {
                  return (
                    <div
                      className={styles["member-slide"]}
                      key={i}
                      data-aos={"fade-down"}
                      data-aos-delay={200 * i}
                      data-aos-offset={300}
                    >
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
