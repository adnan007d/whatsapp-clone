import "./App.css";
import Body from "./Body";
import db, { auth } from "./firebase";
import Landing from "./Landing";
import Sidebar from "./Sidebar";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { useEffect } from "react";
function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        async function fetchData() {
          await db
            .collection("users")
            .doc(authUser.uid)
            .get()
            .then((doc) => {
              dispatch({
                type: actionTypes.SET_USER,
                user: doc.data(),
              });
            });

          await db
            .collection("users")
            .where("uid", "!=", authUser.uid)
            .onSnapshot((snapshot) => {
              dispatch({
                type: actionTypes.SET_ALL_USERS,
                allUser: snapshot.docs.slice(),
              });
            });
        }
        fetchData();
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar /> <Body />
        </>
      ) : (
        <Landing />
      )}
    </div>
  );
}

export default App;
