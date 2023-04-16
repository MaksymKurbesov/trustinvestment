import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Modal from "antd/lib/modal";
import styles from "./Replenishment.module.css";
import { useContext, useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { getRandomArbitrary } from "../../utils/helpers";
import { ConfirmedWindow } from "../../components/ConfirmedWindow/ConfirmedWindow";
import { useTranslation } from "react-i18next";

const Replenishment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionID, setTransactionID] = useState(null);
  const { t } = useTranslation();
  const { userData } = useOutletContext();
  const navigate = useNavigate();
  const { firestore } = useContext(FirebaseContext);
  const [form] = Form.useForm();

  useEffect(() => {
    setTransactionID(getRandomArbitrary);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const onFinish = (value) => {
    form.validateFields().then((values) => {
      showModal();
      const sendData = async () => {
        await addDoc(collection(firestore, "transactions"), {
          account_id: userData.uid,
          status: "Ожидание",
          type: "Пополнение",
          date: new Date(),
          email: userData.email,
        });
      };
      sendData();
    });
  };

  if (!userData) return;

  return (
    <div className={`${styles["replenishment"]} replenishmentRoot`}>
      <h2 className={"my-account-title"}>{t("replenishment.title")}</h2>
      <table className={styles["bill"]}>
        <thead>
          <tr>
            <td>{t("replenishment.plan")}</td>
            {/*<td>{data.tariffPlan.title}</td>*/}
          </tr>
          <tr>
            <td>{t("replenishment.payment_method")}</td>
            {/*<td>{data.paymentMethod}</td>*/}
          </tr>
          <tr>
            <td>{t("replenishment.amount")}</td>
            {/*<td>{data.amount} USD</td>*/}
          </tr>
          <tr>
            <td>{t("replenishment.wallet_for_pay")}</td>
            <td>
              {/*{WALLETS[data.paymentMethod]}*/}
              <Button
                onClick={() => {
                  // navigator.clipboard.writeText(WALLETS[data.paymentMethod]);
                }}
                className={styles["copy-button"]}
              >
                {t("replenishment.copy")}
              </Button>
            </td>
          </tr>
          <tr>
            <td>{t("replenishment.date")}</td>
            {/*<td>{data.date}</td>*/}
          </tr>
        </thead>
      </table>
      <p className={styles["information"]}>
        {/*Данные платежа произведенного вручную через {data.paymentMethod} и реквизиты плательщика*/}
      </p>
      <Form form={form}>
        <Form.Item
          name={"transaction-id"}
          rules={[
            {
              required: true,
              message: `${t("replenishment.transaction_warning")}`,
            },
          ]}
        >
          <Input className={styles["input"]} addonBefore={`${t("replenishment.transaction_number")}`} />
        </Form.Item>
        <Form.Item>
          <Input
            className={styles["input"]}
            addonBefore={`${t("replenishment.note")}`}
            disabled
            value={`invoice #${transactionID}, ${userData.nickname}`}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className={styles["button-back"]}
            onClick={() => {
              navigate(-1);
            }}
          >
            {t("replenishment.back")}
          </Button>
          <Button type="primary" key={"submit"} onClick={onFinish}>
            {t("replenishment.confirm")}
          </Button>
        </Form.Item>
      </Form>
      <Modal open={isModalOpen} onOk={handleOk} className={"replenishment-modal"}>
        <ConfirmedWindow transactionID={transactionID} />
      </Modal>
    </div>
  );
};

export { Replenishment };
