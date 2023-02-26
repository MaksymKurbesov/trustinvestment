import styles from "./Partners.module.css";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import notification from "antd/lib/notification";
import { CheckCircleFilled, HeartFilled, SmileFilled, SmileOutlined, ThunderboltFilled } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../components/Auth-Provider/AuthContext";
import { FirebaseContext } from "../../index";
import { collection, getDocs, query, where } from "firebase/firestore";
import { LevelCollapse } from "./LevelCollapse";
import { useOutletContext } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";

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

const Partners = () => {
  const [referralsList, setReferralsList] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  });
  const { firestore } = useContext(FirebaseContext);
  const { userData } = useOutletContext();
  const { t } = useTranslation();

  const getReferrals = (referrals) => {
    for (const [level, userNicknames] of Object.entries(referrals)) {
      userNicknames.forEach(async (userNickname) => {
        const q = query(collection(firestore, "users"), where("nickname", "==", userNickname));

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
    getReferrals(userData.referredTo);
  }, []);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: "",
      description: t("partner_page.referral_link_copied"),
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
      <h3 className={"my-account-title"}> {t("partner_page.title")}</h3>
      <div className={styles["referral-wrapper"]}>
        <div className={styles["referral-info"]}>
          <p className={styles["your-sponsor"]}>
            {t("partner_page.your_sponsor")}:<span>{userData.referredBy ? userData.referredBy : "-"}</span>
          </p>
          <div className={styles["referral-link"]}>
            <p>{t("partner_page.your_referral_link")}:</p>
            <Input
              readOnly={"readonly"}
              defaultValue={`https://dubaitrustinvestment.net/register?ref=${userData.nickname}`}
            />
          </div>
          <Button
            onClick={() => {
              openNotification();
              navigator.clipboard.writeText(`https://dubaitrustinvestment.net/register?ref=${userData.nickname}`);
            }}
          >
            {t("partner_page.copy")}
          </Button>
        </div>
        <div className={styles["status"]}>
          <CheckCircleFilled className={styles["icon"]} />
          <p>{t("partner_page.your_status")}:</p>
          <span>{t("partner_page.partner_status")}</span>
        </div>
        <div className={styles["registered-clients"]}>
          <SmileFilled className={styles["icon"]} />
          <div>
            <p>{t("partner_page.total_referrals")}:</p>
            <span>{getNumberOfReferrals(userData.referredTo)}</span>
          </div>
          <div>
            <p>{t("partner_page.active_referrals")}:</p>
            <span>{getActiveReferrals(referralsList)}</span>
          </div>
        </div>
        <div className={styles["your-sponsor-mobile"]}>
          <p>{t("partner_page.your_sponsor")}</p>
          <span>{userData.referredBy ? userData.referredBy : "-"}</span>
        </div>
        <div className={styles["deposits-bought"]}>
          <ThunderboltFilled className={styles["icon"]} />
          <div className={styles["deposits-bought-info"]}>
            <p>{t("partner_page.bought_deposits")}:</p>
            <span>0</span>
          </div>
        </div>
        <div className={`${styles["levels"]} levelsRoot`}>
          <LevelCollapse referralsList={referralsList} />
        </div>
        <div className={styles["partner-percentage"]}>
          <HeartFilled className={styles["icon"]} />
          <p>{t("partner_page.partner_programme")}</p>
          <span className={styles["percentage"]}>7%-4%-3%-2%-1%</span>
        </div>

        {/*<Table scroll={{ x: 1100 }} dataSource={[]} columns={columns} className={styles["your-referrals"]} />*/}
      </div>
      <>{contextHolder}</>
    </div>
  );
};

export { Partners };
