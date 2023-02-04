import {
  BarsOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
  HomeOutlined,
  ImportOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

export const MENU_LIST = [
  {
    title: "Кабинет",
    link: "/my-account",
    icon: <HomeOutlined />,
  },
  {
    title: "Сделать депозит",
    link: "/my-account/deposit",
    icon: <CreditCardOutlined />,
  },
  {
    title: "Вывод cредств",
    link: "/my-account/withdraw",
    icon: <DollarCircleOutlined />,
  },
  {
    title: "Транзакции",
    link: "/my-account/transactions",
    icon: <BarsOutlined />,
  },
  {
    title: "Партнёрам",
    link: "/my-account/partners",
    icon: <UsergroupAddOutlined />,
  },
  {
    title: "Настройки",
    link: "/my-account/settings",
    icon: <SettingOutlined />,
  },
  {
    title: "Выход",
    link: "/",
    icon: <ImportOutlined />,
  },
];
