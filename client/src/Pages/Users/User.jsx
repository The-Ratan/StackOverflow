import React from "react";
import { Link } from "react-router-dom";

import "./Users.css";
import { darkModes } from "../../actions/DarkMode";
import { useRecoilValue } from "recoil";

const User = ({ user }) => {
  const darkMode = useRecoilValue(darkModes)

  return (
    <Link to={`/Users/${user._id}`} className="user-profile-link">
      <h3>{user.name.charAt(0).toUpperCase()}</h3>
      <h5 className={`${darkMode  ? "text-white" : "text-black"}`}>{user.name}</h5>
    </Link>
  );
};

export default User;
