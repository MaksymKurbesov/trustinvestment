import styles from "./Contact-Us.module.css";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");
  const { t, i18n } = useTranslation();

  return (
    <section className={`${styles["contact-us"]} contact-usRoot`}>
      <div className={`${styles["contact-us-container"]} container`}>
        <div data-aos="fade-right" className={`${styles["title"]}`}>
          <h2 className={`${styles["contact-us-title"]} section-title`}>{t("fill_form.title")}</h2>
          <p>{t("fill_form.subtitle")}</p>
        </div>
        <Form layout={formLayout} form={form} data-aos="fade-left">
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
            </Col>
          </Row>

          <Row>
            <Col span={24} xs={{ span: 24 }} xl={{ span: 18 }} lg={{ span: 18 }} md={{ span: 22 }}>
              <Form.Item
                label={t("fill_form.telegram_nickname")}
                name="telegram-nickname"
                rules={[
                  {
                    required: true,
                    message: t("fill_form.enter_telegram_nickname_error"),
                  },
                ]}
              >
                <Input placeholder={t("fill_form.enter_telegram_nickname")} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} xs={{ span: 24 }} xl={{ span: 18 }} lg={{ span: 18 }} md={{ span: 22 }}>
              <Form.Item className={styles["phone-number"]} label={t("fill_form.phone_number")} name={"phone"}>
                <Input placeholder={t("fill_form.enter_phone_number")} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary">{t("fill_form.Send")}</Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export { ContactUs };
