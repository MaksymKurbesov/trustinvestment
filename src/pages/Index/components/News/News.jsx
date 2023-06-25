import React, { useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import styles from "./News.module.css";
import "./News.css";

const News = () => {
  const [open, setOpen] = useState(true);
  const [placement, setPlacement] = useState("top");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  return (
    <Drawer
      height={270}
      title="Уведомление о переезде домена"
      placement={placement}
      closable={false}
      onClose={onClose}
      open={open}
      key={placement}
      rootClassName={styles["drawer"]}
      bodyStyle={{
        backgroundColor: "rgb(22,119,255)",
        color: "white",
      }}
    >
      <div>
        <p>
          Мы рады поделиться важной новостью с нашими клиентами и партнерами. С целью обеспечения еще большей
          доступности и удобства для пользователей со всех регионов, наша инвестиционная компания провела ряд изменений
          в своей веб-инфраструктуре.
        </p>
        <p>
          В первую очередь, мы сменили домен нашего сайта. Это решение было принято с учетом желания сделать нашу
          платформу доступной для инвесторов из разных уголков мира. Мы стремимся создать пространство, которое легко и
          удобно использовать, независимо от вашего местоположения.
        </p>

        <p>
          Наша команда постоянно работает над улучшением нашего сервиса, чтобы он соответствовал самым высоким
          стандартам и потребностям наших клиентов. Мы уверены, что новый домен поможет нам сделать ваш опыт
          взаимодействия с нашей компанией еще более положительным и эффективным.
        </p>

        <p>
          Благодарим вас за доверие и поддержку, и мы обязательно продолжим стремиться к лучшему, чтобы обеспечить вам
          непревзойденный сервис.
        </p>
      </div>
    </Drawer>
  );
};

export default News;
