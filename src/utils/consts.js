import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";
import Img1 from "../assets/images/plans/3.webp";
import Img2 from "../assets/images/plans/4.webp";
import Img3 from "../assets/images/plans/1.webp";
import Img4 from "../assets/images/plans/2.webp";
import Img5 from "../assets/images/plans/5.webp";
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
  "TRC20 Tether": "TFJa4yu4WYP7XTF45842a5VFjAgY6znFJW",
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
      image: Img1,
      plan: 1,
      name: t("tariffs.newbie"),
      payout: t("tariffs.pay_everyday"),
      payouts: t("tariffs.in_day"),
    },
    {
      title: `${t("tariffs.plan")} 2`,
      percent: 2.3,
      days: 24,
      min: 1500,
      max: 8000,
      image: Img2,
      plan: 2,
      name: t("tariffs.basic"),
      payout: t("tariffs.pay_everyday"),
      payouts: t("tariffs.in_day"),
    },
    {
      title: `${t("tariffs.plan")} 3`,
      percent: 3.5,
      days: 18,
      min: 8000,
      max: 15000,
      image: Img3,
      plan: 3,
      name: t("tariffs.optimal"),
      payout: t("tariffs.pay_everyday"),
      payouts: t("tariffs.in_day"),
    },
    {
      title: `${t("tariffs.plan")} 4`,
      percent: 56,
      days: 10,
      min: 15000,
      max: 40000,
      image: Img4,
      plan: 4,
      name: t("tariffs.experienced"),
      payout: t("tariffs.end_term"),
      payouts: t("tariffs.end_term"),
    },
    {
      title: `${t("tariffs.plan")} 5`,
      percent: 45,
      days: 6,
      min: 40000,
      max: 80000,
      image: Img5,
      plan: 5,
      name: t("tariffs.maximum"),
      payout: t("tariffs.end_term"),
      payouts: t("tariffs.end_term"),
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
