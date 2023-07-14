import React, { useState } from "react";
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { AiTwotonePropertySafety } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./UploadNFT.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../../img";
import { Button } from "../componentsindex";
import { DropZone } from "./uploadNFTIndex";

function UploadNFT({ createNFT }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [active, setActive] = useState(0);
  const [description, setDescription] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const categoryArry = [
    {
      image: images.nft_image_1,
      category: "Sports",
    },
    {
      image: images.nft_image_2,
      category: "Arts",
    },
    {
      image: images.nft_image_1,
      category: "Digital",
    },
    {
      image: images.nft_image_2,
      category: "Time",
    },
    {
      image: images.nft_image_3,
      category: "Photography",
    },
  ];

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
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/*
        <div className={formStyle.Form_box_input}>
          <label htmlFor="website">Website</label>
          <div className={formStyle.Form_box_input_box}>
            <div className={formStyle.Form_box_input_box_icon}>
              <MdOutlineHttp />
            </div>
            <input
              type="text"
              placeholder="website"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          
          <p className={Style.upload_box_input_para}>
          We will include a link to this URL on this item's detail page, so
          that users can click to learn more about it. You are welcome to link
          to your own webpage with more details.
          </p>
          </div>
        */}

        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="something about yourself in few words"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p>
            The description will be included on the item's detail page
            underneath its image. Markdown syntax is supported.
          </p>
        </div>

        {/*
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Choose collection</label>
          <p className={Style.upload_box_input_para}>
            Choose an exiting collection or create a new one
          </p>

          <div className={Style.upload_box_slider_div}>
            {categoryArry.map((el, i) => (
              <div
                className={`${Style.upload_box_slider} ${
                  active === i + 1 ? Style.active : ""
                }`}
                key={i + 1}
                onClick={() => (setActive(i + 1), setCategory(el.category))}
              >
                <div className={Style.upload_box_slider_box}>
                  <div className={Style.upload_box_slider_box_img}>
                    <img
                      src={el.image}
                      alt="background image"
                      width={70}
                      height={70}
                      className={Style.upload_box_slider_box_img_img}
                    />
                  </div>
                  <div className={Style.upload_box_slider_box_img_icon}>
                    <TiTick />
                  </div>
                </div>
                <p>Crypto Legend - {el.category} </p>
              </div>
            ))}
          </div>
        </div>
              */}

        <div className={formStyle.Form_box_input_social}>
          {/*
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Royalties">Royalties</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <FaPercent />
              </div>
              <input
                type="text"
                placeholder="20%"
                onChange={(e) => setRoyalties(e.target.value)}
              />
            </div>
          </div>
         */}

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
          {/*
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Property">Property</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                type="text"
                placeholder="Property"
                onChange={(e) => setProperties(e.target.value)}
              />
            </div>
          </div>
              */}

          <div className={formStyle.Form_box_input}>
            <label htmlFor="Price">Price</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
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
              await createNFT(name, price, image, description);
              navigate("/collection");
            }}
            classStyle={Style.upload_box_btn_style}
          />
          <Button
            btnName="Preview"
            handleClick={() => {
              // router("/search");
              console.log("preview");
            }}
            classStyle={Style.upload_box_btn_style}
          />
        </div>
      </div>
    </div>
  );
}

export default UploadNFT;
