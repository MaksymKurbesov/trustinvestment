import styles from "./Contacts.module.css";
import { Button, Checkbox, Form, Input } from "antd";
import Map from "assets/images/map.png";
import TextArea from "antd/es/input/TextArea";

import MapMarkIcon from "assets/images/contact-icons/location.png";
import EmailIcon from "assets/images/contact-icons/mail.png";
import PhoneIcon from "assets/images/contact-icons/phone.png";
import TelegramIcon from "assets/images/contact-icons/telegram.png";
import YoutubeIcon from "assets/images/contact-icons/youtube.png";
import ContactsDecorateImage from "assets/images/contacts-page-decorate.svg";
import { NavLink } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import CompanyImage1 from "assets/images/company-photos/company-photo1.png";
import CompanyImage2 from "assets/images/company-photos/company-photo2.png";
import CompanyImage3 from "assets/images/company-photos/company-photo3.png";
import CompanyImage4 from "assets/images/company-photos/company-photo4.png";

const Contacts = () => {
  const position = [25.0995, 55.17724];

  return (
    <div className={styles["contacts"]}>
      <div className={styles["left-row"]}>
        <h2>Связаться с нами</h2>
        <div className={styles["content-wrapper"]}>
          <div className={styles["form-wrapper"]}>
            <div className={styles["form-information"]}>
              <p>
                <span>Форма обратной связи</span>
                Мы искренне благодарны вам за вопросы, отзывы и предложения. Ваше сообщение будет направлено в отдел по
                работе с клиентами, и мы обязательно ответим вам в самое ближайшее время.
              </p>
              <div className={styles["decorate-image-container"]}>
                <img src={ContactsDecorateImage} width={"100%"} />
              </div>
            </div>

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
              <Button htmlType={"submit"} type={"primary"} className={styles["submit-button"]}>
                Отправить
              </Button>
              <Checkbox>
                Я ознакомлен с политикой конфиденциальности и даю согласие на обработку моих персональных данных
              </Checkbox>
            </Form>
          </div>
          <div className={styles["company-photos"]}>
            <ul className={styles["company-photos-list"]}>
              <li>
                <img src={CompanyImage1} width={"60%"} />
              </li>
              <li>
                <img src={CompanyImage4} width={"80%"} />
              </li>
              <li>
                <img src={CompanyImage3} width={"80%"} />
              </li>
              {/*<li>*/}
              {/*  <img src={CompanyImage2} width={450} />*/}
              {/*</li>*/}
            </ul>
          </div>
          {/*<div className={styles["where-are-we"]}>*/}
          {/*<h3>*/}
          {/*  <img src={MapMarkIcon} width={30} />*/}
          {/*  Где мы находимся*/}
          {/*</h3>*/}
          {/*<p>Объединенные Арабские Эмираты</p>*/}
          {/*<p>*/}
          {/*  Tameem house Office 701 <br /> Al Barsha Heights <br /> Dubai*/}
          {/*</p>*/}
          {/*<div className={styles["map-container"]}>*/}
          {/*  <MapContainer className={styles["map"]} center={position} zoom={13} scrollWheelZoom={false}>*/}
          {/*    <TileLayer*/}
          {/*      attribution='&copy; <a href="https://api.stadiamaps.com/tz/lookup/v1/?api_key=31322722-52a9-49bf-bec1-efea16ee1048">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'*/}
          {/*      url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"*/}
          {/*    />*/}

          {/*    <Marker position={position}>*/}
          {/*      <Popup>Мы находимся здесь :)</Popup>*/}
          {/*    </Marker>*/}
          {/*  </MapContainer>*/}
          {/*</div>*/}

          {/*<div className={styles["map"]}>*/}
          {/*  <img src={Map} alt={"Наше месторасположение на карте"} width={"100%"} />*/}
          {/*</div>*/}
          {/*</div>*/}
        </div>
      </div>
      <div className={styles["right-row"]}>
        <div className={styles["social-links"]}>
          <div className={styles["address"]}>
            <div className={styles["address-title"]}>
              <img src={MapMarkIcon} width={40} />
              <h3>Наш адрес</h3>
            </div>
            {/*<img src={MapMarkIcon} width={40} />*/}
            <p>Объединенные Арабские Эмираты</p>
            <p>
              Tameem house Office 701 <br /> Al Barsha Heights <br /> Dubai
            </p>
          </div>
        </div>
        <div className={styles["time-work"]}>
          <div>
            <h3>Часы работы</h3>
            <p>Понедельник-Пятница</p>
            <p>10:00 - 18:00</p>
          </div>
          <div>
            <h3>Выходные</h3>
            <p>Суббота-Воскресенье</p>
          </div>
        </div>
        <div className={styles["contacts-list"]}>
          <h3>Контакты</h3>
          <a href={"mailto:support@dubaitrustinvestment.net"}>
            <img src={EmailIcon} width={40} />
          </a>

          <a href={"tel:+9714327496"}>
            <img src={PhoneIcon} width={40} />
          </a>

          <a href={"https://t.me/TrustInvestmentSupport"}>
            <img src={TelegramIcon} width={40} />
          </a>

          <a href={"https://www.youtube.com/@trust_investment"}>
            <img src={YoutubeIcon} width={40} />
          </a>
        </div>
      </div>
    </div>
  );
};

export { Contacts };
