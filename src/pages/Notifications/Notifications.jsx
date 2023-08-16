import React, { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./Notifications.module.css";
import Button from "antd/lib/button";
import { doc, updateDoc } from "firebase/firestore";
import { FirebaseContext } from "../../index";
import { getAuth } from "firebase/auth";

const Notifications = () => {
  const { userData } = useOutletContext();
  const [notifications, setNotifications] = useState([]);
  const { firestore } = useContext(FirebaseContext);

  useEffect(() => {
    const setAllNotificationIsRead = async () => {
      const isReadNotifications = userData.notifications.map((notification) => {
        return { ...notification, isRead: true };
      });

      await updateDoc(doc(firestore, "users", userData.email), {
        notifications: isReadNotifications,
      });

      setNotifications(userData.notifications.reverse());
    };

    setAllNotificationIsRead();
  }, []);

  const updateNotifications = async (id) => {
    const modifiedNotifications = notifications.filter((notifcation) => notifcation.id !== id);

    await updateDoc(doc(firestore, "users", userData.email), {
      notifications: modifiedNotifications,
    });
    setNotifications(modifiedNotifications);
  };

  return (
    <div className={styles["notifications"]}>
      <h2 className={"my-account-title"}>Уведомления</h2>
      <ul>
        {notifications.map((notification, index) => {
          return (
            <li className={notification.isRead ? styles["isRead"] : ""} key={index}>
              <p>{notification.text}</p>
              <Button onClick={() => updateNotifications(notification.id)}>X</Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Notifications;
