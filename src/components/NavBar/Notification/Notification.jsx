import React from "react";

//INTERNAL IMPORT
import Style from "./Notification.module.css";
import images from "../../../img";

const Notification = ({ setNotification}) => {
  // notificationData object will contain the actual data

  const sampleNotifications = [
    {
      accountName: "NFT-Marketplace",
      notificationText: "Check this collection..",
      time: "3 mins ago",
    },
    {
      accountName: "NFT-Marketplace",
      notificationText: "Tom & Jerry collection..",
      time: "7 mins ago",
    },
    {
      accountName: "NFT-Marketplace",
      notificationText: "Beeple Art collection..",
      time: "10 mins ago",
    },
  ];

  return (
    <div className={Style.notification}>
      <p>Notifications</p>
      {sampleNotifications.map((el, i) => (
        <div key={i} className={Style.notification_box}>
          <div className={Style.notification_box_img}>
            <img
              src={images.nft_image_1}
              alt="profile image"
              width={40}
              height={40}
              className={Style.notification_box_img}
            />
          </div>
          <div className={Style.notification_box_info}>
            <h4>{el.accountName}</h4>
            <p>{el.notificationText}</p>
            <small>{el.time}</small>
          </div>
        </div>
      ))}
      <span className={Style.notification_box_new}></span>
    </div>
  );
};

export default Notification;
