import { Button } from "../components";
import { useAllQuotationQuery } from "../redux/quotationSlice";
import { Link } from "react-router-dom";

const AllQuotation = () => {
  const { data: allQuotation, isLoading } = useAllQuotationQuery({
    search: "",
  });

  return (
    <div className="container">
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
            {allQuotation?.map((contract) => (
              <tr
                key={contract._id}
                className="h-12 text-sm leading-none text-gray-700 border-b dark:border-neutral-500 bg-white hover:bg-gray-100"
              >
                <td className="px-3 border-r font-normal dark:border-neutral-500">
                  {contract.number}
                </td>
                <td className="px-3 border-r font-normal text-center dark:border-neutral-500">
                  {contract.createdAt}
                </td>
                <td className="px-3 border-r font-normal dark:border-neutral-500">
                  {contract.billToDetails.name}
                </td>
                <td className="px-3 border-r font-normal dark:border-neutral-500">
                  {contract.salesName.label}
                </td>

                <td className="px-3 border-r font-normal text-center dark:border-neutral-500">
                  <Link to={`/contract-details/${contract._id}`}>
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
