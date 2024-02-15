import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Index from "./finance/Index";
import Auth from "./user/Auth";
import PassRecover from "./user/PassRecover";
import NoPage from "./sharedComponents/NoPage";
import Cashflow from "./finance/Cashflow";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Index/>}>
        <Route path="/cash/:flow" element={<Cashflow/>}/>
        <Route path="/cash/:flow/:id/:from/:to" element={<Cashflow/>}/>
      </Route>
      <Route path="/auth/login" element={<Auth/>}/>
      <Route path="/auth/signup" element={<Auth/>}/>
      <Route path="/auth/password_recovery" element={<PassRecover/>}/>
      <Route path="/*" element={<NoPage/>}/>
    </>
  )
);

export default function MainRouter() {
  return <RouterProvider router={router} />;
}
