import { useParams, useNavigate } from "react-router-dom";
import { useSingleQuotationQuery } from "../redux/quotationSlice";
import { AlertMessage, Button, Loading } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setQuotationEdit } from "../redux/helperSlice";

const SingleQuotation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: quotation,
    isLoading: quotationLoading,
    error,
  } = useSingleQuotationQuery(id);

  const handleEditQuotation = ({ name, id, data }) => {
    const generalDetails = {
      number: quotation.number,
      salesName: quotation.salesName,
      referenceName: quotation.referenceName,
      otherReference: quotation.otherReference,
      business: quotation.business,
      payment: quotation.payment,
    };
    const billToDetails = quotation.billToDetails;
    const shipToDetails = quotation.shipToDetails;

    if (name === "generalDetails") {
      dispatch(setQuotationEdit({ name, id, data: generalDetails }));
    } else if (name === "billToDetails") {
      dispatch(setQuotationEdit({ name, id, data: quotation.billToDetails }));
    }

    navigate(`/edit-quotation/${id}`);
  };

  return (
    <div className="mx-10 my-5">
      {quotationLoading ? (
        <Loading />
      ) : (
        error && <AlertMessage>{error?.data?.msg || error.error}</AlertMessage>
      )}
      {quotation && (
        <>
          <div className="lg:grid lg:grid-cols-12 gap-x-4">
            <div className="col-span-4">
              <h1 className="text-[25px] font-bold text-center">
                Quotation Number: {quotation.number}
              </h1>
            </div>
            <Button label="Download" color="bg-green-600" />
            <Button label="Delete" color="bg-red-600" />
            <div className="col-span-12">
              <hr className="h-px my-2 border-0 dark:bg-gray-700" />
            </div>
            <div className="col-span-12">
              <div className="lg:flex items-center gap-x-6">
                <h5 className="text-lg">
                  <span className="font-semibold">Sales Representative: </span>
                  {quotation.salesName.label}
                </h5>
                <h5 className="text-lg">
                  <span className="font-semibold">Reference Person: </span>
                  {quotation.referenceName}
                </h5>
                <h5 className="text-lg">
                  <span className="font-semibold">Payment Terms: </span>
                  {quotation.payment}
                </h5>
                <Button
                  label="Edit"
                  color="bg-gray-600"
                  handleClick={() =>
                    handleEditQuotation({ name: "generalDetails", id })
                  }
                />
              </div>
            </div>
            <div className="col-span-12">
              <hr className="h-px my-2 border-0 dark:bg-gray-700" />
            </div>
            <div className="col-span-12">
              <div className="lg:flex items-center gap-x-6">
                <h2 className="text-lg">
                  <span className="font-semibold">Billing Client Name:</span>{" "}
                  {quotation.billToDetails.prefix.label}{" "}
                  {quotation.billToDetails.name}
                </h2>
                <h2 className="text-lg">
                  <span className="font-semibold">Billing Address:</span>{" "}
                  {quotation.billToDetails.address}{" "}
                  {quotation.billToDetails.road}{" "}
                  {quotation.billToDetails.location}{" "}
                  {quotation.billToDetails.landmark}{" "}
                  {quotation.billToDetails.city} -{" "}
                  {quotation.billToDetails.pincode}
                </h2>
                <h2 className="text-lg">
                  <span className="font-semibold">Billing Contact:</span>{" "}
                  {quotation.billToDetails.contact[0].name} /{" "}
                  {quotation.billToDetails.contact[0].number} /{" "}
                  {quotation.billToDetails.contact[0].email}
                </h2>
                <Button
                  label="Edit"
                  color="bg-gray-600"
                  handleClick={() =>
                    handleEditQuotation({ name: "billToDetails", id })
                  }
                />
              </div>
            </div>
            <div className="col-span-12">
              <hr className="h-px my-2 border-0 dark:bg-gray-700" />
            </div>
            <div className="col-span-12">
              <h1 className="text-center text-blue-600 text-2xl font-semibold mb-4">
                Ship To Details
              </h1>
              {quotation.shipToDetails?.map((item, index) => (
                <div className="mb-8" key={index}>
                  <div className="lg:flex gap-x-6 my-2">
                    <h2 className="text-lg">
                      <span className="font-semibold">
                        {index + 1}: Client Name:
                      </span>{" "}
                      {item.prefix.label} {item.name}
                    </h2>
                    <h2 className="text-lg">
                      <span className="font-semibold">Billing Address:</span>{" "}
                      {item.address} {item.road} {item.location} {item.landmark}{" "}
                      {item.city} - {item.pincode}
                    </h2>
                    <h2 className="text-lg">
                      <span className="font-semibold">Billing Contact:</span>{" "}
                      {item.contact[0].name} / {item.contact[0].number} /{" "}
                      {item.contact[0].email}
                    </h2>
                  </div>
                  <div className="overflow-y-auto">
                    <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                      <thead className="border-b font-medium dark:border-neutral-800 border-2">
                        <tr>
                          <th className="border-r px-6 py-1 dark:border-neutral-800 border-2">
                            Treatment Location
                          </th>
                          <th className="border-r px-6 py-1 dark:border-neutral-800 border-2">
                            Services
                          </th>
                          <th className="border-r px-6 py-1 dark:border-neutral-800 border-2">
                            Frequency
                          </th>
                          <th className="border-r px-6 py-1 dark:border-neutral-800 border-2">
                            Cost
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.serviceDetails.map((service, index) => (
                          <tr
                            className="border-b dark:border-neutral-500"
                            key={index}
                          >
                            <td className="whitespace-nowrap border-r px-2 py-1 font-normal dark:border-neutral-500">
                              {service.treatmentLocation}
                            </td>
                            <td className="whitespace-nowrap border-r px-2 py-1 font-normal dark:border-neutral-500">
                              {service.services.map((i) => i.label + ", ")}
                            </td>
                            <td className="whitespace-nowrap border-r px-2 py-1 font-normal dark:border-neutral-500">
                              {service.frequency.label}
                            </td>
                            <td className="whitespace-nowrap border-r px-2 py-1 font-normal dark:border-neutral-500">
                              {service.cost} /{service.costFrequency.label}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default SingleQuotation;
