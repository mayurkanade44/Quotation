import { useState } from "react";
import { Button, ContactTable, Loading } from "../components";
import {
  GeneralDetails,
  BillToDetails,
  ShipToDetails,
} from "../components/QuotationForm";
import { AiOutlineCheck, AiOutlineCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useCreateQuotationMutation } from "../redux/quotationSlice";
import { toast } from "react-toastify";
import { setQuotationDetails, setQuotationEdit } from "../redux/helperSlice";

const step = [
  { id: "01", name: "General Details", status: "current" },
  { id: "02", name: "Bill To Details", status: "upcoming" },
  { id: "03", name: "Ship To Details", status: "upcoming" },
  { id: "04", name: "Preview", status: "upcoming" },
];

const NewQuotation = () => {
  const [steps, setSteps] = useState(step);
  const [show, setShow] = useState("General Details");
  const [loading, setLoading] = useState(false);
  const { quotationDetails } = useSelector((store) => store.helper);
  const [createQuotation, { isLoading }] = useCreateQuotationMutation();
  const dispatch = useDispatch();

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
      const res = await createQuotation(data).unwrap();
      toast.success(res.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const editShipToDetails = (item, index) => {
    handleBack("Ship To Details");
    dispatch(setQuotationEdit({ data: item, id: index }));
  };

  if (loading || isLoading) return <Loading />;

  return (
    <>
      <nav aria-label="Progress" className="mx-5 md:mx-10 md:my-5">
        <ol
          role="list"
          className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
        >
          {steps?.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              {step.status === "complete" ? (
                <span className="flex items-center px-6 py-2">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-600 group-hover:bg-indigo-800">
                    <AiOutlineCheck className="w-7 h-7 text-white" />
                  </span>

                  <span className="ml-4 text-lg font-medium text-gray-800">
                    {step.name}
                  </span>
                </span>
              ) : step.status === "current" ? (
                <a
                  href={step.href}
                  className="flex items-center px-6 py-2 text-sm font-medium"
                  aria-current="step"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                    <span className="text-indigo-600">{step.id}</span>
                  </span>
                  <span className="ml-4 text-lg font-medium text-indigo-600">
                    {step.name}
                  </span>
                </a>
              ) : (
                <a href={step.href} className="group flex items-center">
                  <span className="flex items-center px-6 py-2 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">
                        {step.id}
                      </span>
                    </span>
                    <span className="ml-4 text-lg font-medium text-gray-500 group-hover:text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </a>
              )}
              {stepIdx !== steps.length - 1 ? (
                <>
                  {/* Arrow separator for lg screens and up */}
                  <div
                    className="absolute right-0 top-0 hidden h-full w-5 md:block"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>

      <div className="mx-5 md:mx-10">
        {show === "General Details" ? (
          <GeneralDetails handleNext={() => handleNext("Bill To Details")} />
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
          <div className="lg:mx-16">
            <h1 className="text-center text-xl font-medium">
              Quotation Preview
            </h1>
            <div className="md:flex justify-between mt-4">
              <h5 className="text-lg">
                Sales Representative:{" "}
                {quotationDetails.generalDetails.salesName.label}
              </h5>
              <h5 className="text-lg">
                Reference Person:{" "}
                {quotationDetails.generalDetails.referenceName}
              </h5>
              <h5 className="text-lg">
                Payment Terms: {quotationDetails.generalDetails.payment}
              </h5>
            </div>
            <div className="lg:flex justify-start gap-x-4 my-4">
              <h5 className="text-lg">
                Bill To Name:{" "}
                {`${quotationDetails.billToDetails.prefix.label} ${quotationDetails.billToDetails.name}`}
              </h5>
              <h5 className="text-lg">
                Address: {quotationDetails.billToDetails.address},
                {quotationDetails.billToDetails.road},
                {quotationDetails.billToDetails.location}{" "}
                {quotationDetails.billToDetails.landmark}{" "}
                {quotationDetails.billToDetails.city} -{" "}
                {quotationDetails.billToDetails.pincode}
              </h5>
              <h5 className="text-lg">
                Primary Contact:{" "}
                {`${quotationDetails.billToDetails.contact[0].name} / ${quotationDetails.billToDetails.contact[0].number} / ${quotationDetails.billToDetails.contact[0].email}`}
              </h5>
            </div>
            {quotationDetails.shipToDetails.map((item, index) => (
              <div key={index}>
                <div className="lg:flex justify-start items-center gap-x-4 my-4">
                  <h5 className="text-lg">
                    Ship To Name: {`${item.prefix.label} ${item.name}`}
                  </h5>
                  <h5 className="text-lg">
                    Address: {item.address},{item.road},{item.location}{" "}
                    {item.landmark} {item.city} - {item.pincode}
                  </h5>
                  <h5 className="text-lg">
                    Primary Contact:{" "}
                    {`${item.contact[0].name} / ${item.contact[0].number} / ${item.contact[0].email}`}
                  </h5>
                  <Button
                    label="Edit"
                    handleClick={() => editShipToDetails(item, index)}
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
            <div className="flex justify-center mt-5">
              <Button
                label="Create Quotation"
                color="bg-green-600"
                handleClick={handleCreateQuotation}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default NewQuotation;
