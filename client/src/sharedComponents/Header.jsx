import "../styles/header.css";

// eslint-disable-next-line react/prop-types
export default function Header({ path }) {
  return (
    <header
    // Depending on path, will move header to another spot
      className={
        path
          ? "d-flex justify-content-center"
          : "container my-3"
      }
    >
      <div className="full-logo">
        <img src="/logo.png" alt="logo" className="logo-img" />
        <div className="logo-hr container"></div>
        <div className="logo-text">Finance Tracker</div>
      </div>
    </header>
  );
}
