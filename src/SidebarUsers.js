import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarUsers.css";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
function SidebarUsers({ chatUser }) {
  const [{}, dispatch] = useStateValue();

  const handleClick = () => {
    dispatch({
      type: actionTypes.SET_CHAT_USER,
      chatUser: chatUser,
    });
  };

  return (
    <div className="sidebarUsers" onClick={handleClick}>
      <div className="sidebarUsersContent">
        <Avatar src={chatUser.imgURL} />
        <h3>{chatUser.name}</h3>
      </div>
      <div className="line" style={{ backgroundColor: "gray" }}></div>
    </div>
  );
}

export default SidebarUsers;
