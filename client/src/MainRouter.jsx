import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Index from "./finance/Index";
import Login from "./user/Login";
import Signup from "./user/Signup";
import NoPage from "./sharedComponents/NoPage";
import Cashflow from "./finance/Cashflow";
import Group from "./finance/Group";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Index/>}>
        <Route path="/cash/:flow" element={<Cashflow/>}/>
        <Route path="/group" element={<Group/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/*" element={<NoPage/>}/>
    </>
  )
);

export default function MainRouter() {
  return <RouterProvider router={router} />;
}
