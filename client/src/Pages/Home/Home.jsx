import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";
import { VideoUploadUrl } from "../../api";
import { useRecoilState } from "recoil";
import { renderCalled } from "../../actions/DarkMode";

const Home = ({ slideIn,handleSlideIn }) => {

  const [called, setcalled] = useRecoilState(renderCalled);

  const StartRender = async()=>{
    await axios.get(`${VideoUploadUrl}questions/get`)
    setcalled(false)
  }

  useEffect(()=>{
    called === true && StartRender()
  },[])
  return (
    <>
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn}/>
      <div className="home-container-2">
        <HomeMainbar />
        <RightSidebar />
      </div>
    </div>
    <div className="w-full flex items-end justify-end p-2 pr-2 top-[-10rem] left-[-1rem] rounded-full relative">
    <Link to={"/chatbot"}>
      <img
        src="/bot.gif"
        className="w-[60px] cursor-pointer md:w-[80px] lg:w-[80px]"
      />
    </Link>
  </div>
    </>
  );
};

export default Home;
