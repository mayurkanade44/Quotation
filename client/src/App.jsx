import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Admin,
  AllQuotation,
  EditQuotation,
  NewQuotation,
  SingleQuotation,
} from "./pages";
import { Navbar } from "./components";

function App() {
  const Layout = () => {
    return (
      <>
        <ToastContainer position="top-center" autoClose={2000} />
        <Navbar />
        <Outlet />
      </>
    );
  };
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/quotations" element={<AllQuotation />} />
        <Route path="/new-quotation" element={<NewQuotation />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/quotation-details/:id" element={<SingleQuotation />} />
        <Route path="/edit-quotation/:id" element={<EditQuotation />} />
      </Route>
    )
  );
  return <RouterProvider router={Router} />;
}

export default App;
