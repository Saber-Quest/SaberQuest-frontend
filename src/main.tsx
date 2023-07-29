import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <App />
    <Footer />
  </React.StrictMode>,
  document.getElementById("root")
);
