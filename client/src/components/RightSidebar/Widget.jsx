import React from "react";
import "./RightSidebar.css";
import { FaPen } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoLogoStackoverflow } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { darkModes } from "../../actions/DarkMode";

const Widget = () => {
  const darkMode = useRecoilValue(darkModes)

  return (
    <div className="widget">
      <h4>The Overflow Blog</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <FaPen className={`text-2xl ${darkMode ? "text-white" : "text-black"}`}/>
          <p>
            Observability is key to the future of software (and your DevOps
            career)
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <FaPen className={`text-[1rem] ${darkMode ? "text-white" : "text-black"}`}/>
          <p>Podcast 374: How valuable is your screen name?</p>
        </div>
      </div>
      <h4>Featured on Meta</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <FaMessage className={`text-[1rem] ${darkMode ? "text-white" : "text-black"}`}/>
          <p>Review queue workflows - Final release....</p>
        </div><br />
        <div className="right-sidebar-div-2">
          <FaMessage className={`text-2xl ${darkMode ? "text-white" : "text-black"}`}/>
          <p>
            Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <IoLogoStackoverflow  className={`text-3xl ${darkMode ? "text-white" : "text-black"}`}/>
          <p>
            Outdated Answers: accepted answer is now unpinned on Stack Overflow
          </p>
        </div>
      </div>
      <h4>Hot Meta Posts</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <p>38</p>
          <p>
            Why was this spam flag declined, yet the question marked as spam?
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <p>20</p>
          <p>
            What is the best course of action when a user has high enough rep
            to...
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <p>14</p>
          <p>Is a link to the "How to ask" help page a useful comment?</p>
        </div>
      </div>
    </div>
  );
};

export default Widget;
