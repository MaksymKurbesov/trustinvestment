import styles from "./UserWallets.module.css";
import Slider from "react-slick";
import { ICONS } from "../../pages/Personal-Area/ICONS";
import { useContext, useEffect, useRef, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { FirebaseContext } from "../../index";
import { collection, query, where, runTransaction } from "firebase/firestore";
import { useCollection, useCollectionOnce } from "react-firebase-hooks/firestore";
import AuthContext from "../Auth-Provider/AuthContext";

const sliderSettings = {
  speed: 500,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 1700,
      settings: {
        slidesToShow: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        infinite: true,
        dots: true,
      },
    },
  ],
};

const getTotalDeposited = (transactions) => {
  return transactions.reduce((accum, value) => {
    return accum + parseInt(value.amount);
  }, 0);
};

const UserWallets = ({ paymentMethods }) => {
  const { currentUser } = useContext(AuthContext);
  const sliderRef = useRef();
  const { firestore } = useContext(FirebaseContext);

  const [transactions, setTransactions] = useState([]);

  const q = query(
    collection(firestore, "transactions"),
    where("account_id", "==", currentUser.uid),
    where("status", "==", "Выполнено"),
    where("type", "==", "Пополнение")
  );

  const [transactionsRef, loading, error] = useCollection(q);

  useEffect(() => {
    if (!transactionsRef) return;

    const transactionsArray = [];
    transactionsRef.docs.map((transaction) => {
      transactionsArray.push(transaction.data());
      setTransactions(transactionsArray);
    });
  }, [loading]);

  console.log(transactions);

  return (
    <div className={styles["slider-wrapper"]}>
      <Slider ref={sliderRef} {...sliderSettings}>
        {paymentMethods.map((platform, i) => {
          return (
            <div className={styles["platform-balance"]} key={i}>
              <div className={styles["title"]}>
                <p className={styles["platform-name"]}>{platform.name}</p>
                <img src={ICONS[i]} width={35} />
              </div>
              <ul className={styles["platform-statistic"]}>
                <li>
                  <p>Доступно</p>
                  <span>{platform.available} USD</span>
                </li>
                <li>
                  <p>Пополнено</p>
                  <span>{getTotalDeposited(transactions.filter((item) => item.executor === platform.name))} USD</span>
                </li>
                <li>
                  <p>Выведено</p>
                  <span>{platform.withdrawn} USD</span>
                </li>
                <li>
                  <p>Реферальные</p>
                  <span>{platform.referals} USD</span>
                </li>
              </ul>
            </div>
          );
        })}
      </Slider>
      <div className={styles["custom-arrows"]}>
        <button onClick={() => sliderRef.current.slickPrev()}>
          <LeftOutlined />
        </button>
        <button onClick={() => sliderRef.current.slickNext()}>
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

export { UserWallets };
