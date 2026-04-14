import styles from "./UsersAndGroups.module.css";
import { useEffect, useState } from "react";

function UsersAndGroups() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((response) => {
        console.log(response.users);
        setUsers(response.users);
      })
      .catch((error) => console.error(error));
  }, []);

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
