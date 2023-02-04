import styles from "./Contacts.module.css";
import { Button, Checkbox, Form, Input } from "antd";
import Map from "assets/images/map.png";
import TextArea from "antd/es/input/TextArea";
import MapMarkIcon from "assets/images/Map_marker.svg";

const Contacts = () => {
  return (
    <div className={styles["contacts"]}>
      <div className={styles["left-row"]}>
        <h2>Связаться с нами</h2>
        <div className={styles["content-wrapper"]}>
          <p className={styles["form-information"]}>
            <span>Форма обратной связи</span>
            Мы искренне благодарны вам за вопросы, отзывы и предложения. Ваше
            сообщение будет направлено в отдел по работе с клиентами, и мы
            обязательно ответим вам в самое ближайшее время.
          </p>
          <Form className={styles["contact-form"]}>
            <Form.Item label={"Имя"} labelCol={{ span: 24 }}>
              <Input />
            </Form.Item>
            <Form.Item label={"Email"} labelCol={{ span: 24 }}>
              <Input />
            </Form.Item>
            <Form.Item label={"Телефон"} labelCol={{ span: 24 }}>
              <Input />
            </Form.Item>
            <Form.Item label={"Сообщение"} labelCol={{ span: 24 }}>
              <TextArea />
            </Form.Item>
            <Button
              htmlType={"submit"}
              type={"primary"}
              className={styles["submit-button"]}
            >
              Отправить
            </Button>
            <Checkbox>
              Я ознакомлен с политикой конфиденциальности и даю согласие на
              обработку моих персональных данных
            </Checkbox>
          </Form>
          <div className={styles["where-are-we"]}>
            <h3>
              <img src={MapMarkIcon} width={30} />
              Где мы находимся
            </h3>
            <p>Объединенные Арабские Эмираты</p>
            <p>
              Tameem house Office 701 <br /> Al Barsha Heights <br /> Dubai
            </p>
          </div>
          <div className={"map"}>
            <img
              src={Map}
              alt={"Наше месторасположение на карте"}
              width={"100%"}
            />
          </div>
        </div>
      </div>
      <div className={styles["right-row"]}>
        <div>
          <h3>Контакты</h3>
          <p>
            <a href="mailto: support@dubaitrustinvestment.net">
              support@dubaitrustinvestment.net
            </a>
          </p>
          <p>+33123456789</p>
        </div>
        <div>
          <h3>Часы работы</h3>
          <p>Без выходных</p>
          <p>09:00 - 22:00</p>
        </div>
        <div>
          <h3>Мы в мессенджерах</h3>
          <p>Telegram</p>
          <p>Viber</p>
          <p>WhatsApp</p>
        </div>
      </div>
    </div>
  );
};

export { Contacts };
