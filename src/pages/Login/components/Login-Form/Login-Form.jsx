import Button from "antd/lib/button";
import Checkbox from "antd/lib/checkbox";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./Login-Form.module.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const LoginForm = ({ handleClick, resetPassword }) => {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  const onFinish = ({ email, password }) => {
    handleClick(email, password);
  };

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const [activeClass, setActiveClass] = useState("");

  return (
    <Form
      name="normal_login"
      className={styles["login-form"]}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: t("registration.email_warning"),
          },
        ]}
      >
        <Input prefix={<UserOutlined className={styles["site-form-item-icon"]} />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: t("registration.password_warning"),
          },
        ]}
        className={styles["password"]}
      >
        <Input
          prefix={<LockOutlined className={styles["site-form-item-icon"]} />}
          type="password"
          placeholder={t("registration.password")}
        />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>{t("sign_in.remember_me")}</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button onClick={() => setActiveClass("active")} className={styles["reset-password-button"]}>
          {t("sign_in.forgot_password")}
        </Button>
        <div className={`${styles[`reset-password-wrapper`]} ${styles[activeClass]}`}>
          <Input
            placeholder={t("sign_in.enter_email")}
            className={styles["reset-password-input"]}
            value={email}
            onChange={onChange}
          />
          <Button onClick={() => resetPassword(email)} className={`${styles[`send-button`]} ${styles[activeClass]}`}>
            {t("sign_in.send")}
          </Button>
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
          {t("sign_in.sign_in_button")}
        </Button>
      </Form.Item>
    </Form>
  );
};
export { LoginForm };
