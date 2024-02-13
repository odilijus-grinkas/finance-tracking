import { useNavigate, Link } from "react-router-dom";
import "../styles/header.css"

// eslint-disable-next-line react/prop-types
export default function Header({ path }) {
  const navigate = useNavigate();
  function handleClick() {
    sessionStorage.removeItem("user");
    navigate("/auth/login");
  }
  return (
    <header className={ path ?  "d-flex justify-content-center" : "d-flex justify-content-between"}>
    {/*<header className="">*/}
      <div className="d-flex justify-content-around">
        <Link to="/">
          <img src="/logo.png" alt="logo" style={{ height: "5em" }} />
        </Link>
        <div className="logo-text">Finance Tracking App ✨</div>
      </div>
      <nav className="d-flex align-items-center">
        {/* Check if logged in - display Log Out, else display Log In & Sign Up. If in Login page, remove buttons. */}
        {sessionStorage.getItem("user") ? (
          <button className="btn btn-warning" onClick={handleClick}>
            Log Out
          </button>
        ) : path ? null : (
          <ul className="list-unstyled d-flex text-nowrap justify-content-between">
            <li>
              <Link to="/auth/login" className="btn btn-primary">
                Log In
              </Link>
            </li>
            <li>
              <Link to="/auth/signup" className="btn btn-warning">
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
