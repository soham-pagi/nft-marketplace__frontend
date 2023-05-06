import React from "react";

//INTERNAL IMPORT
import Style from "./Loader.module.css";
import images from "../../img";

const Loader = ({ active = true }) => {
  return (
    <div className={Style.Loader}>
      {active && <div className={Style.Loader_overlay}></div>}
      <div className={Style.Loader_box}>
        <div className={Style.Loader_box_img}>
          <img
            src={images.loader}
            alt="loader"
            width={100}
            height={100}
            className={Style.Loader_box_img_img}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
