import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./Login-Form.module.css";
import { useState } from "react";

const LoginForm = ({ handleClick, resetPassword }) => {
  const [email, setEmail] = useState("");

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
            message: "Введите ваш email адрес!",
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
            message: "Введите ваш пароль!",
          },
        ]}
        className={styles["password"]}
      >
        <Input
          prefix={<LockOutlined className={styles["site-form-item-icon"]} />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Запомнить меня</Checkbox>
      </Form.Item>
      <Form.Item>
        <button onClick={() => setActiveClass("active")} className={styles["reset-password-button"]} href="">
          Забыл пароль
        </button>
        <div className={`${styles[`reset-password-wrapper`]} ${styles[activeClass]}`}>
          <Input className={styles["reset-password-input"]} value={email} onChange={onChange} />
          <Button onClick={() => resetPassword(email)} className={`${styles[`send-button`]} ${styles[activeClass]}`}>
            Отправить
          </Button>
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
export { LoginForm };
