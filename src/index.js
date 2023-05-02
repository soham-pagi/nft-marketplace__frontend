import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import MyApp from "./pages/_app";

import RoutesFile from "./RoutesFile";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <MyApp>
    <RoutesFile />
  </MyApp>
);
