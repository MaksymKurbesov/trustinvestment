import { TransactionsTable } from "./TransactionsTable";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  getCountFromServer,
  startAfter,
  endBefore,
  limitToLast,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../index";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "react-query";
import { fetchTransaction, showNext } from "../../services/TransactionsService";
import { useTransactionsQuery } from "../../services/useTransactionsQuery";

const Transactions = () => {
  const auth = getAuth();
  const [totalTransactions, setTotalTransactions] = useState(0);
  const { firestore } = useContext(FirebaseContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [lastTransaction, setLastTransaction] = useState(null);
  const queryClient = useQueryClient();

  const [currentTransactions, setCurrentTransactions] = useState(null);

  const transactionsCollection = query(
    collection(firestore, "transactions"),
    where("account_id", "==", auth.currentUser.uid)
  );

  const {
    data: transactions,
    isLoading,
    refetch,
  } = useQuery(
    ["transactions"],
    () => {
      return fetchTransaction();
    },
    {
      enabled: false,
      // refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setCurrentTransactions(data);
        setLastTransaction(data[data.length - 1]);
      },
    }
  );

  // const { data: transactions, refetch } = useTransactionsQuery();

  console.log(currentTransactions, "currentTransactions");

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!auth.currentUser) return;

    getCountFromServer(transactionsCollection).then((coll) => {
      setTotalTransactions(coll.data().count);
    });
  }, []);

  const showNext = ({ item, setPageHandler }) => {
    if (currentTransactions.length === 0) {
      return;
    } else {
      const fetchNextData = async () => {
        setLoading(true);
        const transactionsDocRef = query(
          collection(firestore, "transactions"),
          where("account_id", "==", auth.currentUser.uid),
          orderBy("date", "desc"),
          limit(10),
          startAfter(item.date)
        );

        await getDocs(transactionsDocRef).then((transaction) => {
          const arr = [];

          transaction.docs.map((item, index) => {
            arr.push({ ...item.data(), key: index, id: item.id.slice(0, 5) });
            setCurrentTransactions(arr);
            setPage(page + 1);
          });
        });
      };
      fetchNextData().then(() => setLoading(false));
    }
  };

  const showPrevious = ({ item }) => {
    const fetchPreviousData = async () => {
      setLoading(true);
      const transactionsDocRef = query(
        collection(firestore, "transactions"),
        where("account_id", "==", auth.currentUser.uid),
        orderBy("date", "desc"),
        endBefore(item.date),
        limitToLast(10)
      );

      await getDocs(transactionsDocRef).then((transaction) => {
        const arr = [];

        transaction.docs.map((item, index) => {
          arr.push({ ...item.data(), key: index, id: item.id.slice(0, 5) });
          setCurrentTransactions(arr);
          setPage(page - 1);
        });
      });
    };

    fetchPreviousData().then(() => setLoading(false));
  };

  return (
    <div>
      <h3 className={"my-account-title"}>{t("transactions.title")}</h3>
      <TransactionsTable
        transactions={currentTransactions}
        totalTransactions={totalTransactions}
        showNext={showNext}
        showPrevious={showPrevious}
        loading={loading}
      />
    </div>
  );
};

export { Transactions };
