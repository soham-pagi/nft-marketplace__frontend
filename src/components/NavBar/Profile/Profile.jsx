import React, { useContext } from "react";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { Link } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./Profile.module.css";
import images from "../../../img";

import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const Profile = () => {
  window.scrollTo(0, 0);
  const { currentAccount, userProfileData } = useContext(NFTMarketplaceContext);

  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <img
          src={userProfileData.imgUrl}
          alt="user profile"
          width={50}
          height={50}
          className={Style.profile_account_img}
        />

        <div className={Style.profile_account_info}>
          <p>{userProfileData.username}</p>
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
