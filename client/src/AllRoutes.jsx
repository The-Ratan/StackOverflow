import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import Questions from "./Pages/Questions/Questions";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./Pages/Questions/DisplayQuestion";
import Tags from "./Pages/Tags/Tags";
import Users from "./Pages/Users/Users";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Public from "./Pages/Public/Public";
import ChatBot from "./Pages/ChatBot/ChatBot";
import Subscription from "./Pages/Subscription/Subscription";
import Success from "./Pages/Payment/Success";
import Cancel from "./Pages/Payment/cancel";

const AllRoutes = ({ slideIn, handleSlideIn }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route path="/Auth" element={<Auth handleSlideIn={handleSlideIn}/>} />
      <Route path="/cancel" element={<Cancel handleSlideIn={handleSlideIn}/>} />
      <Route path="/success" element={<Success handleSlideIn={handleSlideIn}/>} />
      <Route path="/AskQuestion" element={<AskQuestion handleSlideIn={handleSlideIn}/>} />
      <Route path="/chatbot" element={<ChatBot slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
      <Route path="/subscription" element={<Subscription slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
      <Route
        path="/Questions"
        element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Questions/:id"
        element={
          <DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      />
      <Route
        path="/Tags"
        element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Users"
        element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
            <Route
        path="/public"
        element={<Public slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Users/:id"
        element={
          <UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      />
    </Routes>
  );
};

export default AllRoutes;
