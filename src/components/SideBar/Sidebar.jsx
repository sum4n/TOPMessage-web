import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebarContainer}>
      <ul className={styles.sidebarNavigation}>
        <li>
          <img src="/public/icons/message.svg" alt="" />
        </li>
        <li>
          <img src="/public/icons/friends.svg" alt="" />
        </li>
        <li>
          <img src="/public/icons/groups.svg" alt="" />
        </li>
      </ul>
      <ul className={styles.sidebarUserLinks}>
        <li>
          <img src="/public/icons/profile.svg" alt="" />
        </li>
        <li>
          <img src="/public/icons/logout.svg" alt="" />
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
