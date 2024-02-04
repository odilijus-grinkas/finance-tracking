import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Test from "./finance/Index";
import Test2 from "./finance/Test2"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Test />} />
      <Route path="/test2" element={<Test2/>}/>
    </>
  )
);

export default function MainRouter() {
  return <RouterProvider router={router} />;
}
