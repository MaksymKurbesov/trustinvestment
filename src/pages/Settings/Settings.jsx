import styles from "./Settings.module.css";
import { Button, Form, Input, message, Upload } from "antd";
import { useContext, useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { BITCOIN, BNB, ETHEREUM, PERFECT_MONEY, POLKADOT, QIWI, SOLANA, TRC20_TETHER } from "../../utils/consts";
import ChooseAvatarImage from "assets/images/add-avatar2.png";
// import { storage } from "index.js";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable, put } from "firebase/storage";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { UploadOutlined } from "@ant-design/icons";
// import { useForm } from "antd/es/form/Form";

const Settings = () => {
  const { firestore } = useContext(FirebaseContext);
  const [messageApi, contextHolder] = message.useMessage();
  const { userData } = useOutletContext();
  const auth = getAuth();
  const storage = getStorage();
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const onResolve = (url) => {
      setAvatar(url);
      setLoading(false);
      return Promise.resolve(url);
    };

    const onReject = (e) => {
      setLoading(false);
      setAvatar(null);
      console.log(e);
    };

    getDownloadURL(ref(storage, `images/${userData.nickname}`))
      .then((url) => {
        setAvatar(url);
        setLoading(false);
        return Promise.resolve(url);
      })
      .catch((error) => {
        setLoading(false);
        setAvatar(null);
        console.log(error);
      });
  }, []);

  const success = () => {
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
    console.log(values, "values");

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
          [QIWI]: {
            ...payments[QIWI],
            number: values[QIWI],
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
      });
    };

    sendData()
      .then(() => {
        form.resetFields();
        success();
        window.location.reload(false);
      })
      .catch((e) => {
        error(e);
      });
  };

  const props = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} файл успешно загружен`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} ошибка загрузки файла.`);
      }
    },
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    customRequest({ file, onSuccess }) {
      onSuccess(() => console.log("work"));
      const imageRef = ref(storage, `images/${userData.nickname}`);
      uploadBytesResumable(imageRef, file).then(async (uploadResult) => {
        const photoURL = await getDownloadURL(uploadResult.ref);

        await updateProfile(auth.currentUser, { photoURL: photoURL });
      });
    },
  };

  if (loading) return;

  return (
    <div className={`${styles["settings-page"]} settingsRoot`}>
      <h2 className={"my-account-title"}>Настройки</h2>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          nickname: userData.nickname,
          email: userData.email,
          phone: userData.phoneNumber,
          avatar: auth.currentUser.photoURL,
          [PERFECT_MONEY]: userData.paymentMethods[PERFECT_MONEY]?.number,
          [QIWI]: userData.paymentMethods[QIWI]?.number,
          [TRC20_TETHER]: userData.paymentMethods[TRC20_TETHER]?.number,
          [BITCOIN]: userData.paymentMethods[BITCOIN]?.number,
          [ETHEREUM]: userData.paymentMethods[ETHEREUM]?.number,
          [SOLANA]: userData.paymentMethods[SOLANA]?.number,
          [POLKADOT]: userData.paymentMethods[POLKADOT]?.number,
          [BNB]: userData.paymentMethods[BNB]?.number,
        }}
        className={styles["form"]}
      >
        <div className={styles["personal-info-wrapper"]}>
          <div className={styles["avatar"]}>
            {!loading ? (
              <img
                src={avatar ? avatar : ChooseAvatarImage}
                alt={"user-avatar"}
                width={300}
                height={300}
                style={{ objectFit: "cover", marginBottom: 30 }}
              />
            ) : (
              "Загрузка..."
            )}
            <Form.Item name="avatar" className={styles["upload-button"]} valuePropName={"file"}>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Загрузить</Button>
              </Upload>
            </Form.Item>
          </div>

          <div className={styles["personal-information"]}>
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
        </div>
        <div className={styles["wallets-wrapper"]}>
          <h3 className={styles["wallets-title"]}>Кошельки</h3>
          <div className={styles["wallets"]}>
            <Form.Item label={"Perfect Money"} name={PERFECT_MONEY}>
              <Input placeholder={"U123456789"} />
            </Form.Item>
            <Form.Item label={"QIWI"} name={QIWI}>
              <Input placeholder={"2200730251373524"} />
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
