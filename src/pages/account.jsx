import React, { useState, useCallback, useContext, useEffect } from "react";
import { useDropzone } from "react-dropzone";

//INTERNAL IMPORT
import Style from "../styles/account.module.css";
import images from "../img";
import Form from "../components/AccountPage/Form/Form";

import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Account = () => {
  window.scrollTo(0, 0);
  const { userProfileData } = useContext(NFTMarketplaceContext);
  const [fileUrl, setFileUrl] = useState(images.upload);
  const [imgFile, setImgFile] = useState(images.upload);

  useEffect(() => {
    setFileUrl(userProfileData.imgUrl);
  }, [userProfileData.imgUrl]);

  const onDrop = useCallback(async (acceptedFile) => {
    setImgFile(acceptedFile[0]);
    setFileUrl(URL.createObjectURL(acceptedFile[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>Profile settings</h1>
        <p>You can set preferred display name, create your profile picture.</p>
      </div>

      <div className={Style.account_box}>
        <div className={Style.account_box_img} {...getRootProps()}>
          <input {...getInputProps()} />
          {fileUrl && (
            <img
              src={fileUrl}
              alt="Profile"
              width={150}
              height={150}
              className={Style.account_box_img_img}
            />
          )}
          <p className={Style.account_box_img_para}>Change Image</p>
        </div>
        <div className={Style.account_box_from}>
          <Form imgFile={imgFile} />
        </div>
      </div>
    </div>
  );
};

export default Account;
