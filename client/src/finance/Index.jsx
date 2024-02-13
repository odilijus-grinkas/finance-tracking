import { Outlet, Link } from "react-router-dom";
import Header from "../sharedComponents/Header";

export default function Index() {
  return (
    <>
      {sessionStorage.getItem("user") ? (
        <div className="container">
          <Header />
          <div>Balance</div>
          <div>
            <Link to="/group" className="btn btn-outline-secondary">
              Groups
            </Link>
          </div>
          <div>
            {/* CashFlow components are loaded here */}
            <Link to="/cash/income" className="btn btn-outline-success">
              Income
            </Link>
            <Link to="/cash/expense" className="btn btn-outline-danger">
              Expense
            </Link>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      ) : (
        <div>
          Log In or Sign Up to begin tracking your finances for FREE today! Try
          guest account: email: user@email.com password: pass
        </div>
      )}
    </>
  );
}
