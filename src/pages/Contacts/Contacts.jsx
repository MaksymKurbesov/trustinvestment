import styles from "./Contacts.module.css";
import Button from "antd/lib/button";
import Checkbox from "antd/lib/checkbox";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import TextArea from "antd/es/input/TextArea";

import MapMarkIcon from "assets/images/contact-icons/location.png";
import EmailIcon from "assets/images/contact-icons/mail.png";
import PhoneIcon from "assets/images/contact-icons/phone.png";
import TelegramIcon from "assets/images/contact-icons/telegram.png";
import YoutubeIcon from "assets/images/contact-icons/youtube.png";
import ContactsDecorateImage from "assets/images/contacts-page-decorate.svg";

import CompanyImage1 from "assets/images/company-photos/company1.webp";
import CompanyImage2 from "assets/images/company-photos/company2.webp";
import CompanyImage3 from "assets/images/company-photos/company3.webp";
import CompanyImage4 from "assets/images/company-photos/company4.webp";
import { useTranslation } from "react-i18next";
import { useForm } from "@formspree/react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";

const Contacts = () => {
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();
  const [state, handleSubmit] = useForm("moqoeklj");

  const onFinish = (e) => {
    console.log(e, "e");
    handleSubmit(e);
  };

  return (
    <div className={styles["contacts"]}>
      <div className={styles["left-row"]}>
        <h2 data-aos={"fade-up"}>{t("contact_us.title")}</h2>
        <div className={styles["content-wrapper"]}>
          <div className={styles["form-wrapper"]}>
            <div className={styles["form-information"]} data-aos={"fade-down"}>
              <p>
                <span>{t("contact_us.form_title")}</span>
                {t("contact_us.form_subtitle")}
              </p>
              <div className={styles["decorate-image-container"]}>
                <img src={ContactsDecorateImage} width={"100%"} />
              </div>
            </div>

            <Form layout={"vertical"} form={form} data-aos="fade-left" onFinish={onFinish}>
              <Row>
                <Col span={24} xs={{ span: 24 }} xl={{ span: 18 }} lg={{ span: 18 }} md={{ span: 22 }}>
                  <Form.Item
                    label={t("fill_form.name")}
                    name={"name"}
                    rules={[
                      {
                        required: true,
                        message: t("fill_form.enter_name_error"),
                      },
                    ]}
                  >
                    <Input placeholder={t("fill_form.enter_name")} />
                  </Form.Item>
                  <Form.Item
                    name="email-account"
                    label={"Email"}
                    labelCol={{ span: 24 }}
                    data-aos={"fade-right"}
                    data-aos-delay={300}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24} xs={{ span: 24 }} xl={{ span: 18 }} lg={{ span: 18 }} md={{ span: 22 }}></Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} xl={{ span: 18 }} lg={{ span: 18 }} md={{ span: 22 }}>
                  <Form.Item
                    name={"phone-number"}
                    label={t("fill_form.phone_number")}
                    labelCol={{ span: 24 }}
                    data-aos={"fade-right"}
                    data-aos-delay={400}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={t("fill_form.message")}
                    labelCol={{ span: 24 }}
                    data-aos={"fade-right"}
                    data-aos-delay={500}
                    name="message"
                  >
                    <TextArea />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  {t("fill_form.Send")}
                </Button>
              </Form.Item>
            </Form>

            {/*<Form form={form} className={styles["contact-form"]} onFinish={onFinish}>*/}
            {/*  <Form.Item*/}
            {/*    label={t("fill_form.name")}*/}
            {/*    labelCol={{ span: 24 }}*/}
            {/*    data-aos={"fade-left"}*/}
            {/*    data-aos-delay={200}*/}
            {/*  >*/}
            {/*    <Input />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item label={"Email"} labelCol={{ span: 24 }} data-aos={"fade-right"} data-aos-delay={300}>*/}
            {/*    <Input />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item*/}
            {/*    label={t("fill_form.phone_number")}*/}
            {/*    labelCol={{ span: 24 }}*/}
            {/*    data-aos={"fade-right"}*/}
            {/*    data-aos-delay={400}*/}
            {/*  >*/}
            {/*    <Input />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item*/}
            {/*    label={t("fill_form.message")}*/}
            {/*    labelCol={{ span: 24 }}*/}
            {/*    data-aos={"fade-right"}*/}
            {/*    data-aos-delay={500}*/}
            {/*  >*/}
            {/*    <TextArea />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item>*/}
            {/*    <Button*/}
            {/*      htmlType={"submit"}*/}
            {/*      type={"primary"}*/}
            {/*      className={styles["submit-button"]}*/}
            {/*      data-aos={"fade-right"}*/}
            {/*      data-aos-delay={600}*/}
            {/*    >*/}
            {/*      {t("fill_form.Send")}*/}
            {/*    </Button>*/}
            {/*  </Form.Item>*/}

            {/*  <Checkbox>{t("contact_us.policy")}</Checkbox>*/}
            {/*</Form>*/}
          </div>
          <div className={styles["company-photos"]}>
            <ul className={styles["company-photos-list"]}>
              <li>
                <img src={CompanyImage1} width={"100%"} />
              </li>
              <li>
                <img src={CompanyImage4} width={"100%"} />
              </li>
              <li>
                <img src={CompanyImage3} width={"100%"} />
              </li>
              <li>
                <img src={CompanyImage2} width={"100%"} />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles["right-row"]}>
        <div className={styles["social-links"]}>
          <div className={styles["address"]}>
            <div className={styles["address-title"]}>
              <img src={MapMarkIcon} width={40} />
              <h3> {t("contact_us.our_address")}</h3>
            </div>
            <p>{t("contact_us.UAE")}</p>
            <p>
              Tameem house Office 701 <br /> Al Barsha Heights <br /> Dubai
            </p>
          </div>
        </div>
        <div className={styles["time-work"]}>
          <div>
            <h3>{t("contact_us.opening_hours")}</h3>
            <p>{t("contact_us.work_days")}</p>
            <p>10:00 - 18:00</p>
          </div>
          <div>
            <h3>{t("contact_us.weekend")}</h3>
            <p>{t("contact_us.weekend_days")}</p>
          </div>
        </div>
        <div className={styles["contacts-list"]}>
          <h3>{t("contact_us.contacts")}</h3>
          <a href={"mailto:support@dubaitrustinvestment.com"}>
            <img src={EmailIcon} width={40} />
          </a>

          <a href={"tel:+9714327496"}>
            <img src={PhoneIcon} width={40} />
          </a>

          <a href={"https://t.me/DubaiTrustSupport"}>
            <img src={TelegramIcon} width={40} />
          </a>

          <a href={"https://youtube.com/@TrustInvestment"}>
            <img src={YoutubeIcon} width={40} />
          </a>
        </div>
      </div>
    </div>
  );
};

export { Contacts };
