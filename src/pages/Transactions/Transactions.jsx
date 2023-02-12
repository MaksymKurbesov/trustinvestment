import { TransactionsTable } from "./TransactionsTable";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  startAfter,
  startAt,
  onSnapshot,
  updateDoc,
  doc,
  increment,
  getCountFromServer,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../index";

let lastVisible;

const Transactions = () => {
  const auth = getAuth();
  const [transactions, setTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(null);
  const { firestore } = useContext(FirebaseContext);
  const [page, setPage] = useState(1);

  let firstFetch = true;

  const transactionsCollection = query(
    collection(firestore, "transactions"),
    where("account_id", "==", auth.currentUser.uid)
  );

  const getTransactions = async () => {
    await getCountFromServer(transactionsCollection).then((coll) => {
      setTotalTransactions(coll.data().count);
    });

    // const transactionsDocRef = !firstFetch
    //   ? query(
    //       collection(firestore, "transactions"),
    //       where("account_id", "==", auth.currentUser.uid),
    //       orderBy("date", "desc"),
    //       startAt(lastVisible),
    //       limit(10)
    //     )
    //   : query(
    //       collection(firestore, "transactions"),
    //       where("account_id", "==", auth.currentUser.uid),
    //       orderBy("date", "desc"),
    //       limit(10)
    //     );

    const transactionsDocRef = query(
      collection(firestore, "transactions"),
      where("account_id", "==", auth.currentUser.uid),
      orderBy("date", "desc"),
      limit(10)
    );
    // onSnapshot(transactionsDocRef, (snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     const modifiedTransaction = change.doc.data();
    //
    //     console.log(modifiedTransaction, "before modifiedTransaction");
    //     console.log(change, "before change");
    //     if (change.type === "modified" && modifiedTransaction.status === "Выполнено") {
    //       console.log(modifiedTransaction, "after modifiedTransaction");
    //       console.log(change, "after change");
    //       updateDoc(doc(firestore, "users", auth.currentUser.email), {
    //         [`paymentMethods.${modifiedTransaction.paymentMethod}.available`]: increment(modifiedTransaction.amount),
    //         [`paymentMethods.${modifiedTransaction.paymentMethod}.deposited`]: increment(modifiedTransaction.amount),
    //       });
    //     }
    //   });
    // });

    await getDocs(transactionsDocRef)
      .then((transaction) => {
        const arr = [];

        transaction.docs.map((item, index) => {
          arr.push({ ...item.data(), key: index, id: item.id.slice(0, 5) });
          setTransactions(arr);
        });

        return transaction.docs[transaction.docs.length - 1];
      })
      .then((lastItem) => {
        firstFetch = false;
        lastVisible = lastItem;
      });
  };

  useEffect(() => {
    if (!auth.currentUser) return;
    getTransactions();
  }, [auth.currentUser, page]);

  return (
    <div>
      <h3 className={"my-account-title"}>Ваши транзакции</h3>
      <TransactionsTable transactions={transactions} totalTransactions={totalTransactions} />
    </div>
  );
};

export { Transactions };
