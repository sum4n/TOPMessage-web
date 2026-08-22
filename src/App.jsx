import { useEffect, useState } from "react";
import "./App.css";
import SideBar from "./components/SideBar/Sidebar.jsx";
import { Link } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const token = localStorage.getItem("jwt-token");

  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

  const [profileUpdating, setProfileUpdating] = useState(false);
  const [profileUpdateError, setProfileUpdateError] = useState(null);
  const [profileUpdatingGeneralError, setProfileUpdatingGeneralError] =
    useState(null);

  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [chatsError, setChatsError] = useState(null);

  function updateProfile(name) {
    setProfileUpdateError(null);
    setProfileUpdatingGeneralError(null);
    setProfileUpdating(true);

    return fetch(`${API_URL}/users/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.errors) {
          setProfileUpdateError(data.errors);
          return false;
        } else {
          setProfile(data.profile);
          setProfileUpdateError(null);
          return true;
        }
      })
      .catch(() => {
        setProfileUpdatingGeneralError("Network error");
        return false;
      })
      .finally(() => setProfileUpdating(false));
  }

  useEffect(() => {
    fetch(`${API_URL}/users/profile`, {
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
        setProfile(data.user);
      })
      .catch((error) => setProfileError(error))
      .finally(() => setProfileLoading(false));

    fetch(`${API_URL}/users/chats`, {
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

  if (profileLoading) return <p>Loading...</p>;

  return (
    <>
      {profile === null && (
        <div>
          <p>
            New user? <Link to="register">Register</Link>
          </p>
          <p>
            Already an user <Link to="login">Login</Link>
          </p>
        </div>
      )}
      {profile && (
        <>
          <SideBar
            profile={profile}
            chats={chats}
            loading={chatsLoading}
            error={chatsError}
            profileUpdatingGeneralError={profileUpdatingGeneralError}
            updateProfile={updateProfile}
            profileUpdating={profileUpdating}
            profileUpdateError={profileUpdateError}
          />
        </>
      )}
    </>
  );
}

export default App;
