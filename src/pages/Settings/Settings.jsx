import styles from "./Settings.module.css";
import { Button, Form, Input, Space, message } from "antd";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { useNavigate } from "react-router-dom";
import {
  BITCOIN,
  ETHEREUM,
  PERFECT_MONEY,
  QIWI,
  TRC20_TETHER,
  YOO_MONEY,
} from "../../utils/consts";

const Settings = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { firestore } = useContext(FirebaseContext);
  const auth = getAuth();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await getDoc(doc(firestore, "users", user.email));
        setCurrentUser(snapshot.data());
      }
    });
  }, []);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Данные успешно обновлены",
    });
  };

  const error = (e) => {
    messageApi.open({
      type: "error",
      content: e,
    });
  };

  const onFinish = (values) => {
    const sendData = async () => {
      await updateDoc(doc(firestore, "users", currentUser.email), {
        email: values.email,
        phoneNumber: values.phone,
        nickname: values.nickname,
        wallets: {
          [PERFECT_MONEY]: values[PERFECT_MONEY] ? values[PERFECT_MONEY] : "",
          [TRC20_TETHER]: values[TRC20_TETHER] ? values[TRC20_TETHER] : "",
          [BITCOIN]: values[BITCOIN] ? values[BITCOIN] : "",
          [QIWI]: values[QIWI] ? values[QIWI] : "",
          [ETHEREUM]: values[ETHEREUM] ? values[ETHEREUM] : "",
          [YOO_MONEY]: values[YOO_MONEY] ? values[YOO_MONEY] : "",
        },
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

  if (!currentUser) return;

  return (
    <div className={`${styles["settings-page"]} settingsRoot`}>
      <h2 className={"my-account-title"}>Настройки</h2>
      <Form
        onFinish={onFinish}
        initialValues={{
          nickname: currentUser.nickname,
          email: currentUser.email,
          phone: currentUser.phoneNumber,
          [PERFECT_MONEY]: currentUser.wallets[PERFECT_MONEY]
            ? currentUser.wallets[PERFECT_MONEY]
            : "",
          [TRC20_TETHER]: currentUser.wallets[TRC20_TETHER]
            ? currentUser.wallets[TRC20_TETHER]
            : "",
          [BITCOIN]: currentUser.wallets[BITCOIN]
            ? currentUser.wallets[BITCOIN]
            : "",
          [QIWI]: currentUser.wallets[QIWI] ? currentUser.wallets[QIWI] : "",
          [ETHEREUM]: currentUser.wallets[ETHEREUM]
            ? currentUser.wallets[ETHEREUM]
            : "",
          [YOO_MONEY]: currentUser.wallets[YOO_MONEY]
            ? currentUser.wallets[YOO_MONEY]
            : "",
        }}
      >
        <h3>Личная информация</h3>
        <Form.Item>
          <div className={styles["avatar"]}></div>
          {/*<img src={""} alt={"user-avatar"} />*/}
        </Form.Item>
        <Form.Item name="nickname" label={"Никнейм"}>
          <Input type={"text"} />
        </Form.Item>
        <Form.Item name="email" label={"Email"}>
          <Input type={"email"} />
        </Form.Item>
        <Form.Item name="phone" label={"Номер телефона"}>
          <Input type={"phone"} />
        </Form.Item>
        <Form.Item label={"Пароль"} name="password">
          <Input type={"password"} />
        </Form.Item>
        <Form.Item
          label={"Подтвердить пароль"}
          rules={[
            {
              required: true,
              message: "Пожалуйста подтвердите пароль!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <h3 className={styles["wallets-title"]}>Кошелки</h3>

        <Form.Item name={PERFECT_MONEY} label={"Perfect Money"}>
          <Input placeholder={"U123456789"} />
        </Form.Item>
        <Form.Item label={"Bitcoin"} name={"Bitcoin"}>
          <Input placeholder={"3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5"} />
        </Form.Item>
        <Form.Item label={"Ethereum"} name={"Ethereum"}>
          <Input placeholder={"0x71C7656EC7ab88b098defB751B7401B5f6d8976F"} />
        </Form.Item>
        <Form.Item label={"TRC20 Tether"} name={"TRC20 Tether"}>
          <Input placeholder={"T9zG21"} />
        </Form.Item>
        <Form.Item label={"Qiwi"} name={"Qiwi"}>
          <Input placeholder={"+79991234567"} />
        </Form.Item>
        <Form.Item label={"Yoo Money"} name={"Yoo Money"}>
          <Input placeholder={"4100175017397"} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form>
      <>{contextHolder}</>
    </div>
  );
};

export { Settings };
