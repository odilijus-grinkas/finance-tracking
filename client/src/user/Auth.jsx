import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Header from "../sharedComponents/Header";
import "../styles/backgrounds.css";
import "../styles/form.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [path, setPath] = useState(undefined); // should read login or register
  const [issues, setIssues] = useState(false);
  const [successfulSignup, setSuccessfulSignup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  if (sessionStorage.getItem("user")) {
    navigate("/");
  }
  // Read URL and set path to login/register
  function setUrlPath() {
    const path = location.pathname.split("/").pop();
    setPath(path);
  }

  // determine which button should look like the selected one
  function buttonBorder(authType) {
    const decorations = "text-decoration-none text-light px-1 py-1";
    if (authType == path) {
      return decorations + " border-auth";
    } else {
      return decorations;
    }
  }

  // Email Validation
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function formValidation() {
    let newIssue = false;
    // check email validity
    if (!isValidEmail(formData.email)) {
      newIssue = "Please enter a valid email.";
      // check if password empty
    } else if (formData.password == "") {
      newIssue = "Password cannot be empty.";
      // check if password is > 5 chars (if signing up)
    } else if (path == "signup" && formData.password.length < 5) {
      newIssue = "Password cannot be shorter than 5 characters.";
    }
    return newIssue;
  }

  // update form & remove issues/successful signup check
  function handleChange(event) {
    const name = event.target.name;
    const val = event.target.value;
    setFormData((values) => ({ ...values, [name]: val }));
    setSuccessfulSignup(false);
    setIssues(false);
  }
  // send login or register information based on path
  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3001/" + path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const parsedResponse = await response.json();
      if (!response.ok) {
        setIssues(parsedResponse.error);
      } else if (response.ok) {
        if (path == "login") {
          sessionStorage.setItem("user", parsedResponse.id);
          navigate("/");
        } else if (path == "signup") {
          setSuccessfulSignup(true); // only if server responds with success
          setFormData({ email: "", password: "" });
        }
      }
    } catch (err) {
      setIssues("Server issue.");
      console.log(err);
    }
  }

  // What happens when submit button is pressed
  async function handleSubmit(event) {
    event.preventDefault();

    const newIssue = formValidation();
    setIssues(newIssue);
    if (!newIssue) {
      fetchData();
    }
  }
  useEffect(() => {
    setUrlPath();
    setIssues(false); // remove issues message if switching auth path
    setSuccessfulSignup(false); // remove successful signup message if switching path
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return path ? (
    <>
      <div data-bs-theme="dark" className="main-form container">
        <Header path={path} className="" />
        <div className="d-flex justify-content-center">
          <Link
            to="/auth/login"
            className={buttonBorder("login") + " auth-button"}
          >
            <h2 className="mx-2 px-1 pt-1">Log In</h2>
          </Link>
          <Link
            to="/auth/signup"
            className={buttonBorder("signup") + " auth-button"}
          >
            <h2 className="px-2 pt-1">Sign Up</h2>
          </Link>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="container">
            <div className="border border-dark container my-2"></div>
            {/* Email section */}
            <div>
              <div>Email Address:</div>
              <input
                className="form-control"
                type="text"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            {/* Password section */}
            <div>
              <div>Password:</div>
              <input
                className="form-control"
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            {/* Issue warning bar */}
            {issues ? (
              <div className="alert alert-warning mt-3">{issues}</div>
            ) : null}
            {/* Successful signup bar */}
            {successfulSignup && !issues ? (
              <div className="alert alert-success">
                You have successfully created an account! Please log in
              </div>
            ) : null}
            {/* Submit button */}
            <div className="py-3">
              <input
                type="submit"
                value={path == "login" ? "Log In" : "Sign Up"}
                className="btn btn-primary my-2 container-sm"
              />
            </div>
            {/* Password recovery button, if on login page */}
            {path == "login" ? (
              <div className="text-center py-3">
                Forgot password? <Link to="#">Reset Password</Link>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </>
  ) : (
    <div className="text-center">
      <div className="spinner-border"></div>
    </div>
  );
}
