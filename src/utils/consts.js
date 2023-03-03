import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";
import TeamMember2 from "../assets/images/team-members/2.png";
import TeamMember3 from "../assets/images/team-members/3.png";
import TeamMember1 from "../assets/images/team-members/1.png";
import TeamMember4 from "../assets/images/team-members/4.png";
import TeamMember5 from "../assets/images/team-members/5.png";
import TeamMember6 from "../assets/images/team-members/6.png";

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
  "TRC20 Tether": "0xeb24cdB1DFd1f6a7B709D68FF31680388C970b21",
  Polkadot: "12qKuqNfo6ZZxi7v1VYriyVRc631QD2DanU6gyf5LuTwYzYD",
  Ethereum: "0xeb24cdB1DFd1f6a7B709D68FF31680388C970b21",
  Bitcoin: "bc1qstglqnwpqe5l990cr69rt75pkvkk0hhwnvaphg",
  Solana: "7fGF4cGJB2eh5MSd3sKBArZmx9ER1awjnL4gMsp9SjZg",
  QIWI: "2200730251373524",
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

export const MEMBERS_LIST = [
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
