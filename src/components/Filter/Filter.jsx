import React, { useState } from "react";

//INTERNAL IMPORT
import Style from "./Filter.module.css";

const Filter = () => {
  return (
    <div className={Style.filter}>
      <div className={Style.filter_box}>
        <div className={Style.filter_box_left}>
          <button>NFTs Collection</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
