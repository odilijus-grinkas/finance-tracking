import Header from '../sharedComponents/Header'
import { Outlet, Link } from "react-router-dom";

export default function Index(){
  return(
    <>
      <Header/>
      <div>Balance</div>
      <div>
        <Link to="/group" className="btn btn-outline-secondary">Groups</Link>
      </div>
      <div>
        {/* CashFlow components are loaded here */}
        <Link to="/cash/income" className="btn btn-outline-success">Income</Link>
        <Link to="/cash/expense" className="btn btn-outline-danger">Expense</Link>
      </div>
      <div>
        <Outlet/>
      </div>
  </>
  );
}