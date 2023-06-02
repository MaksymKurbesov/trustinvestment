import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";
import Seagate1 from "../assets/images/projects-photos/Seagate/seagate1.webp";
import Seagate2 from "../assets/images/projects-photos/Seagate/seagate2.webp";
import Seagate3 from "../assets/images/projects-photos/Seagate/seagate3.webp";
import Seagate4 from "../assets/images/projects-photos/Seagate/seagate4.webp";
import CanalHeights1 from "../assets/images/projects-photos/Canal Heights/canalheights1.webp";
import CanalHeights2 from "../assets/images/projects-photos/Canal Heights/canalheights2.webp";
import CanalHeights3 from "../assets/images/projects-photos/Canal Heights/canalheights3.webp";
import CanalHeights4 from "../assets/images/projects-photos/Canal Heights/canalheights4.webp";
import Jomana1 from "../assets/images/projects-photos/Jomana/jomana1.webp";
import Jomana2 from "../assets/images/projects-photos/Jomana/jomana2.webp";
import Jomana3 from "../assets/images/projects-photos/Jomana/jomana3.webp";
import Jomana4 from "../assets/images/projects-photos/Jomana/jomana4.webp";
import TheEdge1 from "../assets/images/projects-photos/The Edge/thedge1.webp";
import TheEdge2 from "../assets/images/projects-photos/The Edge/thedge2.webp";
import TheEdge3 from "../assets/images/projects-photos/The Edge/thedge3.webp";
import TheEdge4 from "../assets/images/projects-photos/The Edge/thedge4.webp";
import Water1 from "../assets/images/projects-photos/The Waterside At The Sanctuary/water1.webp";
import Water2 from "../assets/images/projects-photos/The Waterside At The Sanctuary/water2.webp";
import Water3 from "../assets/images/projects-photos/The Waterside At The Sanctuary/water3.webp";
import Water4 from "../assets/images/projects-photos/The Waterside At The Sanctuary/water4.webp";
import Img6 from "../assets/images/plans/6.webp";
import PMIcon from "../assets/images/platform-icons/PM.png";
import TRCIcon from "../assets/images/platform-icons/tether.png";
import BitcoinIcon from "../assets/images/platform-icons/bitcoin.png";
import EthereumIcon from "../assets/images/platform-icons/ethereum.png";
import SolanaIcon from "../assets/images/platform-icons/solana.png";
import PolkadotIcon from "../assets/images/platform-icons/polkadot-logo.png";
import BnbIcon from "../assets/images/platform-icons/bnb.png";
import QiwiIcon from "../assets/images/platform-icons/qiwi.png";

export const LOGIN_ROUTE = "/login";
export const ACCOUNT_ROUTE = "/my-account";

export const STATUS_MAPLIST = {
  Ожидание: {
    color: "processing",
    icon: <SyncOutlined spin />,
  },
  Выполнено: {
    color: "success",
    icon: <CheckCircleOutlined />,
  },
  Отмена: {
    color: "error",
    icon: <CloseCircleOutlined />,
  },
};

export const WALLETS = {
  "Perfect Money": "U40108873",
  Bnb: "0xeb24cdB1DFd1f6a7B709D68FF31680388C970b21",
  "TRC20 Tether": "TBqaDhbgWnS1MndLM6vBNTNXHgkdyLZu5V",
  Polkadot: "12qKuqNfo6ZZxi7v1VYriyVRc631QD2DanU6gyf5LuTwYzYD",
  Ethereum: "0xeb24cdB1DFd1f6a7B709D68FF31680388C970b21",
  Bitcoin: "bc1qstglqnwpqe5l990cr69rt75pkvkk0hhwnvaphg",
  Solana: "7fGF4cGJB2eh5MSd3sKBArZmx9ER1awjnL4gMsp9SjZg",
  QIWI: "2200730251373524",
};

export const WALLETS_ICONS = {
  "Perfect Money": PMIcon,
  "TRC20 Tether": TRCIcon,
  Bitcoin: BitcoinIcon,
  Ethereum: EthereumIcon,
  Solana: SolanaIcon,
  Polkadot: PolkadotIcon,
  Bnb: BnbIcon,
  QIWI: QiwiIcon,
};

