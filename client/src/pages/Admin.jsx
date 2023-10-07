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
    <div className="container">
      <h1>Mayur</h1>
    </div>
  );
};
export default Admin;
