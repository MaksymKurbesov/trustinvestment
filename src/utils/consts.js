import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";

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

// export const PERFECT_MONEY = "PERFECT_MONEY";
// export const BITCOIN = "BITCOIN";
// export const ETHEREUM = "ETHEREUM";
// export const TRC20_TETHER = "TRC20_TETHER";
// export const SOLANA = "SOLANA";
// export const POLKADOT = "POLKADOT";
// export const BNB = "BNB";

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

export const PAYMENT_METHODS_MAP = {
  PERFECT_MONEY: "Perfect Money",
  BITCOIN: "Bitcoin",
  ETHEREUM: "Ethereum",
  TRC20_TETHER: "TRC20 Tether",
  SOLANA: "Solana",
  POLKADOT: "Polkadot",
  BNB: "Bnb",
  QIWI: "QIWI",
};
