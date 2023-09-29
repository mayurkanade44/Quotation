import { Button } from "../components";
import { useAllQuotationQuery } from "../redux/quotationSlice";
import { Link, useNavigate } from "react-router-dom";
import { dateFormat } from "../utils/functionHelper";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { clearQuotationEdit } from "../redux/helperSlice";
import { useDispatch } from "react-redux";

const AllQuotation = () => {
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: allQuotation, isLoading } = useAllQuotationQuery({
    search,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(tempSearch);
  };

  const clearSearch = () => {
    setTempSearch("");
    setSearch("");
  };

  const redirectNewQuotation = () => {
    dispatch(clearQuotationEdit());
    navigate("/new-quotation");
  };

  return (
    <div className="container">
      <div className="px-2 mt-24 lg:my-5">
        <div className="md:flex items-center justify-between">
          <p className=" text-center  lg:text-2xl font-bold leading-normal text-gray-800">
            All Quotation
          </p>
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="flex items-center px-1 bg-white border md:w-52 lg:w-80 rounded border-gray-300 mr-3">
              <AiOutlineSearch />
              <input
                type="text"
                className="py-1 md:py-1.5 pl-1 w-full focus:outline-none text-sm rounded text-gray-600 placeholder-gray-500"
                placeholder="Search..."
                value={tempSearch}
                onChange={(e) => setTempSearch(e.target.value)}
              />
              {tempSearch && (
                <button type="button" onClick={clearSearch}>
                  <AiOutlineClose color="red" />
                </button>
              )}
            </div>
            <Button
              type="submit"
              label="Search"
              color="bg-black"
              height="h-8"
            />
          </form>
          <div className="flex items-end justify-around mt-4 md:mt-0 md:ml-3 lg:ml-0">
            <button
              onClick={redirectNewQuotation}
              className="inline-flex mx-1.5 items-start justify-start px-4 py-3 bg-cyan-500 hover:bg-cyan-600 rounded"
            >
              <p className="text-sm font-medium leading-none text-white">
                Add New Quotation
              </p>
            </button>
          </div>
        </div>
      </div>
      {allQuotation?.length === 0 && (
        <h6 className="text-red-500 text-xl font-semibold text-center mb-2">
          No Quotation Found
        </h6>
      )}
      <div className="overflow-y-auto my-4">
        <table className="w-full border whitespace-nowrap  dark:border-neutral-500">
          <thead>
            <tr className="h-12 w-full text-md leading-none text-gray-600">
              <th className="font-bold text-left  dark:border-neutral-800 border-2 w-20 px-3">
                Quotation No
              </th>
              <th className="font-bold text-center  dark:border-neutral-800 border-2 w-28 px-3">
                Created At
              </th>
              <th className="font-bold text-left  dark:border-neutral-800 border-2 px-3">
                Bill To Name
              </th>
              <th className="font-bold text-left  dark:border-neutral-800 border-2 px-3">
                Sales Representative
              </th>
              <th className="font-bold text-center  dark:border-neutral-800 border-2 w-28 px-3">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {allQuotation?.map((quotation) => (
              <tr
                key={quotation._id}
                className="h-12 text-sm leading-none text-gray-700 border-b dark:border-neutral-500 bg-white hover:bg-gray-100"
              >
                <td className="px-3 border-r font-normal dark:border-neutral-500">
                  {quotation.number}
                </td>
                <td className="px-3 border-r font-normal text-center dark:border-neutral-500">
                  {dateFormat(quotation.createdAt)}
                </td>
                <td className="px-3 border-r font-normal dark:border-neutral-500">
                  {quotation.billToDetails.name}
                </td>
                <td className="px-3 border-r font-normal dark:border-neutral-500">
                  {quotation.salesName.label}
                </td>

                <td className="px-3 border-r font-normal text-center dark:border-neutral-500">
                  <Link to={`/quotation-details/${quotation._id}`}>
                    <Button label="Details" height="py-2" width="w-20" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AllQuotation;
