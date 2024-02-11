export default function Header(){
  return (
    <header className="d-flex justify-content-between">
      <div className="mx-5">
        <img src="../public/logo.png" alt="logo" style={{ height: "5em" }} />
      </div>
      <nav className="mx-5 d-flex align-items-center">
        <ul className="list-unstyled d-flex text-nowrap justify-content-between">
          <li>
            <a href="/login" className="btn btn-primary">Log In</a>
          </li>
          <li>
            <a href="/signup" className="btn btn-warning">Sign Up</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}