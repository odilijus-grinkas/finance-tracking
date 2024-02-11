import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Header from "../sharedComponents/Header";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [path, setPath] = useState(undefined); // should read login or register
  const [issues, setIssues] = useState(false);
  const [successfulSignup, setSuccessfulSignup] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  // Read URL and set path to login/register
  function setUrlPath() {
    const path = location.pathname.split("/").pop();
    setPath(path);
  }

  // determine which button should look like the selected one
  function buttonBorder(authType) {
    const decorations = "text-decoration-none px-1 py-1";
    if (authType == path) {
      return decorations + " border border-primary rounded";
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

  // update form & remove issues/successful login check
  function handleChange(event) {
    const name = event.target.name;
    const val = event.target.value;
    setFormData((values) => ({ ...values, [name]: val }));
    setSuccessfulSignup(false);
    setIssues(false);
  }

  // What happens when submit button is pressed
  async function handleSubmit(event) {
    event.preventDefault();

    const newIssue = formValidation();
    setIssues(newIssue);

    if (!newIssue && path == "signup") {
      // send data to server
      setSuccessfulSignup(true); // only if server responds with success
      setFormData({ email: "", password: "" });
    } else if (!newIssue && path == "login") {
      // send login request to server
      try {
        const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const parsedResponse = await response.json();
        if (!response.ok) {
          console.log("Bad credentials");
          setIssues(parsedResponse.error);
        } else if (response.ok) {
          // sessionStorage.setItem("user", JSON.stringify(response.id));
          sessionStorage.setItem("user",parsedResponse.id)
          navigate("/");
        }

        // Handle successful response
      } catch (error) {
        console.error("Error sending form data: ", error.message);
      }
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
      <Header path={path} />
      <div>
        <Link to="/auth/login" className={buttonBorder("login")}>
          Log In
        </Link>
        <Link to="/auth/signup" className={buttonBorder("signup")}>
          Sign Up
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="container">
          Email Address:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={(e) => {handleChange(e);}}
          />
        </label>
        <label className="container">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => {handleChange(e);}}
          />
        </label>
        <div>
          {issues ? (
            <div className="font-italic bg-danger">{issues}</div>
          ) : null}
          {successfulSignup && !issues ? (
            <div className="bg-success">
              You have successfully created an account! Please log in
            </div>
          ) : null}
        </div>
        <input
          type="submit"
          value={path == "login" ? "Log In" : "Sign Up"}
          className="container"
        />
        {path == "login" ? (
          <div>
            Forgot password? <Link to="#">Reset Password</Link>
          </div>
        ) : null}
      </form>
    </>
  ) : (
    <div className="text-center">
      <div className="spinner-border"></div>
    </div>
  );
}
