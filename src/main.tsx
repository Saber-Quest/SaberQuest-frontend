import React from "react";
import ReactDOM from "react-dom";
import "@styles/index.scss";
import App from "./App";
import Navbar from "@Navbar";
import Footer from "@Footer";

ReactDOM.render(
  <React.StrictMode>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <App />
      <Footer />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);