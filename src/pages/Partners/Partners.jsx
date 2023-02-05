import styles from "./Partners.module.css";
import { Button, Input, notification, Table } from "antd";
import { CheckCircleFilled, HeartFilled, SmileFilled, SmileOutlined, ThunderboltFilled } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../components/Auth-Provider/AuthContext";
import { FirebaseContext } from "../../index";
import { collection, getDocs, query, where } from "firebase/firestore";
import { LevelCollapse } from "./LevelCollapse";

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

const getNumberOfReferrals = (referrals) => {
  return Object.values(referrals).reduce((accum, val) => {
    return accum + val.length;
  }, 0);
};

const getActiveReferrals = (referrals) => {
  return Object.values(referrals).reduce((accum, value) => {
    const activeReferrals = value.filter((item) => item.invested > 0).length;
    return accum + activeReferrals;
  }, 0);
};

const getPurchasedPlans = (user) => {
  return user.deposits.active.length + user.deposits.inactive.length;
};

const Partners = () => {
  const { currentUser } = useContext(AuthContext);
  const [referralsList, setReferralsList] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  });
  const { firestore } = useContext(FirebaseContext);

  console.log(referralsList);

  const getReferrals = (referrals) => {
    for (const [level, userNicknames] of Object.entries(referrals)) {
      userNicknames.forEach(async (userNickname) => {
        const q = query(collection(firestore, "users"), where("nickname", "==", userNickname));

        console.log(level, "level");
        await getDocs(q).then((snap) => {
          snap.docs.map((item, index) => {
            setReferralsList((prevState) => ({
              ...prevState,
              [level]: [
                ...prevState[level],
                {
                  ...item.data(),
                  numberOfReferrals: getNumberOfReferrals(item.data().referredTo),
                  key: item.data().uid,
                },
              ],
            }));
          });
        });
      });
    }
  };

  useEffect(() => {
    getReferrals(currentUser.referredTo);
  }, []);

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
              navigator.clipboard.writeText(`https://dubaitrustinvestment.net/register?ref=${currentUser.nickname}`);
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
            <span>{getNumberOfReferrals(currentUser.referredTo)}</span>
          </div>
          <div>
            <p>Активных:</p>
            <span>{getActiveReferrals(referralsList)}</span>
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
            <span>{getPurchasedPlans(currentUser)}</span>
          </div>
        </div>
        <div className={`${styles["levels"]} levelsRoot`}>
          <LevelCollapse referralsList={referralsList} />
        </div>
        <div className={styles["partner-percentage"]}>
          <HeartFilled className={styles["icon"]} />
          <p>Партнёрская программа</p>
          <span className={styles["percentage"]}>7%-4%-3%-2%-1%</span>
        </div>

        <Table scroll={{ x: 1100 }} dataSource={[]} columns={columns} className={styles["your-referrals"]} />
      </div>
      <>{contextHolder}</>
    </div>
  );
};

export { Partners };
