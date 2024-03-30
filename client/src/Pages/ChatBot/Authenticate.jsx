import React, { useState } from "react";
import icon from "../../assets/icon.png";
import { AuthUser, darkModes } from "../../actions/DarkMode";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LocalUrl } from "../../api";
import axios from "axios";

function Authenticate() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sendingOtp, setsendingOtp] = useState(false);
  const [sendingData, setsendingData] = useState(false);
  const [otpSent, setotpSent] = useState(false);
  const setAuthUser = useSetRecoilState(AuthUser);

  const AuthenticateUser = async (e) => {
    e.preventDefault();
    if (email && otp) {
      if (otp.length === 6) {
        try {
          setsendingData(true);
          const { data } = await axios.post(`${LocalUrl}user/authenticate`, {
            email,
            otp,
          });
          if (data.success) {
            setOtp("");
            setEmail("");
            setAuthUser(data.data);
            alert("Authenticated Successfully");
          } else {
            setOtp("");
            alert(data.message);
          }
          setsendingData(false);
        } catch (err) {
          setsendingData(false);
          console.log("SomeThing Went Wrong", err);
        }
        setsendingData(false);
      } else {
        setOtp("");
        alert("Invalid otp");
      }
    } else {
      alert("All Fields are Neccessary");
    }
  };
  const sendOtp = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        setsendingOtp(true);
        const { data } = await axios.post(`${LocalUrl}user/sendOtp`, { email });
        if (data.success) {
          alert("Otp Sent Successfully");
          setotpSent(true);
          setTimeout(() => {
            setotpSent(false);
          }, 10000);
        } else {
          setEmail("");
          setotpSent(false);
          alert(data.message);
        }
        setsendingOtp(false);
      } catch (err) {
        setsendingOtp(false);
        setEmail("");
        setotpSent(false);
        console.log("SomeThing Went Wrong", err);
      }
      setsendingOtp(false);
    } else {
      alert("Email field is Empty");
    }
  };

  const darkMode = useRecoilValue(darkModes);

  return (
    <div>
      <section
        className={`flex flex-col items-center justify-center h-full min-h-screen min-w-[50%] ${
          darkMode ? "bg-slate-800 text-white" : "text-black"
        }`}
      >
            <h1 className="flex text-center text-1xl lg:text-2xl md:text-2xl font-bold">Authenticate Using Otp to use AI Powered Chat Bot</h1>
            <br />
        <div className="Auth">
          <img src={icon} alt="stack overflow" className="login-logo" />
          <form className="lg:w-[200%]" onSubmit={sendingData ? undefined : AuthenticateUser}>
            <label htmlFor="email">
              <h4 className={`${darkMode ? "text-black" : ""}`}>Email</h4>
              <input
                className={`border-2  w-full p-2 ${darkMode && "text-black"}`}
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value.toLowerCase());
                }}
              />
            </label>
            <button
              onClick={sendingOtp || otpSent ? undefined : sendOtp}
              className={`mt-5 px-5 py-2 ${
                sendingOtp || otpSent
                  ? "bg-gray-500 hover:bg-gray-700 border-gray-500"
                  : "bg-blue-500 hover:bg-blue-700 border-blue-500"
              } border  text-white rounded-md cursor-pointer transition duration-200 text-sm font-semibold`}
            >
              {otpSent ? "Resend otp after 10sec" : "Send Otp"}
            </button>
            <label htmlFor="password">
              <h4 className={`${darkMode ? "text-black" : ""}`}>Otp</h4>
              <input
                className={`border-2  w-full p-2 ${darkMode && "text-black"}`}
                type="otp"
                name="otp"
                id="otp"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
            </label>
            <button
              type="submit"
              className={`mt-5 px-5 py-2 ${
                sendingData
                  ? "bg-gray-500 hover:bg-gray-700 border-gray-500"
                  : "bg-blue-500 hover:bg-blue-700 border-blue-500"
              } border  text-white rounded-md cursor-pointer transition duration-200 text-sm font-semibold`}
            >
              Authenticate
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Authenticate;
