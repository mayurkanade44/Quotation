import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineFilePdf,
  AiOutlineCloseCircle,
  AiOutlineMenu,
  AiOutlineDown,
} from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { FcDocument } from "react-icons/fc";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const navData = [
  {
    name: "Admin",
    link: "/admin",
    icon: <AiOutlineHome className="mr-2 w-5 h-5" />,
  },
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <RxDashboard className="mr-2 w-4 h-4" />,
  },
  {
    name: "Quotations",
    link: "/quotations",
    icon: <FcDocument className="mr-2 w-5 h-5" />,
  },
  {
    name: "Contracts",
    link: "/dashboard",
    icon: <AiOutlineFilePdf className="mr-2 w-5 h-5 text-red-400" />,
  },
];

const Navbar = () => {
  const [profile, setProfile] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <div className="fixed top-0 z-10 w-full">
      {/* Navigation starts */}
      <nav className="h-16 flex items-center lg:items-stretch justify-center lg:justify-between bg-gray-50 shadow z-10   ">
        <div className="hidden lg:flex w-full pr-6">
          <div className="w-1/3 h-full hidden lg:flex items-center pl-6 pr-24">
            Ecporn Portal
          </div>
          <div className="w-1/3 hidden lg:flex">
            <div className="w-full flex items-center justify-center">
              {navData.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className="flex px-5 items-center py-6 text-md leading-5 text-black hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-1/3 hidden lg:flex">
            <div className="w-full flex items-center justify-end pl-8">
              <div
                className="flex items-center relative cursor-pointer"
                onClick={() => setProfile(!profile)}
              >
                <div className="rounded-full">
                  {profile ? (
                    <ul className="p-2 w-full border-r bg-white absolute rounded left-0 shadow mt-12 sm:mt-[33px] ">
                      <li className="flex w-full justify-between text-gray-600 hover:text-red-700 cursor-pointer items-center">
                        <div className="flex items-center">
                          <GrLogout className="text-red-600" />
                          <span className="text-md ml-2">Sign out</span>
                        </div>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
                <p className="text-gray-800 text-lg mx-3">Jane Doe</p>
                <AiOutlineDown className="mr-2" />
              </div>
            </div>
          </div>
        </div>
        <div className="text-gray-600 mr-8 visible lg:hidden relative">
          <div className="flex justify-between gap-x-5">
            <h1 className="ml-5">Epcorn Portal</h1>
            <button onClick={() => setShow(!show)}>
              <AiOutlineMenu className="h-6 w-6 text-blue-600" />
            </button>
          </div>
        </div>
      </nav>

      {/*Mobile responsive sidebar*/}
      <div
        className={
          show
            ? "w-full h-full fixed top-0 z-10  transform  translate-x-0 "
            : "  w-full h-full fixed top-0 z-10  transform -translate-x-full"
        }
        id="mobile-nav"
      >
        <div
          className="bg-gray-800 opacity-50 absolute h-full w-full lg:hidden"
          onClick={() => setShow(!show)}
        />
        <div className="absolute z-40 sm:relative w-64 shadow bg-gray-100 lg:hidden transition duration-150 ease-in-out h-full">
          <div className="flex flex-col justify-between h-full w-full">
            <div>
              <div className="flex justify-between px-5">
                <ul aria-orientation="vertical">
                  {navData.map((item) => (
                    <li
                      key={item.name}
                      className="cursor-pointer text-sm leading-3 tracking-normal pb-4 pt-5 text-indigo-700 focus:text-indigo-700 focus:outline-none"
                    >
                      <Link
                        key={item.name}
                        to={item.link}
                        className="flex items-center px-2 xl:text-base md:text-xl text-base"
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <button className="flex mt-5" onClick={() => setShow(!show)}>
                  <AiOutlineCloseCircle className="h-6 w-6 text-red-500" />
                </button>
              </div>
            </div>
            {/* <div className="w-full">
                <div className="flex justify-center mb-4 w-full px-6"></div>
                <div className="border-t border-gray-300">
                  <div className="w-full flex items-center justify-between px-6 pt-1">
                    <div className="flex items-center">
                      <img
                        alt="profile-pic"
                        src="https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png"
                        className="w-8 h-8 rounded-md"
                      />
                      <p className="md:text-xl text-gray-800 text-base leading-4 ml-2">
                        Jane Doe
                      </p>
                    </div>
                    <ul className="flex">
                      <li className="cursor-pointer text-white pt-5 pb-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-messages"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="#718096"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                          <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                        </svg>
                      </li>
                      <li className="cursor-pointer text-white pt-5 pb-3 pl-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-bell"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="#718096"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                        </svg>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
          </div>
        </div>
      </div>
      {/* Navigation ends */}
      {/* Remove class [ h-64 ] when adding a card block */}
    </div>
  );
};
export default Navbar;
