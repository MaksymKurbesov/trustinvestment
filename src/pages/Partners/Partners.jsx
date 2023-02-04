import styles from "./Partners.module.css";
import { Button, Input, notification, Table } from "antd";
import {
  CheckCircleFilled,
  HeartFilled,
  SmileFilled,
  SmileOutlined,
  ThunderboltFilled,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../components/Auth-Provider/AuthContext";
import { FirebaseContext } from "../../index";
import { collection, getDocs, query, where } from "firebase/firestore";

const columns = [
  {
    title: "Никнейм",
    dataIndex: "nickname",
    key: "nickname",
  },
  {
    title: "Всего инвестировано",
    dataIndex: "invested",
    key: "invested",
  },
  {
    title: "Рефералы",
    dataIndex: "referralsTo",
    key: "referralsTo",
  },
  {
    title: "Дата регистрации",
    dataIndex: "registrationDate",
    key: "registrationDate",
  },
];

const Partners = () => {
  const { currentUser } = useContext(AuthContext);
  const [referralsList, setReferralsList] = useState([]);
  const { firestore } = useContext(FirebaseContext);

  const getReferrals = () => {
    console.log(currentUser.referredTo);

    currentUser.referredTo["1"].map(async (user, index) => {
      const q = query(
        collection(firestore, "users"),
        where("nickname", "==", user)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((item) => {
        setReferralsList([...referralsList, { key: index, ...item.data() }]);
      });
    });
  };

  // const getReferrals = () => {
  //   for (const [key, value] of Object.entries(currentUser.referredTo)) {
  //     console.log(`${key} ${value}`);
  //   }
  // };

  useEffect(() => {
    getReferrals();
  }, []);

  console.log(referralsList);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: "",
      description: "Реферальная ссылка скопирована!",
      icon: (
        <SmileOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ),
    });
  };

  return (
    <div>
      <h3 className={"my-account-title"}>Партнёрам</h3>
      <div className={styles["referral-wrapper"]}>
        <div className={styles["referral-info"]}>
          <p className={styles["your-sponsor"]}>
            Ваш спонсор:
            <span>{currentUser.referredBy ? currentUser.referredBy : "-"}</span>
          </p>
          <div className={styles["referral-link"]}>
            <p>Ваша реферальная ссылка:</p>
            <Input
              readOnly={"readonly"}
              defaultValue={`https://dubaitrustinvestment.net/register?ref=${currentUser.nickname}`}
            />
          </div>
          <Button
            onClick={() => {
              openNotification();
              navigator.clipboard.writeText(
                `https://dubaitrustinvestment.net/register?ref=${currentUser.nickname}`
              );
            }}
          >
            Копировать
          </Button>
        </div>
        <div className={styles["status"]}>
          <CheckCircleFilled className={styles["icon"]} />
          <p>Ваш статус:</p>
          <span>Партнёр</span>
        </div>
        <div className={styles["registered-clients"]}>
          <SmileFilled className={styles["icon"]} />
          <div>
            <p>Всего рефералов:</p>
            <span>0</span>
          </div>
          <div>
            <p>Активных:</p>
            <span>0</span>
          </div>
        </div>
        <div className={styles["your-sponsor-mobile"]}>
          <p>Ваш спонсор:</p>
          <span>{currentUser.referredBy ? currentUser.referredBy : "-"}</span>
        </div>
        <div className={styles["deposits-bought"]}>
          <ThunderboltFilled className={styles["icon"]} />
          <div className={styles["deposits-bought-info"]}>
            <p>Куплено пакетов:</p>
            <span>0</span>
          </div>
        </div>
        <div className={styles["levels"]}>
          <ul className={styles["levels-list"]}>
            <li>
              <span>1 уровень</span>
              <p>
                Рефералов: <span>0</span>
              </p>
              <p>
                Активных: <span>0</span>
              </p>
              <p>
                Всего инвестировано: <span>0 USD</span>
              </p>
            </li>
            <li>
              <span>2 уровень</span>
              <p>
                Рефералов: <span>0</span>
              </p>
              <p>
                Активных: <span>0</span>
              </p>
              <p>
                Всего инвестировано: <span>0 USD</span>
              </p>
            </li>
            <li>
              <span>3 уровень</span>
              <p>
                Рефералов: <span>0</span>
              </p>
              <p>
                Активных: <span>0</span>
              </p>
              <p>
                Всего инвестировано: <span>0 USD</span>
              </p>
            </li>
            <li>
              <span>4 уровень</span>
              <p>
                Рефералов: <span>0</span>
              </p>
              <p>
                Активных: <span>0</span>
              </p>
              <p>
                Всего инвестировано: <span>0 USD</span>
              </p>
            </li>
            <li>
              <span>5 уровень</span>
              <p>
                Рефералов: <span>0</span>
              </p>
              <p>
                Активных: <span>0</span>
              </p>
              <p>
                Всего инвестировано: <span>0 USD</span>
              </p>
            </li>
          </ul>
        </div>
        <div className={styles["partner-percentage"]}>
          <HeartFilled className={styles["icon"]} />
          <p>Партнёрская программа</p>
          <span className={styles["percentage"]}>7%-4%-3%-2%-1%</span>
        </div>

        <Table
          scroll={{ x: 1100 }}
          dataSource={referralsList}
          columns={columns}
          className={styles["your-referrals"]}
        />
      </div>
      <>{contextHolder}</>
    </div>
  );
};

export { Partners };
