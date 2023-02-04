import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Input, Modal, Result } from "antd";
import styles from "./Replenishment.module.css";
import { useContext, useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { getRandomArbitrary } from "../../utils/helpers";
import { ConfirmedWindow } from "../../components/ConfirmedWindow/ConfirmedWindow";
import { useForm } from "@formspree/react";
import { WALLETS } from "../../utils/consts";
import AuthContext from "../../components/Auth-Provider/AuthContext";

const Replenishment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionID, setTransactionID] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { firestore } = useContext(FirebaseContext);
  const [state, handleSubmit] = useForm("xvongjlo");
  const [form] = Form.useForm();

  useEffect(() => {
    setTransactionID(getRandomArbitrary);
  }, []);

  const data = location.state;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  console.log(data.paymentMethod);

  const onFinish = (value) => {
    form.validateFields().then((values) => {
      showModal();
      const sendData = async () => {
        await addDoc(collection(firestore, "transactions"), {
          account_id: currentUser.uid,
          amount: data.amount,
          status: "Ожидание",
          type: "Пополнение",
          date: new Date(),
          email: currentUser.email,
          paymentMethod: data.paymentMethod,
          executor: data.paymentMethod,
        });
      };
      sendData();

      handleSubmit({
        ...values,
        email: currentUser.email,
        amount: data.amount,
        tariffPlan: data.tariffPlan,
      });
    });
  };

  return (
    <div className={`${styles["replenishment"]} replenishmentRoot`}>
      <h2 className={"my-account-title"}>Пополнение</h2>
      <table className={styles["bill"]}>
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
            <td>
              {WALLETS[data.paymentMethod]}
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(WALLETS[data.paymentMethod]);
                }}
                className={styles["copy-button"]}
              >
                Копировать
              </Button>
            </td>
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
      <Form form={form}>
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
            value={`invoice #${transactionID}, ${currentUser.nickname}`}
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
          <Button type="primary" key={"submit"} onClick={onFinish}>
            Подтвердить
          </Button>
        </Form.Item>
      </Form>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        className={"replenishment-modal"}
      >
        <ConfirmedWindow transactionID={transactionID} />
      </Modal>
    </div>
  );
};

export { Replenishment };
