import React, { useEffect, useRef, useState } from "react";
import "./Body.css";
import { Avatar, Button, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Message from "./Message";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicIcon from "@material-ui/icons/Mic";
import db, { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase/app";
import BodyBackground from "./BodyBackground";

function Body() {
  const [{ user, chatUser }] = useStateValue();
  const [messages, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const lastMessage = useRef();
  useEffect(() => {
    if (!user || !chatUser) {
      return;
    }
    const unsubscribe = db
      .collection("messages")
      .doc(user?.uid)
      .collection(chatUser?.uid)
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessage(snapshot.docs.map((doc) => doc.data()));
      });
    return () => {
      unsubscribe();
    };
  }, [user, chatUser]);

  useEffect(() => {
    if (messages && lastMessage.current) {
      lastMessage.current.scrollIntoView();
    }
  }, [messages]);

  const handleMessageSend = () => {
    const userRef = db.collection("chats").doc("users").collection(user.uid);
    const chatUserRef = db
      .collection("chats")
      .doc("users")
      .collection(chatUser.uid);

    userRef
      .doc(chatUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          return;
        }
        userRef.doc(chatUser.uid).set({
          email: chatUser.email,
          imgURL: chatUser.imgURL,
          name: chatUser.name,
          uid: chatUser.uid,
        });

        chatUserRef.doc(user.uid).set({
          email: user.email,
          imgURL: user.imgURL,
          name: user.name,
          uid: user.uid,
        });
      });

    db.collection("messages").doc(user.uid).collection(chatUser.uid).add({
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
    });

    db.collection("messages").doc(chatUser.uid).collection(user.uid).add({
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMessageSend();
    setInput("");
  };

  return (
    <div className="body">
      {/* Header */}
      <div className="body_header">
        <Avatar src={chatUser?.imgURL} />
        <span className="body_headerName">{chatUser?.name}</span>
        <div className="body_headerIcons">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <Button
          className="body_headerLogout"
          onClick={() => {
            auth.signOut();
          }}
        >
          Logout
        </Button>
      </div>
      {/* Message */}
      {!chatUser ? (
        <BodyBackground />
      ) : (
        <>
          <div className="body_messages">
            {messages.map((message, i) => {
              return (
                <Message
                  key={i}
                  senderUid={message.user.uid}
                  message={message.message}
                  timestamp={message.timestamp}
                />
              );
            })}
            <div ref={lastMessage}></div>
          </div>
          <div className="body_input">
            <IconButton>
              <InsertEmoticonIcon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
            <form>
              <input
                type="text"
                placeholder="Type a Message"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <button type="submit" disabled={!input} onClick={handleSubmit}>
                Send
              </button>
            </form>
            <IconButton>
              <MicIcon />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
}

export default Body;
