import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Chats.css";
import db from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
function Chats({ chatUser }) {
  const [{ user }, dispatch] = useStateValue();
  const [lastMessage, setLastMessage] = useState("");
  const [timeStamp, setTimeStamp] = useState(null);
  useEffect(() => {
    if (!chatUser || !user) {
      return;
    }
    const unsubs = db
      .collection("messages")
      .doc(user?.uid)
      .collection(chatUser?.uid)
      .orderBy("timestamp", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        setLastMessage(snapshot.docs[0]?.data().message);
        setTimeStamp(snapshot.docs[0]?.data().timestamp);
      });
    return () => {
      unsubs();
    };
  }, [user, chatUser]);
  const handleClick = () => {
    dispatch({
      type: actionTypes.SET_CHAT_USER,
      chatUser: chatUser,
    });
  };
  return (
    <>
      <div className="chats" onClick={handleClick}>
        <Avatar src={chatUser?.photoURL} />
        <div className="chats_detail">
          <h3>{chatUser?.name}</h3>
          <h5>{lastMessage}</h5>
        </div>
        <h5>{new Date(timeStamp?.toDate()).toUTCString()}</h5>
      </div>
      <div className="line"></div>
    </>
  );
}

export default Chats;
