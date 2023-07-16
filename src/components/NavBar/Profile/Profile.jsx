import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { Link } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./Profile.module.css";
import images from "../../../img";

const Profile = ({ currentAccount }) => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();

  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <img
          src={images.user5}
          alt="user profile"
          width={50}
          height={50}
          className={Style.profile_account_img}
        />

        <div className={Style.profile_account_info}>
          <p>Jane</p>
          <small>{currentAccount.slice(0, 18)}..</small>
        </div>
      </div>

      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              <Link to={"/profile"}>My Profile</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link to={"/account"}>Edit Profile</Link>
            </p>
          </div>
        </div>

        <div className={Style.profile_menu_two}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter />
            <p>
              <Link to={"/contact"}>Help</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
