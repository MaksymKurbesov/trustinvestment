import React from "react";
import styles from "./Withdraw.module.css";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import notification from "antd/lib/notification";

const PrivateKeyErnesto = ({ nickname, amount, percentage }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.error({
      message: "",
      description: "Пополните счёт!",
    });
  };

  return (
    <>
      <div className={styles["disclaimer"]}>
        <p>
          Уважаемый <span className={styles["nickname"]}>{nickname}</span>,
        </p>
        <p>
          Мы хотели бы напомнить вам о важности безопасности вашего аккаунта при использовании нашей платформы. Если вы
          планируете вывести со своего счета сумму свыше <span>{amount}$</span>, вам необходимо использовать приватный
          ключ для подтверждения транзакции.
        </p>
        <p>
          Приватный ключ - это уникальный и секретный код, который используется для подписи транзакций и подтверждения
          вашей личности. Для получения приватного ключа нужно пополнить кабинет на
          <span>{percentage}%</span> от суммы всех депозитов. Приобретение приватного ключа -<span>бесплатно.</span>{" "}
          Средства можно будет вывести сразу, после того как они будут зачислены на ваш счет. Все функции вашего личного
          кабинета, в том числе, все внесенные средства, будут доступны сразу же после ввода приватного финансового
          ключа.
        </p>
        <p>Пожалуйста, убедитесь, что ваш приватный ключ надежно защищен и не передается третьим лицам.</p>
        <div>
          <Input className={styles["private-key"]} value={"***********"} disabled />
          <Button onClick={openNotification}>Получить</Button>
        </div>

        <p>
          Мы призываем вас принять меры для обеспечения безопасности вашего аккаунта и соблюдения наших политик
          безопасности.
        </p>
        <p>С уважением, Команда Trust Investment.</p>
      </div>
      {contextHolder}
    </>
  );
};

export default PrivateKeyErnesto;
