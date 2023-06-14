import Chart from "chart.js/auto";
import { CategoryScale, ArcElement, Tooltip, Legend } from "chart.js";
import { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Line, Pie } from "react-chartjs-2";
import styles from "./Project-Statistic.module.css";
import MapIcon from "../../assets/images/projects-info/map.svg";
import TypeIcon from "../../assets/images/projects-info/type.svg";
import DeveloperIcon from "../../assets/images/projects-info/developer.svg";
import ProjectIcon from "../../assets/images/projects-info/project.svg";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { FirebaseContext } from "../../index";
import { collection, doc, getDoc, query } from "firebase/firestore";

Chart.register(CategoryScale, ArcElement, Tooltip, Legend);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const options = {
  scales: {
    y: {
      ticks: {
        callback: function (value, index, values) {
          return "$" + value;
        },
      },
    },
  },
  maintainAspectRatio: false,
  responsive: true,
};

const options2 = {
  plugins: {
    tooltip: {
      callbacks: {
        // title: "%",
        label: function (context) {
          return `${context.dataset.label}: ${context.formattedValue}%`;
        },
      },
    },
  },
};

const sliderSettings = {
  speed: 500,
  infinite: true,
  slidesToShow: 1,
  dots: true,
  arrows: false,
  adaptiveHeight: true,
};

export const ProjectStatistic = ({ project }) => {
  const { t } = useTranslation();
  const { firestore } = useContext(FirebaseContext);
  const [currentProject, setCurrentProject] = useState(null);

  const getProjectData = async () => {
    await getDoc(doc(firestore, "projects", project.projectName)).then((snap) => {
      setCurrentProject(snap.data());
    });
  };

  useEffect(() => {
    getProjectData();
  }, [project]);

  const sliderRef = useRef();
  const dataTotalInvestment = {
    labels: labels,
    datasets: [
      {
        label: `${t("projects_info.invested")} (2023г.)`,
        backgroundColor: "#4BB543",
        borderColor: "#4BB543",
        data: currentProject?.totalInvestment,
      },
    ],
  };

  const dataTotalInvestors = {
    labels: labels,
    datasets: [
      {
        label: `${t("projects_info.investors")} (2023г.)`,
        backgroundColor: "#1677ff",
        borderColor: "#1677ff",
        data: currentProject?.totalInvestors,
      },
    ],
  };

  const dataCountries = {
    labels: [
      t("projects_info.dubai"),
      t("projects_info.russia"),
      t("projects_info.uzbekistan"),
      t("projects_info.tajikistan"),
      t("projects_info.turkey"),
      t("projects_info.baltics"),
    ],
    datasets: [
      {
        label: t("projects_info.investments"),
        data: currentProject?.countriesRating,
        backgroundColor: [
          "rgb(249,247,208, 0.5)",
          "rgba(227,166,199,0.5)",
          "rgb(205,168,209, 0.5)",
          "rgb(248,168,105, 0.5)",
          "rgb(179,208,178, 0.5)",
          "rgb(149,190,146, 0.5)",
        ],
        borderColor: [
          "rgb(249,247,208)",
          "rgb(227,166,199)",
          "rgb(205,168,209)",
          "rgb(248,168,105)",
          "rgb(179,208,178)",
          "rgb(149,190,146)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataPayments = {
    labels: ["Perfect Money", "TRC20", "Bitcoin", "Ethereum", "Solana", "PolkaDOT", "BNB", "QIWI"],
    datasets: [
      {
        label: t("projects_info.investments"),
        data: currentProject?.paymentsRating,
        backgroundColor: [
          "rgb(220,222,112, 0.5)",
          "rgb(218,234,185, 0.5)",
          "rgb(249,217,114, 0.5)",
          "rgb(250,194,161, 0.5)",
          "rgb(250,156,104, 0.5)",
          "rgb(196,117,164, 0.5)",
          "rgb(147,126,182, 0.5)",
          "rgb(144,196,174, 0.5)",
        ],
        borderColor: [
          "rgb(220,222,112)",
          "rgb(218,234,185)",
          "rgb(249,217,114)",
          "rgb(250,194,161)",
          "rgb(250,156,104)",
          "rgb(196,117,164)",
          "rgb(147,126,182)",
          "rgb(144,196,174)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles["project-statistic"]}>
      <div className={styles["info-wrapper"]}>
        <div className={styles["slider"]}>
          <Slider ref={sliderRef} {...sliderSettings}>
            <div>
              <img src={project.sliderImages[0]} width={"100%"} height={300} className={styles["project-image"]} />
            </div>
            <div>
              <img src={project.sliderImages[1]} width={"100%"} height={300} className={styles["project-image"]} />
            </div>
            <div>
              <img src={project.sliderImages[2]} width={"100%"} height={300} className={styles["project-image"]} />
            </div>
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
        <div className={styles["info"]}>
          <ul>
            <li>
              <div>
                <img className={styles["info-icon"]} src={ProjectIcon} alt={""} height={25} />
              </div>
              <p>
                <span>{t("projects_info.project")}:</span> {project.projectName}
              </p>
            </li>
            <li>
              <div>
                <img className={styles["info-icon"]} src={MapIcon} alt={""} height={25} />
              </div>
              <p>
                <span>{t("projects_info.location")}:</span> {project.place}
              </p>
            </li>
            <li>
              <div>
                <img className={styles["info-icon"]} src={TypeIcon} alt={""} height={25} />
              </div>
              <p>
                <span>{t("projects_info.type")}:</span> {project.type}
              </p>
            </li>

            <li>
              <div>
                <img className={styles["info-icon"]} src={DeveloperIcon} alt={""} height={25} />
              </div>
              <p>
                <span>{t("projects_info.developer")}:</span> {project.developer}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles["additional-info"]}>
        <ul className={styles["additional-info-list"]}>
          <li>
            <span>{t("projects_info.status")}:</span> {project.status}
          </li>
          <li>
            <span>{t("projects_info.dateStart")}: </span> {project.dateStart}
          </li>
          <li>
            <span>{t("projects_info.dateEnd")}:</span> {project.dateEnd}
          </li>
          <li>
            <span>{t("projects_info.district")}:</span> {project.district}
          </li>
          <li>
            <span>{t("projects_info.minArea")}:</span> от {project.minArea} кв. м
          </li>
          <li>
            <span>{t("projects_info.startPrice")}:</span> ${project.startPrice}
          </li>
        </ul>
      </div>

      <div className={styles["charts"]}>
        <div className={styles["total-investment"]}>
          <Line data={dataTotalInvestment} options={options} />
        </div>
        <div className={styles["total-investors"]}>
          <Line data={dataTotalInvestors} options={{ maintainAspectRatio: false, responsive: true }} />
        </div>
        <div className={styles["pie-charts"]}>
          <div className={styles["countries-wrapper"]}>
            <h2>{t("projects_info.ratingCountry")}</h2>
            <div className={styles["countries"]}>
              <Pie data={dataCountries} options={options2} />
            </div>
          </div>
          <div className={styles["payments-wrapper"]}>
            <h2>{t("projects_info.ratingPayment")}</h2>
            <div className={styles["payments"]}>
              <Pie data={dataPayments} options={options2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
