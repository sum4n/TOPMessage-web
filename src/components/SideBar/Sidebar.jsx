import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebarContainer}>
      <ul className={styles.sidebarNavigation}>
        <li>
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
        <li>
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
  );
}

export default Sidebar;
