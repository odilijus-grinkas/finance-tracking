import { Link } from "react-router-dom";
export default function NoPage(){
  return(
    <div className="text-center">
      <h1>404</h1>
      <h1>Page Does Not Exist! 😢</h1>
      <h3><Link to="/">Return to main page</Link></h3>
    </div>
  );
}