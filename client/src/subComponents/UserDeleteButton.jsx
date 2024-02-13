import { useNavigate } from "react-router-dom";
export default function UserDeleteButton() {
  const navigate = useNavigate();
  // Deletes user based on ID
  async function userDeleteFetch() {
    const userId = sessionStorage.getItem("user");
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId:userId}),
      });
      if (!response.ok) {
        const parsedResponse = await response.json();
        console.log(parsedResponse.error);
      } else {
        // removes sessionStorage if successful
        sessionStorage.removeItem("user");
        navigate("/auth/login");
      }
    } catch (err) {
      console.log(err);
    }
  }
  // Gives prompt to confirm deletion
  function handeClick() {
    const isTrue = confirm("Do you really want to delete your account?");
    if (isTrue) {
      userDeleteFetch();
    }
  }
  return (
    <button className="btn btn-danger mx-2" onClick={handeClick}>
      Delete Account
    </button>
  );
}
