import React from "react";

//INTERNAL IMPORT
import Style from "./Banner.module.css";

const Banner = ({ bannerImage }) => {
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
        <img
          src={bannerImage}
          style={{ objectFit: "cover" }}
          alt="background"
          height={150}
        />
      </div>

      <div className={Style.banner_img_mobile}>
        <img
          src={bannerImage}
          style={{ objectFit: "cover" }}
          alt="background"
          height={200}
        />
      </div>
    </div>
  );
};

export default Banner;