export const getPlans = (t) => {
  return [
    {
      title: `${t("tariffs.plan")} 1`,
      percent: 1.5,
      days: 30,
      min: 100,
      max: 1500,
      image: Seagate1,
      plan: 1,
      name: t("tariffs.newbie"),
      payout: t("tariffs.pay_everyday"),
      payouts: t("tariffs.in_day"),
      dataTotalInvestment: [1030205, 500320, 2505300, 5356435, 654820, 0, 0, 0, 0, 0, 0, 0],
      dataTotalInvestors: [355, 361, 235, 785, 226, 0, 0, 0, 0, 0, 0, 0],
      dataCountries: [44, 33, 8, 7, 4, 4],
      dataPayments: [12, 19, 3, 5, 2, 3, 6, 2],
      projectName: "Seagate",
      place: "Dubai",
      type: "Апартаменты",
      developer: "EMAAR Properties",
      status: "Строится",
      dateStart: "1 квартал 2010",
      dateEnd: "3 квартал 2025",
      district: "Mina Rashid",
      minArea: 65,
      startPrice: 384000,
      sliderImages: [Seagate2, Seagate3, Seagate4],
    },
    {
      title: `${t("tariffs.plan")} 2`,
      percent: 2.3,
      days: 24,
      min: 1500,
      max: 8000,
      image: CanalHeights1,
      plan: 2,
      name: t("tariffs.basic"),
      payout: t("tariffs.pay_everyday"),
      payouts: t("tariffs.in_day"),
      dataTotalInvestment: [830215, 1553655, 763110, 1156025, 837340, 0, 0, 0, 0, 0, 0, 0],
      dataTotalInvestors: [153, 575, 1156, 785, 205, 0, 0, 0, 0, 0, 0, 0],
      dataCountries: [54, 23, 10, 5, 3, 5],
      dataPayments: [12, 19, 3, 5, 2, 3, 6, 2],
      projectName: "Canal Heights",
      place: "Dubai",
      type: "Жилищный комплекс",
      developer: "DAMAC Properties",
      status: "Строится",
      dateStart: "3 квартал 2012",
      dateEnd: "3 квартал 2027",
      district: "Business Bay",
      minArea: 41,
      startPrice: 335000,
      sliderImages: [CanalHeights2, CanalHeights3, CanalHeights4],
    },
    {
      title: `${t("tariffs.plan")} 3`,
      percent: 3.5,
      days: 18,
      min: 8000,
      max: 15000,
      image: Jomana1,
      plan: 3,
      name: t("tariffs.optimal"),
      payout: t("tariffs.pay_everyday"),
      payouts: t("tariffs.in_day"),
      dataTotalInvestment: [1846490, 1100405, 615655, 1429990, 1512145, 0, 0, 0, 0, 0, 0, 0],
      dataTotalInvestors: [540, 1023, 235, 785, 259, 0, 0, 0, 0, 0, 0, 0],
      dataCountries: [60, 17, 9, 6, 5, 3],
      dataPayments: [12, 19, 3, 5, 2, 3, 6, 2],
      projectName: "Jomana",
      place: "Dubai",
      type: "Жилищный комплекс",
      developer: "Meraas",
      status: "Строится",
      dateStart: "4 квартал 2009",
      dateEnd: "2 квартал 2026",
      district: "Madinat Jumeirah",
      minArea: 74,
      startPrice: 520000,
      sliderImages: [Jomana2, Jomana3, Jomana4],
    },
    {
      title: `${t("tariffs.plan")} 4`,
      percent: 56,
      days: 10,
      min: 15000,
      max: 40000,
      image: TheEdge1,
      plan: 4,
      name: t("tariffs.experienced"),
      payout: t("tariffs.end_term"),
      payouts: t("tariffs.end_term"),
      dataTotalInvestment: [1157535, 1505925, 778290, 1760280, 1220415, 0, 0, 0, 0, 0, 0, 0],
      dataTotalInvestors: [171, 891, 981, 794, 164, 0, 0, 0, 0, 0, 0, 0],
      dataCountries: [49, 20, 13, 10, 3, 5],
      dataPayments: [12, 19, 3, 5, 2, 3, 6, 2],
      projectName: "The Edge",
      place: "Dubai",
      type: "Апартаменты",
      developer: "Ellington Properties Select Group",
      status: "Строится",
      dateStart: "2 квартал 2009",
      dateEnd: "4 квартал 2026",
      district: "MBR City (District One)",
      minArea: 729,
      startPrice: 305000,
      sliderImages: [TheEdge2, TheEdge3, TheEdge4],
    },
    {
      title: `${t("tariffs.plan")} 5`,
      percent: 45,
      days: 6,
      min: 40000,
      max: 80000,
      image: Water1,
      plan: 5,
      name: t("tariffs.maximum"),
      payout: t("tariffs.end_term"),
      payouts: t("tariffs.end_term"),
      dataTotalInvestment: [1106590, 1402535, 283585, 1618880, 807775, 0, 0, 0, 0, 0, 0, 0],
      dataTotalInvestors: [496, 1023, 235, 785, 332, 0, 0, 0, 0, 0, 0, 0],
      dataCountries: [50, 20, 13, 9, 3, 5],
      dataPayments: [12, 19, 3, 5, 2, 3, 6, 2],
      projectName: "The Waterside At The Sanctuary",
      place: "Dubai",
      type: "Жилищное комьюнити",
      developer: "Ellington Properties",
      status: "Строится",
      dateStart: "4 квартал 2007",
      dateEnd: "4 квартал 2025",
      district: "MBR City (District One)",
      minArea: 729,
      startPrice: 4628000,
      sliderImages: [Water2, Water3, Water4],
    },
    {
      title: `${t("tariffs.plan")} 6`,
      percent: "Индивидуально",
      days: "",
      min: 80000,
      max: 1000000,
      image: Img6,
      plan: 6,
      name: t("tariffs.individual"),
      individual: true,
      payout: t("tariffs.end_term"),
      payouts: t("tariffs.end_term"),
      dataTotalInvestment: [1778830, 1592960, 940295, 1955820, 695030, 0, 0, 0, 0, 0, 0, 0],
      dataTotalInvestors: [516, 1023, 460, 922, 460, 0, 0, 0, 0, 0, 0, 0],
      dataCountries: [49, 28, 9, 6, 3, 5],
      dataPayments: [12, 19, 3, 5, 2, 3, 6, 2],
      place: "",
      type: "",
      projectName: t("tariffs.individual"),
      developer: "",
      status: "",
      dateStart: "",
      dateEnd: "",
      district: "",
      minArea: "",
      startPrice: "",
    },
  ];
};

export const PERCENTAGE_BY_LVL = {
  1: 7,
  2: 4,
  3: 3,
  4: 2,
  5: 1,
};

export const PERFECT_MONEY = "Perfect Money";
export const BITCOIN = "Bitcoin";
export const ETHEREUM = "Ethereum";
export const TRC20_TETHER = "TRC20 Tether";
export const SOLANA = "Solana";
export const POLKADOT = "Polkadot";
export const BNB = "Bnb";
export const QIWI = "QIWI";
