import React from "react";

import "../../App.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import Membership from "./Membership";

const Subscription = ({ handleSlideIn,slideIn }) => {
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn}/>
      <div className="home-container-2">
        <Membership />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Subscription;
