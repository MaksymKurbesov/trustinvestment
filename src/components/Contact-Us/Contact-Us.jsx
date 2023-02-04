import styles from "./Contact-Us.module.css";
import { Button, Form, Input, Row, Col } from "antd";
import { useState } from "react";

const ContactUs = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");

  return (
    <section className={`${styles["contact-us"]} contact-usRoot`}>
      <div className={`${styles["contact-us-container"]} container`}>
        <div data-aos="fade-right" className={`${styles["title"]}`}>
          <h2 className={"section-title"}>Заполните форму</h2>
          <p>Хотите попасть в чат инвесторов? Введите данные.</p>
        </div>
        <Form layout={formLayout} form={form} data-aos="fade-left">
          <Row>
            <Col
              span={24}
              xs={{ span: 24 }}
              xl={{ span: 18 }}
              lg={{ span: 18 }}
              md={{ span: 22 }}
            >
              <Form.Item
                label="Имя"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста введите ваш номер телефона",
                  },
                ]}
              >
                <Input placeholder="Введите ваше имя" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col
              span={24}
              xs={{ span: 24 }}
              xl={{ span: 18 }}
              lg={{ span: 18 }}
              md={{ span: 22 }}
            >
              <Form.Item
                label="Телеграм никнейм"
                name="telegram-nickname"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста введите ваш телеграм аккаунт",
                  },
                ]}
              >
                <Input placeholder="Введите ваш никнейм в телеграм" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              span={24}
              xs={{ span: 24 }}
              xl={{ span: 18 }}
              lg={{ span: 18 }}
              md={{ span: 22 }}
            >
              <Form.Item label="Номер телефона" name={"phone"}>
                <Input placeholder="Введите номер телефона" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary">Отправить</Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export { ContactUs };
