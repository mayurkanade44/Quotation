import { FaUsersGear } from "react-icons/fa6";
import { AiFillSetting } from "react-icons/ai";
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";

const adminNav = [
  {
    name: "Users",
    icon: <FaUsersGear className="w-5 h-5" />,
  },
  {
    name: "Services",
    icon: <AiFillSetting className="w-5 h-5" />,
  },
  {
    name: "Documents",
    icon: <HiDocumentMagnifyingGlass className="w-5 h-5" />,
  },
];

const AdminSidebar = () => {
  return (
    <div className="w-60  h-screen bg-gray-700 hidden lg:block">
      <ul className="py-20">
        {adminNav.map((item) => (
          <li
            key={item.name}
            className="pl-6 cursor-pointer text-sm leading-3 tracking-normal py-5 text-white"
          >
            <div className="flex items-center">
              {item.icon}
              <span className="ml-2 text-[16px] font-medium tracking-wider hover:text-yellow-500">
                {item.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AdminSidebar;
