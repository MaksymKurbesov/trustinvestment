import Chart from "chart.js/auto";
import { CategoryScale, ArcElement, Tooltip, Legend } from "chart.js";
import { useRef, useState } from "react";
import PieChart from "../Payment-Methods/PieChart";
import Slider from "react-slick";
import { Line, Pie } from "react-chartjs-2";
import styles from "./Project-Statistic.module.css";
import ProjectImage from "../../assets/images/future-project.png";
import MapIcon from "../../assets/images/projects-info/map.svg";
import TypeIcon from "../../assets/images/projects-info/type.svg";
import DeveloperIcon from "../../assets/images/projects-info/developer.svg";
import ProjectIcon from "../../assets/images/projects-info/project.svg";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

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
  // arrows: true,
  adaptiveHeight: true,
};

export const ProjectStatistic = ({ project }) => {
  const sliderRef = useRef();
  const dataTotalInvestment = {
    labels: labels,
    datasets: [
      {
        label: "Инвестировано (2023г.)",
        backgroundColor: "#4BB543",
        borderColor: "#4BB543",
        data: project.dataTotalInvestment,
      },
    ],
  };

  const dataTotalInvestors = {
    labels: labels,
    datasets: [
      {
        label: "Инвесторов (2023г.)",
        backgroundColor: "#1677ff",
        borderColor: "#1677ff",
        data: project.dataTotalInvestors,
      },
    ],
  };

  const dataCountries = {
    labels: ["ОАЭ", "Россия", "Узбекистан", "Таджикистан", "Турция", "Страны Прибалтики"],
    datasets: [
      {
        label: "Инвестиций",
        data: project.dataCountries,
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
        label: "Инвестиций",
        data: [12, 19, 3, 5, 2, 3, 6, 2],
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

  console.log(project, "project");

  return (
    <div className={styles["project-statistic"]}>
      <div className={styles["info-wrapper"]}>
        <div className={styles["slider"]}>
          <Slider ref={sliderRef} {...sliderSettings}>
            <div>
              <img src={ProjectImage} width={"100%"} height={300} className={styles["project-image"]} />
            </div>
            <div>
              <img src={ProjectImage} width={"100%"} height={300} className={styles["project-image"]} />
            </div>
            <div>
              <img src={ProjectImage} width={"100%"} height={300} className={styles["project-image"]} />
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
                <img className={styles["info-icon"]} src={MapIcon} alt={""} height={25} />
              </div>
              <p>
                <span>Местоположение:</span> {project.place}
              </p>
            </li>
            <li>
              <div>
                <img className={styles["info-icon"]} src={TypeIcon} alt={""} height={25} />
              </div>
              <p>
                <span>Тип недвижимости:</span> {project.type}
              </p>
            </li>
            <li>
              <div>
                <img className={styles["info-icon"]} src={ProjectIcon} alt={""} height={25} />
              </div>
              <p>
                <span>Проект:</span> {project.projectName}
              </p>
            </li>
            <li>
              <div>
                <img className={styles["info-icon"]} src={DeveloperIcon} alt={""} height={25} />
              </div>
              <p>
                <span>Застройщик:</span> {project.developer}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles["additional-info"]}>
        <ul className={styles["additional-info-list"]}>
          <li>
            <span>Статус:</span> {project.status}
          </li>
          <li>
            <span>Дата начал стройки: </span> {project.dateStart}
          </li>
          <li>
            <span>Дата сдачи:</span> {project.dateEnd}
          </li>
          <li>
            <span>Район:</span> {project.district}
          </li>
          <li>
            <span>Минимальная площадь:</span> {project.minArea}
          </li>
          <li>
            <span>Стартовая цена:</span> {project.startPrice}
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
            <h2>Рейтинг стран по объему инвестиций</h2>
            <div className={styles["countries"]}>
              <Pie data={dataCountries} options={options2} />
            </div>
          </div>
          <div className={styles["payments-wrapper"]}>
            <h2>Рейтинг платежных систем по объему инвестиций</h2>
            <div className={styles["payments"]}>
              <Pie data={dataPayments} options={options2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
