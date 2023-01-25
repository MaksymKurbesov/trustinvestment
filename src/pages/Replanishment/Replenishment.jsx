import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Input, Modal, Result } from "antd";
import styles from "./Replenishment.module.css";
import { useContext, useEffect, useState } from "react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FirebaseContext } from "../../index";
import { secondsToStringDays } from "../../utils/helpers";

const Replenishment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const { firestore } = useContext(FirebaseContext);
  const auth = getAuth();

  const data = location.state;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await getDoc(doc(firestore, "users", user.email));
        setCurrentUser(snapshot.data());
      }
    });
  }, []);

  const onFinish = (value) => {
    showModal();
    const sendData = async () => {
      await addDoc(collection(firestore, "transactions"), {
        account_id: currentUser.uid,
        amount: 5000,
        status: "Ожидание",
        type: "Пополнение",
        date: new Date(),
      });
    };
    sendData();

    console.log(value);
  };

  return (
    <div className={`${styles["replenishment"]} replenishmentRoot`}>
      <h2 className={"my-account-title"}>Пополнение</h2>
      <table>
        <thead>
          <tr>
            <td>План</td>
            <td>{data.tariffPlan.title}</td>
          </tr>
          <tr>
            <td>Способ оплаты</td>
            <td>{data.paymentMethod}</td>
          </tr>
          <tr>
            <td>Сумма</td>
            <td>{data.amount} USD</td>
          </tr>
          <tr>
            <td>Кошелёк для оплаты</td>
            <td>U123456789</td>
          </tr>
          <tr>
            <td>Дата</td>
            <td>{data.date}</td>
          </tr>
        </thead>
      </table>
      <p className={styles["information"]}>
        Данные платежа произведенного вручную через {data.paymentMethod} и
        реквизиты плательщика
      </p>
      <Form onFinish={onFinish}>
        <Form.Item
          name={"transaction-id"}
          rules={[
            {
              required: true,
              message: "Введите пожалуйста номер транзакции!",
            },
          ]}
        >
          <Input
            className={styles["input"]}
            addonBefore={"Номер/хеш транзакции"}
          />
        </Form.Item>
        <Form.Item>
          <Input
            className={styles["input"]}
            addonBefore={"Примечание"}
            disabled
            value={"invoice #43283, username"}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className={styles["button-back"]}
            onClick={() => {
              navigate(-1);
            }}
          >
            Назад
          </Button>
          <Button type="primary" htmlType="submit">
            Подтвердить
          </Button>
        </Form.Item>
      </Form>
      <Modal open={isModalOpen} onOk={handleOk}>
        <Result
          status="success"
          title="Транзакция прошла успешно!"
          subTitle={
            <p>
              Номер транзакции: 00051 <br /> Обработка операции обычно занимает
              3-5 минут, ожидайте пожалуйста.
            </p>
          }
          extra={[
            <Button
              onClick={() => {
                navigate("/my-account");
              }}
              key="my-account"
              type="primary"
            >
              На главную
            </Button>,
            <Button
              onClick={() => {
                navigate("/my-account/transactions");
              }}
              key="transactions"
            >
              К транзакциям
            </Button>,
          ]}
        />
      </Modal>
    </div>
  );
};

export { Replenishment };
