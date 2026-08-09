import { Link } from "react-router";

function ErrorPage() {
  return (
    <div>
      <h1>Oh no, this route does not exist!</h1>
      <Link to="/">Go to home page</Link>
    </div>
  );
}

export default ErrorPage;
