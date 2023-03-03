import { useQuery } from "react-query";
import { fetchTransaction } from "./TransactionsService";

export const useTransactionsQuery = (item) => {
  return useQuery("transactions", fetchTransaction, { enabled: !item });
};
