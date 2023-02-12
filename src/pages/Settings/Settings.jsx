import styles from "./Settings.module.css";
import { Button, Form, Input, message } from "antd";
import { useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { BITCOIN, BNB, ETHEREUM, PERFECT_MONEY, POLKADOT, SOLANA, TRC20_TETHER } from "../../utils/consts";
import ChooseAvatarImage from "assets/images/add-avatar.png";
import AuthContext from "../../components/Auth-Provider/AuthContext";
import { useOutletContext } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Settings = () => {
  const { firestore } = useContext(FirebaseContext);
  const [messageApi, contextHolder] = message.useMessage();
  const { currentUser } = useContext(AuthContext);
  const { userData } = useOutletContext();
  const auth = getAuth();

  const success = () => {
    console.log("success");
    messageApi.open({
      type: "success",
      content: "Данные успешно обновлены",
    });
  };

  const error = (e) => {
    console.log("error");
    messageApi.open({
      type: "error",
      content: e,
    });
  };

  const onFinish = (values) => {
    const sendData = async () => {
      const payments = userData.paymentMethods;

      await updateDoc(doc(firestore, "users", auth.currentUser.email), {
        email: values.email,
        phoneNumber: values.phone,
        nickname: values.nickname,
        paymentMethods: {
          [BITCOIN]: {
            ...payments[BITCOIN],
            number: values[BITCOIN],
          },
          [BNB]: {
            ...payments[BNB],
            number: values[BNB],
          },
          [PERFECT_MONEY]: {
            ...payments[PERFECT_MONEY],
            number: values[PERFECT_MONEY],
          },
          [ETHEREUM]: {
            ...payments[ETHEREUM],
            number: values[ETHEREUM],
          },
          [SOLANA]: {
            ...payments[SOLANA],
            number: values[SOLANA],
          },
          [POLKADOT]: {
            ...payments[POLKADOT],
            number: values[POLKADOT],
          },
          [TRC20_TETHER]: {
            ...payments[TRC20_TETHER],
            number: values[TRC20_TETHER],
          },
        },
        // wallets: setWallets(values),
      });
    };

    sendData()
      .then(() => {
        success();
      })
      .catch((e) => {
        error(e);
      });
    console.log("Received values of form: ", values);
  };

  if (!userData) return;

  return (
    <div className={`${styles["settings-page"]} settingsRoot`}>
      <h2 className={"my-account-title"}>Настройки</h2>
      <Form
        onFinish={onFinish}
        initialValues={{
          nickname: userData.nickname,
          email: userData.email,
          phone: userData.phoneNumber,
          [PERFECT_MONEY]: userData.paymentMethods[PERFECT_MONEY]?.number,
          [TRC20_TETHER]: userData.paymentMethods[TRC20_TETHER]?.number,
          [BITCOIN]: userData.paymentMethods[BITCOIN]?.number,
          [ETHEREUM]: userData.paymentMethods[ETHEREUM]?.number,
          [SOLANA]: userData.paymentMethods[SOLANA]?.number,
          [POLKADOT]: userData.paymentMethods[POLKADOT]?.number,
          [BNB]: userData.paymentMethods[BNB]?.number,
        }}
        className={styles["form"]}
      >
        <img src={ChooseAvatarImage} alt={"user-avatar"} className={styles["user-avatar"]} />
        <div className={styles["personal-info-wrapper"]}>
          <h3>Личная информация</h3>
          <Form.Item name="nickname" label={"Никнейм"}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label={"Email"}>
            <Input type={"email"} />
          </Form.Item>
          <Form.Item name="phone" label={"Номер телефона"}>
            <Input type={"phone"} />
          </Form.Item>
          <Form.Item name="password" label={"Пароль"}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="confirm-password" label={"Подтвердить пароль"}>
            <Input.Password />
          </Form.Item>
        </div>
        <div className={styles["wallets-wrapper"]}>
          <h3 className={styles["wallets-title"]}>Кошельки</h3>
          <Form.Item label={"Perfect Money"} name={PERFECT_MONEY}>
            <Input placeholder={"U123456789"} />
          </Form.Item>
          <Form.Item label={"Bitcoin"} name={BITCOIN}>
            <Input placeholder={"3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5"} />
          </Form.Item>
          <Form.Item label={"Ethereum"} name={ETHEREUM}>
            <Input placeholder={"0x71C7656EC7ab88b098defB751B7401B5f6d8976F"} />
          </Form.Item>
          <Form.Item label={"TRC20 Tether"} name={TRC20_TETHER}>
            <Input placeholder={"T9zG21"} />
          </Form.Item>
          <Form.Item label={"Solana"} name={SOLANA}>
            <Input placeholder={"fGF4cGJB2eh5mSd1sKBBrZmx6ER1awjwL4gMsp1SjZg"} />
          </Form.Item>
          <Form.Item label={"PolkaDot"} name={POLKADOT}>
            <Input placeholder={"12qKuqNfo6JZxi7v1VYriyVRc631QD2DanU8gyf2LuTwYzYD"} />
          </Form.Item>
          <Form.Item label={"BNB Smart Chain"} name={BNB}>
            <Input placeholder={"0xeb24cdB1DFd1f6a7B709D68FF31680388C970b21"} />
          </Form.Item>
        </div>
        <Button type="primary" htmlType="submit" className={styles["submit-settings"]}>
          Сохранить
        </Button>
      </Form>
      <>{contextHolder}</>
    </div>
  );
};

export { Settings };
