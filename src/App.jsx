import "./App.css";
import SideBar from "./components/SideBar/Sidebar.jsx";
import { Link } from "react-router";

function App() {
  let user = [];

  if (user.length == 0) {
    return (
      <>
        <SideBar />
        <div>
          <p>
            New user? <Link to="register">Register</Link>
          </p>
          <p>
            Already an user <Link to="login">Login</Link>
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <SideBar />
    </>
  );
}

export default App;
