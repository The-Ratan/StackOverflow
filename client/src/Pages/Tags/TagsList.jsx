import React from "react";
import "./Tags.css";
import { useRecoilValue } from "recoil";
import { darkModes } from "../../actions/DarkMode";

const TagsList = ({ tag }) => {
  const darkMode = useRecoilValue(darkModes)

  return (
    <div className="tag">
      <h5>{tag.tagName}</h5>
      <p className={`${darkMode ? "text-white" : "text-[#323232]"}`}>{tag.tagDesc}</p>
    </div>
  );
};

export default TagsList;
