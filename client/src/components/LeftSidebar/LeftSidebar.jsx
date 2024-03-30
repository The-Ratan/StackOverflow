import React from "react";
import "./LeftSidebar.css";
import { NavLink } from "react-router-dom";
import Globe from "../../assets/Globe.svg";
import { useRecoilValue } from "recoil";
import { darkModes } from "../../actions/DarkMode";

const LeftSidebar = ({ slideIn, handleSlideIn }) => {
  const slideInStyle = {
    transform: "translateX(0%)",
  };

  const slideOutStyle = {
    transform: "translateX(-100%)",
  };

  const darkMode = useRecoilValue(darkModes)

  const CloseNav = ()=>{
    handleSlideIn()
  }

  return (
    <div
      className={`left-sidebar mt-[-9px] ${darkMode ? "bg-slate-800" : "bg-white"}`}
      style={slideIn ? slideInStyle : slideOutStyle}
    >
      <nav className={`side-nav`}>
        <button onClick={CloseNav} className="nav-btn">
          <NavLink to="/" className={`side-nav-links ${darkMode ? "text-white" : "text-black"}`}    activeclassname="active">
            <p className=" font-bold">Home</p>
          </NavLink>
        </button>
        <button onClick={CloseNav} className="nav-btn">
          <NavLink to="/chatbot"  className={`side-nav-links ${darkMode ? "text-white" : "text-black"}`} activeclassname="active">
            <p className=" font-bold mt-2">ChatBot</p>
          </NavLink>
        </button>
        <div className="side-nav-div">
        <button onClick={CloseNav} className="nav-btn">
          <NavLink to="/public"  className={`side-nav-links ${darkMode ? "text-white" : "text-black"}`} activeclassname="active">
            <p className=" font-bold">PUBLIC</p>
          </NavLink>
        </button>
        <button onClick={CloseNav} className="nav-btn">
          <NavLink to="/subscription"  className={`side-nav-links ${darkMode ? "text-white" : "text-black"}`} activeclassname="active">
            <p className=" font-bold">SUBSCRIPTION</p>
          </NavLink>
        </button>
          <button onClick={CloseNav} className="nav-btn">
            <NavLink
              to="/Questions"
               className={`side-nav-links ${darkMode ? "text-white" : "text-black"}`}
              activeclassname="active"
            >
              <img src={Globe} alt="Globe" />
              <p style={{ paddingLeft: "10px" }} className=" font-bold"> Questions </p>
            </NavLink>
          </button>
          <button onClick={CloseNav} className="nav-btn">
            <NavLink
              to="/Tags"
               className={`side-nav-links ${darkMode ? "text-white" : "text-black"}`}
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
            >
              <p className=" font-bold">Tags</p>
            </NavLink>
          </button>
          <button onClick={CloseNav} className="nav-btn">
            <NavLink
              to="/Users"
               className={`side-nav-links ${darkMode ? "text-white" : "text-black"}`}
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
            >
              <p className=" font-bold">Users</p>
            </NavLink>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
