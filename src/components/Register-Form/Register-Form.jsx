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
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    form.resetFields();
    handleClick(values);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
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
          <Checkbox className={styles["agree-link"]}>
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
          <Button type="primary" htmlType="submit">
            {t("registration.title")}
          </Button>
        </Form.Item>
      </Form>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        footer={[
          <Button key="ok" onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        <p className={styles["policy"]}>
          <b>Privacy Policy</b> <span>TRUST INVESTMENT WEBSITE COOKIE AND PRIVACY POLICY</span> This cookie policy
          applies to the www.dubaitrustinvestment.net website. By continuing to browse the www.dubaitrustinvestment.net
          website, you are consenting to our use of cookies in accordance with this cookie policy. If you do not agree
          to our use of cookies in this way, you should set your browser settings accordingly or not use the
          www.dubaitrustinvestment.net website. If you disable the cookies that we use, this may impact your user
          experience while on the www.azizidevelopments.com website. <span>WHAT ARE COOKIES?</span> A cookie is a small
          file of data-letters and numbers we store on your browser or your computer or other internet enabled mobile
          device such as a smartphone or tablet. A cookie will usually contain the name of the website from which the
          cookie has come, the “lifetime” of the cookie (i.e. how long it will remain on your device) and a value, which
          is usually a randomly generated unique number. <span>WHAT DO WE USE COOKIES FOR?</span> Cookies allow the
          website to “remember” your actions or preferences over time, such as your preferred language and other
          settings. Our website uses cookies to distinguish you from other users of our website. This helps us to
          provide you with a good experience when you browse our website and also allows us to improve our site. Cookies
          may also be used to help speed up your future activities and experience on the www.dubaitrustinvestment.net
          website. We also use cookies to compile anonymous, aggregated statistics that allow us to understand how
          people use the www.dubaitrustinvestment.net website and to help us improve its structure and content. We
          cannot identify you personally from this information. Cookies play an important role. Without them, using the
          web would be a much more frustrating experience. <span>WHAT TYPES OF COOKIES DO WE USE?</span>{" "}
          www.dubaitrustinvestment.net uses session cookies which are temporary cookies that remain on your device until
          you leave the www.dubaitrustinvestment.net website. The cookies we use are “analytical” cookies which allow us
          to recognize and count the number of visitors and to see how visitors move around the site when they are using
          it. This helps us to improve the way our website works, for example by ensuring that users are finding what
          they are looking for easily. Overall, cookies help us provide the user with a better website. A cookie does
          not give us access to the user’s computer or any information about him/her, other than the data he/she chooses
          to share with us. Read more about the individual cookies we use, the purposes for which we use them and how to
          recognise them by clicking here or referring to the table below. Please note that third parties (including,
          for example, advertising networks and providers of external services like web traffic analysis services) may
          also use cookies, over which we have no control. These cookies are likely to be analytical/performance cookies
          or targeting cookies. <span>DO WE USE THIRD PARTY COOKIES?</span> There are links to a number of social media
          websites on the www.dubaitrustinvestment.net website. These third parties may also set cookies on your device
          on our behalf when you visit the www.dubaitrustinvestment.net website to allow them to deliver the services
          they are providing. We don’t control the setting of these cookies, so please check those website for more
          information about their cookies and how to manage them. When you visit the www.dubaitrustinvestment.net
          website you may receive cookies from third party websites or domains. We endeavor to identify these cookies
          before they are used so that you can decide whether or not you wish to accept them. More information about
          these cookies may be available on the relevant third party’s website.{" "}
          <span>HOW CAN I CONTROL OR DELETE COOKIES?</span> You can choose to accept or decline cookies. Accepting
          cookies is usually the best way to make sure you get the most from a website. Some people prefer not to allow
          cookies, which is why most browsers give you the ability to manage cookies to suit you. Most browsers
          automatically accept cookies, but users can set up rules in their browsers to restrict, block or delete
          cookies on a site-by-site basis, giving you more fine-grained control over your privacy. What this means is
          that you can disallow cookies from all sites expect those you trust. However, this may prevent the user from
          taking full advantage of our website. You can also delete cookies from your computer or device whenever you
          like. Each browser is different, so check the “Help” menu of your particular browser (or your smartphone or
          tablet’s manual) to learn how to change your cookie preferences. Many browsers have universal privacy settings
          for you to choose from. <span>WHAT HAPPENS IF I DELETE MY COOKIES?</span> If you delete all your cookies, some
          aspects of our site may not work. <span>HOW DO COOKIES AFFECT MY PRIVACY?</span> You can visit our website
          without revealing any personal information.{" "}
          <span>INFORMATION WE COLLECT ABOUT YOU AND HOW WE COLLECT IT</span> We collect several types of information
          from and about users of our Website, including information: <span>INFORMATION COLLECTION AND USE</span> We
          will not sell, trade or disclose to any third party other than an entity in Trust Investment (in this privacy
          policy, ‘we’, ‘us’ and ‘our’ means Trust Investment Company) any information derived from the use of any
          online service without the consent of the user (except as required by law or in the case of imminent physical
          harm to the user or others). When we use third parties to perform services on our behalf, we will ensure that
          such third parties protect the user’s personal information in a manner which is consistent with this
          statement. <span>SECURITY</span> We will take appropriate steps to protect the personal information you share
          with us. We have implemented technology and security features to safeguard the privacy of your personal
          information. <span>LINKS</span> Our website may contain links to other websites as well as information
          provided by third parties. Please be aware that we are not responsible for the privacy practices of, or the
          information contained on or sourced from, websites not operated by any company within Trust Investment . We
          encourage our users to read the privacy statements of each website that collects personally identifiable
          information. This privacy statement applies solely to information collected by our website.{" "}
          <span>CORRECTION/UPDATING OF PERSONAL INFORMATION</span> If a user’s personally identifiable information
          changes, we will provide a way to correct, update or remove that user’s personal information provided to us.{" "}
          <span>CHOICE/OPT-OUT</span> Users who no longer wish to receive promotional materials may opt-out of receiving
          these communications by sending a mail to info@www.azizidevelopments.com with “Unsubscribe” in the subject
          line. Users of our website will always be notified when their information is being collected by any outside
          parties. We do this so our users can make an informed choice as to whether they should proceed with services
          that require an outside party or not.
          <span>NOTIFICATION OF CHANGES</span> If we decide to change our privacy policy, we will post those changes on
          the www.dubaitrustinvestment.net website so our users are always aware of what information we collect, how we
          use it, and under what circumstances, if any, we disclose it. If at any point we decide to use personally
          identifiable information in a manner different from that stated at the time it was collected, we will notify
          users by way of an email. Users will have a choice as to whether or not we use their information in this
          different manner. We will use information in accordance with the privacy policy under which the information
          was collected.
        </p>
      </Modal>
    </>
  );
};
export { RegisterForm };
