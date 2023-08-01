import React from "react";
import styles from "./Withdraw.module.css";
import Form from "antd/lib/form";
import Input from "antd/lib/input";

const PrivateKeyNotification = () => {
  return (
    <div className={styles["private-key-wrapper"]}>
      <p>
        <span>Важно:</span> Вы собираетесь ввести ваш приватный финансовый ключ. Этот ключ представляет собой уникальную
        комбинацию символов, которая предоставляет вам доступ к вашим личным финансовым данным.
      </p>
      <p>
        Будьте осторожны при использовании вашего приватного ключа. Не раскрывайте его третьим лицам, не сохраняйте на
        общедоступных или незащищенных устройствах. В случае его утери или кражи, ваши финансовые средства могут быть
        поставлены под угрозу.
      </p>
      <p>
        Пожалуйста, убедитесь, что вы находитесь в безопасном и приватном окружении перед тем, как ввести свой приватный
        ключ. Если вы не уверены, что ваше окружение безопасно, отложите этот процесс на более подходящее время.
      </p>
      <p>
        Вводите ваш ключ только если вы абсолютно уверены в своих действиях. Помните, что ответственность за сохранность
        вашего приватного ключа лежит на вас.
      </p>
      <p>Пожалуйста, введите ваш приватный финансовый ключ в поле ниже:</p>
      <Form.Item
        name={"private-key"}
        rules={[
          {
            required: true,
            message: "Требуется приватный финансовый ключ",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </div>
  );
};

export default PrivateKeyNotification;
