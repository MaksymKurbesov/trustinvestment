import styles from "./UserWallets.module.css";
import Slider from "react-slick";
import { ICONS } from "../../pages/Personal-Area/ICONS";
import { useContext, useEffect, useRef, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { FirebaseContext } from "../../index";
import { collection, query, where, runTransaction, onSnapshot, updateDoc, doc, increment } from "firebase/firestore";
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

const getTotalDeposited = (transactions, platform) => {
  const total = transactions
    .filter((item) => item.executor === platform)
    .reduce((accum, value) => {
      return accum + parseInt(value.amount);
    }, 0);

  return total;
};

const getAvailable = (transactions, platform) => {
  return transactions
    .filter((item) => item.executor === platform)
    .reduce((accum, value) => {
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
    where("type", "==", "Пополнение")
  );

  const [transactionsRef, loading, error] = useCollection(q);

  console.log(transactionsRef, "transactionsRef");

  const sortedByAvailable = Object.entries(paymentMethods).sort((a, b) => b[1].available - a[1].available);

  useEffect(() => {
    if (!transactionsRef) return;

    transactionsRef.docs.map((transaction) => {
      setTransactions((prevState) => [...prevState, transaction.data()]);
    });
  }, [loading]);

  return (
    <div className={styles["slider-wrapper"]}>
      <Slider ref={sliderRef} {...sliderSettings}>
        {sortedByAvailable.map((platform, i) => {
          // const totalAvailable =
          //   getTotalDeposited(transactions, platform[0]) -
          //   currentUser.invested +
          //   currentUser.earned -
          //   currentUser.withdrawn;
          const totalAvailable = 0;
          const totalDeposited = 0;
          // const totalDeposited = getTotalDeposited(transactions, platform[0]);

          return (
            <div className={styles["platform-balance"]} key={i}>
              <div className={styles["title"]}>
                <p className={styles["platform-name"]}>{platform[0]}</p>
                <img src={ICONS[platform[0]]} width={35} />
              </div>
              <ul className={styles["platform-statistic"]}>
                <li>
                  <p>Доступно</p>
                  {/*<span>{totalAvailable < 0 ? 0 : totalAvailable} USD</span>*/}
                  <span>{platform[1].available} USD</span>
                </li>
                <li>
                  <p>Пополнено</p>
                  <span>{platform[1].deposited} USD</span>
                </li>
                <li>
                  <p>Выведено</p>
                  <span>{platform[1].withdrawn} USD</span>
                </li>
                <li>
                  <p>Реферальные</p>
                  <span>{platform[1].referrals} USD</span>
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
