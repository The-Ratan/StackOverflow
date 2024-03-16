import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Chat from "./Chat";

const ChatBot = ({ slideIn }) => {
  return (
    <div className="flex items-center justify-center">
        <Chat />
    </div>
  );
};

export default ChatBot;
