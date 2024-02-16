import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PassRecoverToken() {
  const { token } = useParams();
  const navigate = useNavigate();
  async function isTokenValid() {
    try {
      const response = await fetch("http://localhost:3001/token/" + token);
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  // Checks if token is valid, else sends to login page.
  useEffect(() => {
    // send token and check if valid
    async function redirect(){
      if (await isTokenValid()){
        return
      } else {
        navigate("/auth/login");
      }
    }
    redirect();
  }, []);
  return <div>Pass recover</div>;
}
