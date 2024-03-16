import React, { useEffect } from "react";
import axios from "axios";
import "../../App.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";
import { VideoUploadUrl } from "../../api";

const Home = ({ slideIn,handleSlideIn }) => {
  const StartRender = async()=>{
    await axios.get(`${VideoUploadUrl}questions/get`)
  }

  useEffect(()=>{
    StartRender()
  },[])
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn}/>
      <div className="home-container-2">
        <HomeMainbar />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
