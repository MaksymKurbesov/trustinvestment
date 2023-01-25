import Img1 from "./../../assets/images/1.webp";
import Img2 from "./../../assets/images/2.webp";
import Img3 from "./../../assets/images/3.webp";
import Img4 from "./../../assets/images/4.webp";
import Img5 from "./../../assets/images/5.webp";
import Img6 from "./../../assets/images/6.webp";

const PLANS_LIST = [
  {
    percent: 0.75,
    days: 26,
    min: 120,
    max: 1500,
    image: Img1,
  },
  {
    percent: 1.45,
    days: 22,
    min: 1650,
    max: 7000,
    image: Img2,
  },
  {
    percent: 2.35,
    days: 18,
    min: 7500,
    max: 15000,
    image: Img3,
  },
  {
    percent: 13.95,
    days: 10,
    min: 15500,
    max: 40000,
    image: Img4,
  },
  {
    percent: 12.25,
    days: 6,
    min: 40550,
    max: 80000,
    image: Img5,
  },
  {
    percent: "Индивидуально",
    days: "",
    min: 80000,
    max: 100000,
    image: Img6,
  },
];

export default PLANS_LIST;
