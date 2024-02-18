import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PassRecoverToken() {
  const { token } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  async function isTokenValid() {
    try {
      const response = await fetch("http://localhost:3001/token/" + token);
      if (response.ok) {
        const parsed = await response.json();
        setFormData((oldData) => {
          return { ...oldData, userId: parsed.id };
        });
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  function handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    setFormData((oldData) => {
      return { ...oldData, [name]: val };
    });
  }
  async function submitHandler(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...formData}),
    });
    if (response.ok){
      window.alert("Password successfully changed");
      navigate("/auth/login");
    } else {
      const parsed = response.json();
      window.alert(parsed.error);
    }
  }
  // Checks if token is valid, else sends to login page.
  useEffect(() => {
    // send token and check if valid
    async function redirect() {
      if (await isTokenValid()) {
        return;
      } else {
        navigate("/auth/login");
      }
    }
    redirect();
  }, []);
  return (
    <div className="container w-25">
      <div className="text-center">
        {" "}
        <h1>Enter New Password</h1>
      </div>
      <form onSubmit={(e) => submitHandler(e)}>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="form-control my-2"
        />
        <input type="submit" value="Change Password" className="form-control" />
      </form>
    </div>
  );
}
