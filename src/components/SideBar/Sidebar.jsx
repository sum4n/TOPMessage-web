import { useState } from "react";
import styles from "./Sidebar.module.css";
import UserProfile from "../UserProfile/UserProfile";
import ChatList from "../ChatList/ChatList";
import { useNavigate } from "react-router";

function Sidebar({ user, chats, loading, error }) {
  const [barState, setBarState] = useState("chats");

  const navigate = useNavigate();

  function handleClick(e) {
    // console.log(e.currentTarget.id);
    setBarState(e.currentTarget.id);
  }

  function handleLogout() {
    localStorage.removeItem("jwt-token");
    navigate("/login");
  }

  return (
    <>
      <div className={styles.sidebarContainer}>
        <ul className={styles.sidebarNavigation}>
          <li onClick={handleClick} id="chats">
            <img
              title="Chats"
              className={`${styles.sidebarIcon} ${barState === "chats" && styles.sidebarSelected}`}
              src="/public/icons/message.svg"
              alt="message"
            />
          </li>
          <li>
            <img
              title="Friends"
              className={styles.sidebarIcon}
              src="/public/icons/friends.svg"
              alt="friends"
            />
          </li>
          <li>
            <img
              title="Groups"
              className={styles.sidebarIcon}
              src="/public/icons/groups.svg"
              alt="groups"
            />
          </li>
        </ul>
        <ul className={styles.sidebarUserLinks}>
          <li id="profile" onClick={handleClick}>
            <img
              title="Profile"
              className={`${styles.sidebarIcon} ${barState === "profile" && styles.sidebarSelected}`}
              src="/public/icons/profile.svg"
              alt="profile"
            />
          </li>
          <li onClick={handleLogout}>
            <img
              title="Logout"
              className={styles.sidebarIcon}
              src="/public/icons/logout.svg"
              alt="logout"
            />
          </li>
        </ul>
      </div>
      {barState === "profile" && <UserProfile user={user} />}
      {barState === "chats" && (
        <ChatList user={user} chats={chats} loading={loading} error={error} />
      )}
    </>
  );
}

export default Sidebar;
