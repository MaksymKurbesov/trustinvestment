import { TransactionsTable } from "./TransactionsTable";

const Transactions = ({ transactionsList }) => {
  return (
    <div>
      <h3 className={"my-account-title"}>Ваши транзакции</h3>
      <TransactionsTable transactions={transactionsList} />
    </div>
  );
};

export { Transactions };
