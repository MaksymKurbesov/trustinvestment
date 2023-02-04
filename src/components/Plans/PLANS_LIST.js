import Img1 from "./../../assets/images/1.webp";
import Img2 from "./../../assets/images/2.webp";
import Img3 from "./../../assets/images/3.webp";
import Img4 from "./../../assets/images/4.webp";
import Img5 from "./../../assets/images/5.webp";
import Img6 from "./../../assets/images/6.webp";

const PLANS_LIST = [
  {
    title: "План 1",
    percent: 1.5,
    days: 30,
    min: 100,
    max: 1500,
    image: Img1,
  },
  {
    title: "План 2",
    percent: 2.3,
    days: 24,
    min: 1500,
    max: 8000,
    image: Img2,
  },
  {
    title: "План 3",
    percent: 3.5,
    days: 18,
    min: 8000,
    max: 15000,
    image: Img3,
  },
  {
    title: "План 4",
    percent: 156,
    days: 10,
    min: 15000,
    max: 40000,
    image: Img4,
  },
  {
    title: "План 5",
    percent: 145,
    days: 6,
    min: 40000,
    max: 80000,
    image: Img5,
  },
  {
    title: "План 6",
    percent: "Индивидуально",
    days: "",
    min: 80000,
    max: 1000000,
    image: Img6,
    individual: true,
  },
];

export default PLANS_LIST;
