import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Index from "./finance/Index";
import Auth from "./user/Auth";
import NoPage from "./sharedComponents/NoPage";
import Cashflow from "./finance/Cashflow";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Index/>}>
        <Route path="/cash/:flow" element={<Cashflow/>}/>
      </Route>
      <Route path="/auth/login" element={<Auth/>}/>
      <Route path="/auth/signup" element={<Auth/>}/>
      <Route path="/*" element={<NoPage/>}/>
    </>
  )
);

export default function MainRouter() {
  return <RouterProvider router={router} />;
}
