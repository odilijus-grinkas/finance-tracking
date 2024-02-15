import { Outlet, Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "../sharedComponents/Header";
import UserButtons from "../user/UserButtons";
import "../styles/Index.css";

export default function Index() {
  const { from, to } = useParams();
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");
  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    } else {
      navigate("/cash/income")
    }
  }, []);
  return (
    <div className="index-wrap">
      <Header />
      {user ? (
        <div className="container d-flex justify-content-center">
          {/* Left panel section */}
          <div className="left-panel">
            <div className="balanceArea">
              {/* <Balance userId={user}/> */}
            </div>
            {/* Income/Expenses buttons that load specific cashflow */}
            <div>
              <Link
                to={
                  from && to
                    ? `cash/income/${user}/${from}/${to}`
                    : "/cash/income"
                }
                className="btn btn-outline-success container"
              >
                Income
              </Link>
              <Link
                to={
                  from && to
                    ? `cash/expense/${user}/${from}/${to}`
                    : "/cash/expense"
                }
                className="btn btn-outline-danger container my-2"
              >
                Expenses
              </Link>
            </div>
            <div className="my-5">
            <UserButtons />
            </div>
          </div>
          {/* Right panel section */}
          <div className="right-panel">
            <Outlet />
          </div>
        </div>
      ) : (
        // Added to prevent flashing screen when redirecting
        <div className="spinner-border"></div>
      )}
    </div>
  );
}
