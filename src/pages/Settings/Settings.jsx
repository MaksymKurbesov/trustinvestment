import styles from "./Settings.module.css";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import message from "antd/lib/message";
import Upload from "antd/lib/upload";
import { useContext, useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { BITCOIN, BNB, ETHEREUM, PERFECT_MONEY, POLKADOT, QIWI, SOLANA, TRC20_TETHER } from "../../utils/consts";
import ChooseAvatarImage from "assets/images/add-avatar2.png";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getAuth, updateProfile, updatePassword } from "firebase/auth";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { firestore } = useContext(FirebaseContext);
  const [messageApi, contextHolder] = message.useMessage();
  const { userData } = useOutletContext();
  const auth = getAuth();
  const storage = getStorage();
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
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
      content: t("settings.updated"),
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
        const password = form.getFieldValue("password");
        const confirm_password = form.getFieldValue("confirm-password");

        if (password === confirm_password && password) {
          updatePassword(auth.currentUser, form.getFieldValue("password")).then(() => {
            form.resetFields();
          });
        }
        success();
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
        message.success(`${info.file.name} ${t("settings.file_loaded")}`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} ${t("settings.file_error")}`);
      }
    },
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    customRequest({ file, onSuccess }) {
      onSuccess();
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
      <h2 className={"my-account-title"}>{t("settings.title")}</h2>
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
              `${t("settings.loading")}`
            )}
            <Form.Item name="avatar" className={styles["upload-button"]} valuePropName={"file"}>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>{t("settings.upload")}</Button>
              </Upload>
            </Form.Item>
          </div>

          <div className={styles["personal-information"]}>
            <h3>{t("settings.personal_info")}</h3>
            <Form.Item name="nickname" label={t("settings.nickname")}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label={"Email"}>
              <Input type={"email"} />
            </Form.Item>
            <Form.Item name="phone" label={t("settings.phone_number")}>
              <Input type={"phone"} />
            </Form.Item>
            <Form.Item name="old_password" label={t("settings.old_password")}>
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="password"
              label={t("settings.password")}
              rules={[
                {
                  min: 6,
                  message: t("registration.password_length_warning"),
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm-password"
              label={t("settings.confirm_password")}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t("registration.password_mismatch")));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>
        </div>
        <div className={styles["wallets-wrapper"]}>
          <h3 className={styles["wallets-title"]}>{t("settings.wallets")}</h3>
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
          {t("settings.save")}
        </Button>
      </Form>
      <>{contextHolder}</>
    </div>
  );
};

export { Settings };
