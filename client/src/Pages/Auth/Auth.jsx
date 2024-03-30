import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";
import { darkModes } from "../../actions/DarkMode";
import { useRecoilValue } from "recoil";
const Auth = () => {
  const darkMode = useRecoilValue(darkModes)
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    if (!email && !password) {
      alert("Enter email and password");
    }
    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
      }
      dispatch(signup({ name, email, password }, navigate));
    } else {
      dispatch(login({ email, password }, navigate));
    }
    setLoading(false)
  };

  return (
    <section className={`auth-section ${darkMode ? "bg-slate-800 text-white" : "text-black"}`}>
      {isSignup && <AboutAuth />}
      <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form className="lg:w-full md:w-full w-[100vw]" onSubmit={loading ? undefined :handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4 className={`${darkMode? "text-black":""}`}>Display Name</h4>
              <input
              className={`${darkMode && "text-black" }`}
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          )}
          <label htmlFor="email">
            <h4 className={`${darkMode? "text-black":""}`}>Email</h4>
            <input
            className={`${darkMode && "text-black" }`}
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value.toLowerCase());
              }}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 className={`${darkMode? "text-black":""}`}>Password</h4>
              {!isSignup && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  forgot password?
                </p>
              )}
            </div>
            <input
            className={`${darkMode && "text-black" }`}
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <button type="submit" className={`${loading ? "bg-gray-500" : "hover:bg-[#018ce3] bg-[#009dff]"} mt-3 p-3 text-white rounded-lg cursor-pointer text-1xl font-semibold`}>
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "sign up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
