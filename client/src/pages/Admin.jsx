import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

const Admin = () => {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [menu1, setMenu1] = useState(false);
  const [menu2, setMenu2] = useState(false);
  const [menu3, setMenu3] = useState(false);
  return (
    <div>
      <>
        <div className="w-full h-screen bg-gray-200">
          <div className="flex">
            <AdminSidebar />
            <div className="container">
              <h1>Mayur</h1>
            </div>
            {/* Sidebar starts */}

            {/*Mobile responsive sidebar*/}

            {/*Mobile responsive sidebar*/}
            {/* Sidebar ends */}
          </div>
        </div>
      </>
    </div>
  );
};
export default Admin;
