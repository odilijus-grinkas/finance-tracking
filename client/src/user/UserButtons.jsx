import { useNavigate } from "react-router-dom";
export default function UserButtons() {
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
        body: JSON.stringify({ userId: userId }),
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
  function handeDeleteClick() {
    const isTrue = confirm("Do you really want to delete your account?");
    if (isTrue) {
      userDeleteFetch();
    }
  }
  // Logout button removes from session & navigates to auth
  function handleLogoutClick() {
    sessionStorage.removeItem("user");
    navigate("/auth/login");
  }
  return (
    <div className="d-flex flex-column">
      <button className="btn btn-warning" onClick={handleLogoutClick}>
        Log Out
      </button>
      <button className="btn btn-danger my-2" onClick={handeDeleteClick}>
        Delete Account
      </button>
    </div>
  );
}
