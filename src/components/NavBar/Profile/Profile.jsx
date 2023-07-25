import React, { useContext } from "react";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { Link } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./Profile.module.css";

import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const Profile = ({ setProfile }) => {
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
              <Link onClick={() => setProfile(false)} to={"/profile"}>My Profile</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link onClick={() => setProfile(false) } to={"/my-items"}>My Items</Link>
            </p>
          </div>
        </div>

        <div className={Style.profile_menu_two}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter />
            <p>
              <Link onClick={() => setProfile(false) }  to={"/contact"}>Help</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
