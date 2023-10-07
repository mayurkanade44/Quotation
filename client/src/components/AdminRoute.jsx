import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminSidebar from "./AdminSidebar";

const AdminRoute = () => {
  return (
    <div className="w-full h-screen bg-gray-200">
      <div className="flex">
        <AdminSidebar />
        <Outlet />
      </div>
    </div>
  );
};
export default AdminRoute;
