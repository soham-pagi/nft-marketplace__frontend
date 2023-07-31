import React, { useState, useEffect, useContext } from "react";
import { DiJqueryLogo } from "react-icons/di";

//----IMPORT ICON
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Profile } from "./index";
import { Button, Error, Loader } from "../componentsindex";
import { Notification } from "./index";


//IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

function NavBar() {
  //----USESTATE COMPONNTS
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);

  const navigate = useNavigate();

  const {
    currentAccount,
    connectWallet,
    isMetamaskConnected,
    openError,
    userProfileData,
    setUserProfileData,
    getProfile,
    isLoading
  } = useContext(NFTMarketplaceContext);

  useEffect(() => {
    (async function () {
      const user = await getProfile(currentAccount);
      setUserProfileData(user);
    })();

  }, [currentAccount]);

  const openNotification = () => {
    setNotification((pre) => !pre);
    setDiscover(false);
    setHelp(false);
    setProfile(false);
  };

  const openProfile = () => {
    setProfile((pre) => !pre);
    setHelp(false);
    setDiscover(false);
  };

  const openDiscover = () => {
    setDiscover((pre) => !pre);
    setHelp(false);
    setNotification(false);
    setProfile(false);
  }

  const openHelp = () => {
    setHelp((pre) => !pre);
    setDiscover(false);
    setNotification(false);
    setProfile(false);
  }

  const openMenu = (e) => {
    const btnText = e.target.innerText;

    if (btnText === "Discover") {
      openDiscover();
    } else if (btnText === "Help Center") {
      openHelp();
    }
    else if (btnText === "Notifications") {
      openNotification();
    } else {
      openProfile();
    }
  };

  const handleSearch = () => {
    const searchQuery = document.getElementById("search-nft").value;
    navigate(`/searchPage?query=${searchQuery}`);
  };

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <DiJqueryLogo onClick={() => navigate("/")} />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input id="search-nft" type="text" placeholder="Search NFT" />
              <BsSearch onClick={handleSearch} className={Style.search_icon} />
            </div>
          </div>
        </div>

        {/* //END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}>
            {/* DISCOVER MENU */}
            <p onClick={(e) => openMenu(e)}>Discover</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover setDiscover={setDiscover}/>
              </div>
            )}
          </div>

          {/* HELP CENTER MENU */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openMenu(e)}>Help Center</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter setHelp={setHelp} />
              </div>
            )}
          </div>

          {/* NOTIFICATION */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={(e) => {
                openMenu({target: { innerText: "Notifications"}})
              }}
            />
            {notification && <Notification setNotification={setNotification} />}
          </div>

          {/* CREATE BUTTON SECTION */}
          <div className={Style.navbar_container_right_button}>
            {isMetamaskConnected ? (
              <Button
                btnName="Create"
                handleClick={() => {
                  setDiscover(false);
                  setHelp(false);
                  setNotification(false)
                  navigate("/uploadNFT");
                }}
              />
            ) : (
              <Button
                btnName="Connect"
                handleClick={() => {
                  connectWallet();
                }}
              />
            )}
          </div>

          {/* USER PROFILE */}
          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <img
                src={userProfileData.imgUrl}
                alt="Profile"
                width={40}
                height={40}
                onClick={(e) => openMenu(e)}
                className={Style.navbar_container_right_profile}
              />

              {profile && <Profile currentAccount={currentAccount} setProfile={setProfile} />}
            </div>
          </div>
        </div>
      </div>

      {openError && <Error />}
      {isLoading && <Loader active={isLoading} />}
    </div>
  );
}

export default NavBar;
