import React, { useState } from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import { AiTwotonePropertySafety } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./UploadNFT.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../componentsindex";
import { DropZone } from "./uploadNFTIndex";

function UploadNFT({ createNFT }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  return (
    <div className={Style.upload}>
      <h1>Upload your NFT</h1>
      <DropZone
        name={name}
        description={description}
        fileSize={fileSize}
        setFileSize={setFileSize}
        setImage={setImage}
      />

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Item Name</label>
          <input
            type="text"
            placeholder="Eg. Doodles"
            className={formStyle.Form_box_input_userName}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="Something about yourself in few words"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p>
            The description will be included on the item's detail page
            underneath its image.
          </p>
        </div>

        <div className={formStyle.Form_box_input_social}>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="size">Size</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <MdOutlineAttachFile />
              </div>
              <input
                type="text"
                placeholder="10MB"
                value={fileSize + " MB"}
                readOnly
              />
            </div>
          </div>

          <div className={formStyle.Form_box_input}>
            <label htmlFor="Price">Price</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                value={price}
                type="number"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={Style.upload_box_btn}>
          <Button
            btnName="Upload"
            handleClick={async () => {
              const success = await createNFT(name, price, image, description);
              console.log({success});
              if (success) {
                navigate("/my-items"); 
              }
            }}
            classStyle={Style.upload_box_btn_style}
          />
        </div>
      </div>
    </div>
  );
}

export default UploadNFT;
