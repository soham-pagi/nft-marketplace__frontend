import React from "react";
import { Link } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./HelpCenter.module.css";

const HelpCenter = ({ setHelp }) => {
  const helpCenter = [
    {
      name: "About",
      link: "about",
    },
    {
      name: "Contact",
      link: "contact",
    },
  ];

  return (
    <div className={Style.box}>
      {helpCenter.map((el, i) => (
        <div className={Style.helpCenter} key={i + 1}>
          <Link onClick={() => {
            setHelp(false);
          }} to={el.link}> {el.name} </Link>
        </div>
      ))}
    </div>
  );
};

export default HelpCenter;
