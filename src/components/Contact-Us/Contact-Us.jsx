import styles from "./Contact-Us.module.css";
import { Button, Form, Input, Row, Col } from "antd";
import { useState } from "react";

const ContactUs = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");

  return (
    <section className={`${styles["contact-us"]} contact-usRoot`}>
      <div className={`${styles["contact-us-container"]} container`}>
        <div className={`${styles["title"]}`}>
          <h2 className={"section-title"}>Заполните форму</h2>
          <p>Хотите попасть в чат инвесторов? Введите данные.</p>
        </div>
        <Form layout={formLayout} form={form}>
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
              <Form.Item label="Фамилия">
                <Input placeholder="Введите вашу фамилию" />
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
                label="Номер телефона"
                name={"phone"}
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста введите ваш номер телефона",
                  },
                ]}
              >
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
