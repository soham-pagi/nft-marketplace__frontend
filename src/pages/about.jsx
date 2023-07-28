import React from "react";

//INTERNAL IMPORT
import Style from "../styles/about.module.css";
import { Brand } from "../components/componentsindex";
import images from "../img";

const about = () => {
  window.scrollTo(0, 0);

  const founderArray = [
    {
      name: "Tanmay Nivaskar",
      position: "Founder",
      images: images.service1,
    },
    {
      name: "Soham Pagi",
      position: "Co-Founder",
      images: images.provider2,
    },
    {
      name: "Sejal Naik",
      position: "Co-Founder",
      images: images.provider3,
    },
  ];

  const factsArray = [
    {
      title: "10 million",
      info: "Articles have been public around the world (as of Sept. 30, 2021)",
    },
    {
      title: "100,000",
      info: "Registered users account (as of Sept. 30, 2021)",
    },
    {
      title: "220+",
      info: "Countries and regions have our presence (as of Sept. 30, 2021",
    },
  ];

  return (
    <div className={Style.aboutus}>
      <div className={Style.aboutus_box}>
        <div className={Style.aboutus_box_hero}>
          <div className={Style.aboutus_box_hero_left}>
            <h1>👋 About Us.</h1>
            <p>
              We’re impartial and independent, and every day we create
              distinctive, world-class programmes and content which inform,
              educate and entertain millions of people in the around the world.
            </p>
          </div>
          <div className={Style.aboutus_box_hero_right}>
            <img src={images.hero2} />
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>⛱ Founder</h2>
          <p>
            We’re impartial and independent, and every day we create
            distinctive, world-class programmes and content
          </p>
        </div>

        <div className={Style.aboutus_box_founder}>
          <div className={Style.aboutus_box_founder_box}>
            {founderArray.map((el, i) => (
              <div key={i} className={Style.aboutus_box_founder_box_img}>
                <img
                  src={el.images}
                  alt={el.name}
                  width={300}
                  height={300}
                  className={Style.aboutus_box_founder_box_img_img}
                />
                <h3>{el.name}</h3>
                <p>{el.position}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>🚀 Fast Facts</h2>
          <p>
            We’re impartial and independent, and every day we create
            distinctive, world-class programmes and content
          </p>
        </div>

        <div className={Style.aboutus_box_facts}>
          <div className={Style.aboutus_box_facts_box}>
            {factsArray.map((el, i) => (
              <div
                key={`abcd${i}`}
                className={Style.aboutus_box_facts_box_info}
              >
                <h3>{el.title}</h3>
                <p>{el.info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Brand />
    </div>
  );
};

export default about;