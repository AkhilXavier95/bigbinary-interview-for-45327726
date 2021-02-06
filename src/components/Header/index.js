import React from "react";
import logo from "assets/Logo.png";

import "./Header.scss";

const Header = () => {
  return (
    <div className="header d-flex justify-content-center align-items-center">
      <img src={logo} alt="" />
    </div>
  );
};

export default Header;
