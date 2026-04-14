import styles from "./UsersAndGroups.module.css";
import { useEffect, useState } from "react";

function UsersAndGroups() {
  const [users, setUsers] = useState([]);

  return (
    <div className={styles.userAndGrpContainer}>
      Users and groups
      <ul>
        {users.length > 0 &&
          users.map((user) => {
            return (
              <li className={styles.userList} key={user.id}>
                {user.username}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default UsersAndGroups;
