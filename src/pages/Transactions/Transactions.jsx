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

const Transactions = () => {
  const auth = getAuth();
  const [transactions, setTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(null);
  const { firestore } = useContext(FirebaseContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const transactionsCollection = query(
    collection(firestore, "transactions"),
    where("account_id", "==", auth.currentUser.uid)
  );

  useEffect(() => {
    if (!auth.currentUser) return;
    const getTransactions = async () => {
      setLoading(true);
      await getCountFromServer(transactionsCollection).then((coll) => {
        setTotalTransactions(coll.data().count);
      });

      const transactionsDocRef = query(
        collection(firestore, "transactions"),
        where("account_id", "==", auth.currentUser.uid),
        orderBy("date", "desc"),
        limit(10)
      );

      await getDocs(transactionsDocRef).then((transaction) => {
        const arr = [];

        transaction.docs.map((item, index) => {
          arr.push({ ...item.data(), key: index, id: item.id.slice(0, 5) });
          setTransactions(arr);
        });
      });
    };

    getTransactions().then(() => setLoading(false));
  }, []);

  const showNext = ({ item }) => {
    if (transactions.length === 0) {
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
            setTransactions(arr);
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
          setTransactions(arr);
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
        transactions={transactions}
        totalTransactions={totalTransactions}
        showNext={showNext}
        showPrevious={showPrevious}
        loading={loading}
      />
    </div>
  );
};

export { Transactions };
