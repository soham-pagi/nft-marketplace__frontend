import React from "react";

//INTERNAL IMPORT
import Style from "./Banner.module.css";

const Banner = ({ bannerImage }) => {
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
        <img
          src={bannerImage}
          objectFit="cover"
          alt="background"
          width={1600}
          height={100}
        />
      </div>

      <div className={Style.banner_img_mobile}>
        <img
          src={bannerImage}
          objectFit="cover"
          alt="background"
          width={1600}
          height={300}
        />
      </div>
    </div>
  );
};

export default Banner;
