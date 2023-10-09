import { useEffect, useState } from "react";
import { AlertMessage, Button, Loading } from "../components";
import AddServiceModal from "../components/Modals/AddServiceModal";
import { useGetAdminValuesQuery } from "../redux/adminSlice";

const projects = [
  {
    name: "Sales Person",
    initials: "GA",
    href: "#",
    members: 16,
    bgColor: "bg-pink-600",
  },
  {
    name: "All Business",
    initials: "CD",
    href: "#",
    members: 12,
    bgColor: "bg-purple-600",
  },
  {
    name: "Pest Control Services",
    initials: "T",
    href: "#",
    members: 16,
    bgColor: "bg-yellow-500",
  },
  {
    name: "Operator Comments",
    initials: "RC",
    href: "#",
    members: 8,
    bgColor: "bg-green-500",
  },
];

const Services = () => {
  const [service, setService] = useState("Sales Person");
  const { data, isLoading, error } = useGetAdminValuesQuery();

  return (
    <div className="container pr-5 lg:pr-0">
      {isLoading ? (
        <Loading />
      ) : (
        error && <AlertMessage>{error?.data?.msg || error.error}</AlertMessage>
      )}
      {data && (
        <>
          <h2 className="text-center text-3xl text-blue-400 font-bold mb-5">
            All Services
          </h2>
          <ul
            role="list"
            className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
          >
            {projects.map((project) => (
              <li
                key={project.name}
                className="col-span-1 flex rounded-md shadow-sm"
              >
                <div
                  className={`flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white ${project.bgColor}`}
                >
                  {project.initials}
                </div>
                <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                  <div className="flex-1 truncate px-4 py-2 text-sm">
                    <p className="font-medium text-gray-900 hover:text-gray-600">
                      {project.name}
                    </p>
                    <p className="text-gray-500">{project.members} Members</p>
                  </div>
                  <div className="flex-shrink-0 pr-2">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Open options</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="my-5 bg-white p-3">
            {service === "Sales Person" && (
              <>
                <div className="flex justify-around items-center">
                  <h3>All Sales Person</h3>
                  <AddServiceModal label="Add Sale Person" />
                </div>
                <div className="overflow-y-auto my-2">
                  <table className="w-full border whitespace-nowrap  dark:border-neutral-500">
                    <thead>
                      <tr className="h-8 w-full text-md leading-none text-gray-600">
                        <th className="font-bold text-left dark:border-neutral-800 border-2 w-20 px-3">
                          Full Name
                        </th>
                        <th className="font-bold text-left  dark:border-neutral-800 border-2 w-20 px-3">
                          Short Form
                        </th>
                        <th className="font-bold text-left  dark:border-neutral-800 border-2 w-20 px-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="w-full">
                      {data.salesPerson?.map((item) => (
                        <tr
                          key={item._id}
                          className="h-8 text-sm leading-none text-gray-700 border-b dark:border-neutral-500 bg-white hover:bg-gray-100"
                        >
                          <td className="px-3 border-r font-normal dark:border-neutral-500">
                            {item.salePerson.label}
                          </td>
                          <td className="px-3 border-r font-normal dark:border-neutral-500">
                            {item.salePerson.value}
                          </td>
                          <td className="px-3 border-r font-normal dark:border-neutral-500">
                            <AddServiceModal
                              label="Edit"
                              editData={item.salePerson}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Services;
