import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestore } from "../index";
import { QueryClient } from "react-query";

// const auth = getAuth();
const queryClient = new QueryClient();

export const fetchTransaction = async (paginateItem) => {
  const arr = [];
  let nextTransactionsRef;

  const transactionsDocRef = query(
    collection(firestore, "transactions"),
    where("account_id", "==", getAuth().currentUser.uid),
    orderBy("date", "desc"),
    limit(10)
  );

  if (paginateItem) {
    nextTransactionsRef = query(
      collection(firestore, "transactions"),
      where("account_id", "==", getAuth().currentUser.uid),
      orderBy("date", "desc"),
      limit(10),
      startAfter(paginateItem?.date)
    );
  }

  const transactionsRef = paginateItem ? nextTransactionsRef : transactionsDocRef;

  await getDocs(transactionsDocRef).then((transaction) => {
    transaction.docs.map((item, index) => {
      arr.push({ ...item.data(), key: index, id: item.id.slice(0, 5) });
    });
  });

  return arr;
};

export const showNext = async (item) => {
  const arr = [];

  const transactionsDocRef = query(
    collection(firestore, "transactions"),
    where("account_id", "==", getAuth().currentUser.uid),
    orderBy("date", "desc"),
    limit(10),
    startAfter(item.date)
  );

  await getDocs(transactionsDocRef).then((transaction) => {
    transaction.docs.map((item, index) => {
      arr.push({ ...item.data(), key: index, id: item.id.slice(0, 5) });
      // setPageHandler((prevState) => prevState + 1);
    });
  });

  console.log(arr, "arr");

  queryClient.setQueryData(["transactions"], arr);
  // queryClient.invalidateQueries(["transactions"]);

  // return arr;
};
