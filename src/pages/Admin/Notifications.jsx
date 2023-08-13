import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../index";

const Notifications = () => {
  const { socket } = useContext(SocketContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prevState) => [...prevState, data]);
    });
  }, []);

  console.log(notifications, "notifications");

  return <div>123</div>;
};

export default Notifications;
