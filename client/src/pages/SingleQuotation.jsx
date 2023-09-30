import { useParams, useNavigate } from "react-router-dom";
import {
  useDeleteQuotationMutation,
  useEditQuotationMutation,
  useReviseQuotationMutation,
  useSingleQuotationQuery,
} from "../redux/quotationSlice";
import { AlertMessage, Button, Loading } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setQuotationDetails, setQuotationEdit } from "../redux/helperSlice";
import { useEffect, useState } from "react";
import DeleteModal from "../components/Modals/DeleteModal";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import SendEmail from "../components/Modals/SendEmail";

const SingleQuotation = () => {
  const { id: quotationId } = useParams();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [emails, setEmails] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: quotation,
    isLoading: quotationLoading,
    error,
  } = useSingleQuotationQuery(quotationId);

  const [editQuotation, { isLoading: deleteLoading }] =
    useEditQuotationMutation();
  const [reviseQuotation, { isLoading: reviseLoading }] =
    useReviseQuotationMutation();
  const [deleteQuot, { isLoading: deleteQuotLoading }] =
    useDeleteQuotationMutation();

  const handleEditQuotation = ({ name, id, data }) => {
    if (name === "generalDetails") {
      dispatch(
        setQuotationEdit({
          name,
          id: quotationId,
          data: {
            number: quotation.number,
            salesName: quotation.salesName,
            referenceName: quotation.referenceName,
            otherReference: quotation.otherReference,
            business: quotation.business,
            payment: quotation.payment,
          },
        })
      );
    } else if (name === "billToDetails") {
      dispatch(
        setQuotationEdit({
          name,
          id: quotationId,
          data: quotation.billToDetails,
        })
      );
    } else if (name === "shipDetails") {
      dispatch(setQuotationEdit({ name, id, data }));
      dispatch(
        setQuotationDetails({
          name: "shipToDetails",
          data: quotation.shipToDetails,
        })
      );
    } else if (name === "Add New Ship To") {
      dispatch(setQuotationEdit({ name: "shipDetails", id: quotationId }));
      dispatch(
        setQuotationDetails({
          name: "shipToDetails",
          data: quotation.shipToDetails,
        })
      );
    }
    navigate(`/edit-quotation/${quotationId}`);
  };

  const openDeleteModal = () => {
    dispatch(
      setQuotationDetails({
        name: "shipToDetails",
        data: quotation.shipToDetails,
      })
    );
    setOpen(true);
  };

  const handleDelete = async (id) => {
    let shipToDetails = [...quotation.shipToDetails];
    const temp = shipToDetails.filter((item) => item._id !== id);
    try {
      await editQuotation({
        data: { shipToDetails: temp },
        id: quotationId,
      }).unwrap();
      toast.success("Ship to details deleted");
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  const handleDownload = ({ link }) => {};

  const createReviseQuotation = async () => {
    try {
      const res = await reviseQuotation({ id: quotationId }).unwrap();
      toast.success(res.msg);
      saveAs(res.link, `${res.clientName}.docx`);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  const handleDeleteQuotation = async () => {
    try {
      const res = await deleteQuot({ id: quotationId }).unwrap();
      toast.success(res.msg);
      setOpenDelete(false);
      navigate("/quotations");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  useEffect(() => {
    if (quotation) {
      quotation.billToDetails.contact.map((item) => {
        item.email && !emails.includes(item.email) && emails.push(item.email);
      });
      quotation.shipToDetails.map((item) =>
        item.contact.map(
          (con) =>
            con.email && !emails.includes(con.email) && emails.push(con.email)
        )
      );
    }
  }, [quotation]);

  return (
    <div className="mx-10 my-5">
      {quotationLoading ||
      reviseLoading ||
      deleteLoading ||
      deleteQuotLoading ? (
        <Loading />
      ) : (
        error && <AlertMessage>{error?.data?.msg || error.error}</AlertMessage>
      )}
      {quotation && (
        <>
          <div className="lg:grid lg:grid-cols-12 gap-x-4">
            <div className="col-span-6">
              <h1 className="text-[25px] font-bold text-center">
                Quotation Number: {quotation.number}
              </h1>
            </div>
            <div className="col-span-2">
              <a href={quotation.wordDoc}>
                <Button label="Download" color="bg-green-600" />
              </a>
            </div>
            <div className="col-span-2">
              <Button
                label="Revise Quotation"
                onClick={createReviseQuotation}
              />
            </div>
            <div className="col-span-1">
              <Button
                label="Delete"
                color="bg-red-600"
                onClick={() => setOpenDelete(true)}
              />
            </div>
            {openDelete && (
              <DeleteModal
                open={openDelete}
                close={() => setOpenDelete(false)}
                description="Are you sure you want delete the quotation?"
                onClick={handleDeleteQuotation}
              />
            )}
            <div className="col-span-1">
              <SendEmail emails={emails} />
            </div>
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
                  onClick={() =>
                    handleEditQuotation({ name: "generalDetails" })
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
                  onClick={() => handleEditQuotation({ name: "billToDetails" })}
                />
              </div>
            </div>
            <div className="col-span-12">
              <hr className="h-px my-2 border-0 dark:bg-gray-700" />
            </div>
            <div className="col-span-12">
              <div className="lg:flex justify-center gap-x-5">
                <h2 className=" text-blue-600 text-2xl font-semibold pt-2">
                  Ship To Details
                </h2>
                <Button
                  label="Add New Ship To"
                  onClick={() =>
                    handleEditQuotation({ name: "Add New Ship To" })
                  }
                />
              </div>
            </div>
            <div className="col-span-12 mt-2">
              {quotation.shipToDetails?.map((item, index) => (
                <div className="mb-8" key={item._id}>
                  <div className="lg:flex items-center gap-x-6 my-2">
                    <h2 className="text-lg">
                      <span className="font-semibold">
                        {index + 1}: Client Name:
                      </span>{" "}
                      {item.prefix.label} {item.name}
                    </h2>
                    <h2 className="text-lg">
                      <span className="font-semibold">Shipping Address:</span>{" "}
                      {item.address} {item.road} {item.location} {item.landmark}{" "}
                      {item.city} - {item.pincode}
                    </h2>
                    <h2 className="text-lg">
                      <span className="font-semibold">Shipping Contact:</span>{" "}
                      {item.contact[0].name} / {item.contact[0].number} /{" "}
                      {item.contact[0].email}
                    </h2>
                    <Button
                      label="Edit"
                      color="bg-gray-600"
                      onClick={() =>
                        handleEditQuotation({
                          name: "shipDetails",
                          id: index,
                          data: item,
                        })
                      }
                    />
                    <Button
                      label="Delete"
                      color="bg-red-600"
                      onClick={openDeleteModal}
                    />
                    {open && (
                      <DeleteModal
                        open={open}
                        close={() => setOpen(false)}
                        description="Are you sure you want delete this shipping to details?"
                        onClick={() => handleDelete(item._id)}
                      />
                    )}
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
