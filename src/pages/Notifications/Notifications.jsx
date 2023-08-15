import React from "react";
import { useOutletContext } from "react-router-dom";

const Notifications = () => {
  const { userData } = useOutletContext();

  console.log(userData, "userData");

  return (
    <div>
      <ul>
        {userData.notifications.map((notification, index) => {
          return <li key={index}>{notification.text}</li>;
        })}
      </ul>
    </div>
  );
};

export default Notifications;
