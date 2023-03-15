import React from "react";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload } from "react-icons/tb";
// import { Link } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./Profile.module.css";
import images from "../../../img";

const Profile = ({ currentAccount }) => {
  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <img
          src={images.user1}
          alt="user profile"
          width={50}
          height={50}
          className={Style.profile_account_img}
        />

        <div className={Style.profile_account_info}>
          <p>John Doe</p>
          <small>{currentAccount.slice(0, 18)}..</small>
        </div>
      </div>

      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              {/* <Link href={{ pathname: "/author" }}>My Profile</Link> */}
              {/* <Link to= "/profile" > My Profile </Link> */}
              <a href="/profile">My Profile</a>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p>
              {/* <Link href={{ pathname: "/author" }}>My Items</Link> */}
              <a href="/author">My Items</a>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              {/* <Link href={{ pathname: "/account" }}>Edit Profile</Link> */}
              <a href="/account">Edit Profile</a>
            </p>
          </div>
        </div>

        <div className={Style.profile_menu_two}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter />
            <p>
              {/* <Link href={{ pathname: "/contactus" }}>Help</Link> */}
              <a href="/contactus">Help</a>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <TbDownload />
            <p>
              {/* <Link href={{ pathname: "/aboutus" }}>About Us</Link> */}
              <a href="/aboutus">About Us</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
