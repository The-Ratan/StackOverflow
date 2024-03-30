import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HomeMainbar.css";
import QuestionList from "./QuestionList";
import { MdDarkMode } from "react-icons/md";
import { darkModes } from "../../actions/DarkMode";
import { useRecoilState } from "recoil";
import { Audio } from 'react-loader-spinner'

const HomeMainbar = () => {
  const [darkMode,setDarkMode] = useRecoilState(darkModes)
  const location = useLocation();
  const user = 1;
  const navigate = useNavigate();

  const setDark = ()=>{
    setDarkMode(!darkMode)
  }

  const questionsList = useSelector((state) => state.questionsReducer);

  const checkAuth = () => {
    if (user === null) {
      alert("login or signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
          
        <div className="flex items-center justify-center">
        <button onClick={checkAuth} className="ask-btn mr-5">
          Ask Question
        </button>
        <span onClick={setDark} className={`cursor-pointer border-2 p-2 rounded-full ${darkMode ? "border-white bg-black" : "border-black bg-white"}`}>
        <MdDarkMode className={`text-2xl ${darkMode ? " text-white" : "text-black"}`}/>
        </span>
        </div>
      </div>
      <div>
        {questionsList.data === null ? (
          <div className="mt-10 flex items-center justify-center flex-col">
          <Audio
          height="80"
          width="80"
          radius="9"
          color={`${darkMode ? "white" : "black"}`}
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
        <h1 className="text-2xl ml-10">Loading Questions...</h1>
        </div>
        ) : (
          <>
            <p className="mt-5 mb-5">{questionsList.data.length} questions</p>
            <QuestionList questionsList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
