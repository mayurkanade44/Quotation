import { Button } from "../components";
import { useAllQuotationQuery } from "../redux/quotationSlice";
import { Link } from "react-router-dom";
import { dateFormat } from "../utils/functionHelper";

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
