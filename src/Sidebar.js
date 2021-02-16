import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Chats from "./Chats";
import SidebarUsers from "./SidebarUsers";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import ClearIcon from "@material-ui/icons/Clear";
function Sidebar() {
  const [users, setUsers] = useState([]);
  const [{ user, allUser }] = useStateValue();
  const [chats, setChats] = useState([]);
  const inputRef = useRef();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!user) {
      return;
    }
    const unsubscribe = db
      .collection("chats")
      .doc("users")
      .collection(user.uid)
      .onSnapshot((snapshot) => {
        setChats(snapshot.docs.map((doc) => doc.data()));
      });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleChange = (e) => {
    var search = e.target.value;
    search = search.toLowerCase();
    setUsers([]);
    setShow(true);
    var tempOption = [];
    allUser?.forEach((_user) => {
      if (
        _user.data().name.toLowerCase().search(search) !== -1 &&
        search !== "" &&
        _user.data().uid !== user.uid
      ) {
        tempOption.push(_user.data());
      }
    });
    setUsers(tempOption);
  };

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar />
        <div className="sidebar_headerIcons">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContents">
          <SearchIcon />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search or start a new chat"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <IconButton
            onClick={() => {
              inputRef.current.value = "";
              setShow(false);
            }}
          >
            <ClearIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_chats">
        {show && users.length !== 0 && (
          <div className="sidebar_users">
            {users.map((user) => {
              return <SidebarUsers key={user.uid} chatUser={user} />;
            })}
          </div>
        )}
        {/* {chats && <h1>Hello</h1>} */}
        {chats.map((chat) => {
          return <Chats chatUser={chat} key={chat?.uid} />;
        })}
      </div>
      <div></div>
    </div>
  );
}

export default Sidebar;
