import Button from "antd/lib/button";
import Checkbox from "antd/lib/checkbox";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./Register-Form.module.css";
import { Trans, useTranslation } from "react-i18next";
import Modal from "antd/lib/modal";
import { useState } from "react";
import { Agreement } from "components/Agreement/Agreement";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterForm = ({ handleClick }) => {
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    setLoading(true);
    handleClick(values)
      .then(() => {
        form.resetFields();
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="7">+7</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Form
        {...formItemLayout}
        initialValues={{
          prefix: "7",
          referredBy: searchParams.get("ref"),
        }}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        className={"registerFormRoot"}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: t("registration.email_error"),
            },
            {
              required: true,
              message: t("registration.email_warning"),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label={t("registration.password")}
          rules={[
            {
              required: true,
              message: t("registration.password_warning"),
            },
            {
              min: 6,
              message: t("registration.password_length_warning"),
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label={t("registration.confirm_password")}
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: t("registration.confirm_password_warning"),
              // validateTrigger: "onBlur",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t("registration.password_mismatch")));
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="nickname"
          label={t("registration.nickname")}
          tooltip={t("registration.nickname_tooltip")}
          rules={[
            {
              required: true,
              message: t("registration.nickname_warning"),
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label={t("registration.phone_number")}
          rules={[
            {
              required: true,
              message: t("registration.phone_number_warning"),
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item name="referredBy" label={t("registration.nickname_referral")}>
          <Input />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error(t("registration.agree_warning"))),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox className={styles["rules"]}>
            <Trans
              i18nKey="registration.agree"
              components={{
                link: (
                  <Link className={styles["agreement-link"]} to="/#">
                    link
                  </Link>
                ),
                button: <Button onClick={showModal} />,
              }}
            ></Trans>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" disabled={loading}>
            {t("registration.title")}
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Условия использования"
        open={isModalOpen}
        footer={<Button onClick={handleOk}>OK</Button>}
        closable={false}
      >
        <Agreement />
      </Modal>
    </>
  );
};
export { RegisterForm };
