import React, { useEffect } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import Chat from "./Chat";

const ChatBot = ({ slideIn }) => {
  return (
    <div className="min-h-screen max-w-7xl w-full flex justify-between mx-auto overflow-hidden">
      <LeftSidebar slideIn={slideIn} />
      <div className="p-2 w-full flex items-center justify-center overflow-hidden">
        <Chat />
      </div>
    </div>
  );
};

export default ChatBot;
