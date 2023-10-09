import { useEffect, useState } from "react";
import { Button, ContactTable, Loading, ProgressSteps } from "../../components";
import {
  GeneralDetails,
  BillToDetails,
  ShipToDetails,
} from "../../components/QuotationForm";
import { useDispatch, useSelector } from "react-redux";
import { useCreateQuotationMutation } from "../../redux/quotationSlice";
import { toast } from "react-toastify";
import {
  clearQuotationEdit,
  setAdminValues,
  setQuotationEdit,
} from "../../redux/helperSlice";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { useGetAdminValuesQuery } from "../../redux/adminSlice";

const step = [
  { id: "01", name: "General Details", status: "current" },
  { id: "02", name: "Bill To Details", status: "upcoming" },
  { id: "03", name: "Ship To Details", status: "upcoming" },
  { id: "04", name: "Preview", status: "upcoming" },
];

const NewQuotation = () => {
  const [steps, setSteps] = useState(step);
  const [show, setShow] = useState("General Details");
  const navigate = useNavigate();
  const { quotationDetails } = useSelector((store) => store.helper);
  const [createQuotation, { isLoading }] = useCreateQuotationMutation();
  const { data, isLoading: adminLoading, error } = useGetAdminValuesQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setAdminValues({ data }));
    }
  }, [data]);

  const handleNext = (name) => {
    setSteps(
      steps.map((item) =>
        item.name === show
          ? { ...item, status: "complete" }
          : item.name === name
          ? { ...item, status: "current" }
          : { ...item }
      )
    );
    setShow(name);
  };

  const handleBack = (name) => {
    setSteps(
      steps.map((item) =>
        item.name === name
          ? { ...item, status: "current" }
          : item.name === show
          ? { ...item, status: "upcoming" }
          : { ...item }
      )
    );
    setShow(name);
  };

  const handleCreateQuotation = async () => {
    const data = {
      ...quotationDetails.generalDetails,
      billToDetails: quotationDetails.billToDetails,
      shipToDetails: quotationDetails.shipToDetails,
    };

    try {
      data.date = new Date();
      const res = await createQuotation(data).unwrap();
      toast.success(res.msg);
      saveAs(res.link, res.clientName);
      dispatch(clearQuotationEdit());
      navigate("/quotations");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  const editShipToDetails = (item, index) => {
    handleBack("Ship To Details");
    dispatch(setQuotationEdit({ data: item, id: index, name: "shipDetails" }));
  };

  return (
    <>
      {isLoading || adminLoading ? (
        <Loading />
      ) : (
        <>
          <ProgressSteps steps={steps} />
          <div className="mx-5 md:mx-10">
            {show === "General Details" ? (
              <GeneralDetails
                handleNext={() => handleNext("Bill To Details")}
              />
            ) : show === "Bill To Details" ? (
              <>
                <BillToDetails
                  handleNext={() => handleNext("Ship To Details")}
                  handleBack={() => handleBack("General Details")}
                />
              </>
            ) : show === "Ship To Details" ? (
              <ShipToDetails
                handleNext={() => handleNext("Preview")}
                handleBack={() => handleBack("Bill To Details")}
              />
            ) : (
              <div className="lg:mx-10">
                <h1 className="text-center text-xl font-medium">
                  Quotation Preview
                </h1>
                <div className="md:flex justify-between mt-4">
                  <h5 className="text-lg">
                    <span className="font-semibold">
                      Sales Representative:{" "}
                    </span>
                    {quotationDetails.generalDetails.salesName.label}
                  </h5>
                  <h5 className="text-lg">
                    <span className="font-semibold">Reference Person: </span>
                    {quotationDetails.generalDetails.referenceName}
                  </h5>
                  <h5 className="text-lg">
                    <span className="font-semibold">Payment Terms: </span>
                    {quotationDetails.generalDetails.payment}
                  </h5>
                </div>
                <div className="col-span-12">
                  <hr className="h-px my-2 border-0 dark:bg-gray-700" />
                </div>
                <div className="lg:flex justify-start gap-x-4 my-4">
                  <h5 className="text-lg">
                    <span className="font-semibold">Bill To Name: </span>
                    {`${quotationDetails.billToDetails.prefix.label} ${quotationDetails.billToDetails.name}`}
                  </h5>
                  <h5 className="text-lg">
                    <span className="font-semibold">Address: </span>
                    {quotationDetails.billToDetails.address},
                    {quotationDetails.billToDetails.road},
                    {quotationDetails.billToDetails.location}{" "}
                    {quotationDetails.billToDetails.landmark}{" "}
                    {quotationDetails.billToDetails.city} -{" "}
                    {quotationDetails.billToDetails.pincode}
                  </h5>
                  <h5 className="text-lg">
                    <span className="font-semibold">Primary Contact: </span>
                    {`${quotationDetails.billToDetails.contact[0].name} / ${quotationDetails.billToDetails.contact[0].number} / ${quotationDetails.billToDetails.contact[0].email}`}
                  </h5>
                </div>
                <div className="col-span-12">
                  <hr className="h-px my-2 border-0 dark:bg-gray-700" />
                </div>
                {quotationDetails.shipToDetails.map((item, index) => (
                  <div key={index}>
                    <div className="lg:flex justify-start items-center gap-x-4 my-4">
                      <h5 className="text-lg">
                        <span className="font-semibold">Ship To Name: </span>
                        {`${item.prefix.label} ${item.name}`}
                      </h5>
                      <h5 className="text-lg">
                        <span className="font-semibold">Address: </span>
                        {item.address},{item.road},{item.location}{" "}
                        {item.landmark} {item.city} - {item.pincode}
                      </h5>
                      <h5 className="text-lg">
                        <span className="font-semibold">Primary Contact: </span>
                        {`${item.contact[0].name} / ${item.contact[0].number} / ${item.contact[0].email}`}
                      </h5>
                      <Button
                        label="Edit"
                        onClick={() => editShipToDetails(item, index)}
                      />
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
                                {service.service?.map(
                                  (i) => i.name.label + ", "
                                )}
                              </td>
                              <td className="whitespace-nowrap border-r px-2 py-1 font-normal dark:border-neutral-500">
                                {service.service?.map(
                                  (i) => i.frequency.label + ", "
                                )}
                              </td>
                              <td className="whitespace-nowrap border-r px-2 py-1 font-normal dark:border-neutral-500">
                                {service.cost} / {service.costFrequency.label}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center mt-5">
                  <Button
                    label="Create Quotation"
                    color="bg-green-600"
                    onClick={handleCreateQuotation}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default NewQuotation;
