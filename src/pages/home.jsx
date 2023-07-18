import React from "react";

// INTERNAL IMPORT
import {
  HeroSection,
  Service,
  Collection,
} from "../components/componentsindex";

const Home = () => {
  return (
    <div style={{ marginTop: 95 }}>
      <HeroSection />
      <Service />
    </div>
  );
};

export default Home;
