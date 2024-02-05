import Header from '../sharedComponents/Header'
import { Outlet, Link } from "react-router-dom";

export default function Index(){
  return(
    <>
      <Header/>
      <div>Balance</div>
      <div>
        <Link to="/group">Groups</Link>
      </div>
      <div>
        <Link to="/cash/income">Income</Link>
        <Link to="/cash/expense">Expense</Link>
      </div>
      <div>
        <Outlet/>
      </div>
  </>
  );
}