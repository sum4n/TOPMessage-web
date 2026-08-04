import { useEffect, useState } from "react";
import "./App.css";
import SideBar from "./components/SideBar/Sidebar.jsx";
import { Link } from "react-router";
import ChatList from "./components/ChatList/ChatList.jsx";

function App() {
  const token = localStorage.getItem("jwt-token");

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);

  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [chatsError, setChatsError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // console.log(response);
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        // setUser(data.user.email);
        setUser(data.user);
      })
      .catch((error) => setUserError(error))
      .finally(() => setUserLoading(false));

    fetch("http://localhost:3000/users/chats", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // console.log(response);
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setChats(data.users);
      })
      .catch((error) => setChatsError(error))
      .finally(() => setChatsLoading(false));
  }, [token]);

  if (userLoading) return <p>Loading...</p>;

  return (
    <>
      <SideBar />
      {user === null && (
        <div>
          <p>
            New user? <Link to="register">Register</Link>
          </p>
          <p>
            Already an user <Link to="login">Login</Link>
          </p>
        </div>
      )}
      {user && (
        <>
          <ChatList
            user={user}
            chats={chats}
            loading={chatsLoading}
            error={chatsError}
          />
        </>
      )}
    </>
  );
}

export default App;
