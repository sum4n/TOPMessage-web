import { useState } from "react";
import styles from "./Sidebar.module.css";
import UserProfile from "../UserProfile/UserProfile";
import ChatList from "../ChatList/ChatList";

function Sidebar({ user, chats, loading, error }) {
  const [barState, setBarState] = useState("chats");

  function handleClick(e) {
    // console.log(e.currentTarget.id);
    setBarState(e.currentTarget.id);
  }

  return (
    <>
      <div className={styles.sidebarContainer}>
        <ul className={styles.sidebarNavigation}>
          <li onClick={handleClick} id="chats">
            <img
              className={styles.sidebarIcon}
              src="/public/icons/message.svg"
              alt="message"
            />
          </li>
          <li>
            <img
              className={styles.sidebarIcon}
              src="/public/icons/friends.svg"
              alt="friends"
            />
          </li>
          <li>
            <img
              className={styles.sidebarIcon}
              src="/public/icons/groups.svg"
              alt="groups"
            />
          </li>
        </ul>
        <ul className={styles.sidebarUserLinks}>
          <li id="profile" onClick={handleClick}>
            <img
              className={styles.sidebarIcon}
              src="/public/icons/profile.svg"
              alt="profile"
            />
          </li>
          <li>
            <img
              className={styles.sidebarIcon}
              src="/public/icons/logout.svg"
              alt="logout"
            />
          </li>
        </ul>
      </div>
      {barState == "profile" && <UserProfile />}
      {barState == "chats" && (
        <ChatList user={user} chats={chats} loading={loading} error={error} />
      )}
    </>
  );
}

export default Sidebar;
