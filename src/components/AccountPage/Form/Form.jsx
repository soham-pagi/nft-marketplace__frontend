import React, { useContext, useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";

//INTERNAL IMPORT
import Style from "./Form.module.css";
import Button from "../../Button/Button";

import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const Form = ({ imgFile }) => {
  const { userProfileData, currentAccount, balance, setProfile } = useContext(
    NFTMarketplaceContext
  );
  const [currentName, setCurrentName] = useState("");
  const [newName, setNewName] = useState("");

  useEffect(() => {
    setCurrentName(userProfileData.username);
  });

  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form>
          <div className={Style.Form_box_input}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              placeholder="Enter your name"
              defaultValue={currentName}
              className={Style.Form_box_input_userName}
              onChange={(event) => {
                setNewName(event.target.value);
                console.log(newName);
              }}
            />
          </div>
          <div className={Style.Form_box_input}>
            <label htmlFor="email">Balance</label>
            <h3 style={{ padding: 10 }}>ETH : {balance}</h3>
          </div>

          <div className={Style.Form_box_btn}>
            <Button
              type="button"
              btnName="Update profile"
              handleClick={(e) => {
                console.log({ currentAccount, balance, imgFile });
                setProfile(currentAccount, newName, imgFile);
              }}
              classStyle={Style.button}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
