import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Quotation from "./pages/Quotation";
import NewQuotation from "./pages/NewQuotation";

function App() {
  const Layout = () => {
    return (
      <>
        <ToastContainer position="top-center" autoClose={2000} />
        <Outlet />
      </>
    );
  };
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/new-quotation" element={<Quotation />} />
        <Route path="/quotation" element={<NewQuotation />} />
      </Route>
    )
  );
  return <RouterProvider router={Router} />;
}

export default App;
