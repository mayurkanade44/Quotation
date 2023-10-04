import { Button, InputRow, InputSelect, Loading, InputTextarea } from "..";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  costFrequency,
  prefix,
  service,
  serviceFrequency,
} from "../../utils/constData";
import { useDispatch, useSelector } from "react-redux";
import {
  clearQuotationEdit,
  setQuotationDetails,
} from "../../redux/helperSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEditQuotationMutation } from "../../redux/quotationSlice";
import AddService from "./AddService";

const ShipToDetails = ({ handleNext, handleBack }) => {
  const { id: quotationId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quotationDetails, quotationEdit } = useSelector(
    (store) => store.helper
  );
  const [newShip, setNewShip] = useState("");
  const [editQuotation, { isLoading }] = useEditQuotationMutation();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
  } = useForm({
    defaultValues: quotationDetails.shipDetails || {
      prefix: "",
      name: "",
      address: "",
      road: "",
      location: "",
      landmark: "",
      city: "",
      pincode: "",
      contact: [
        { name: "", number: "", email: "" },
        { name: "", number: "", email: "" },
        { name: "", number: "", email: "" },
      ],
      serviceDetails: [
        {
          treatmentLocation: "",
          service: [
            {
              name: "",
              frequency: "",
            },
          ],
          cost: "",
          costFrequency: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "serviceDetails",
    control,
  });

  const copyBillDetails = () => {
    setValue("prefix", quotationDetails.billToDetails.prefix);
    setValue("address", quotationDetails.billToDetails.address);
    setValue("name", quotationDetails.billToDetails.name);
    setValue("road", quotationDetails.billToDetails.road);
    setValue("landmark", quotationDetails.billToDetails.landmark);
    setValue("location", quotationDetails.billToDetails.location);
    setValue("city", quotationDetails.billToDetails.city);
    setValue("pincode", quotationDetails.billToDetails.pincode);
    setValue("contact", quotationDetails.billToDetails.contact);
  };

  const submit = async (data) => {
    if (quotationId) {
      const shipToDetails = [...quotationDetails.shipToDetails];
      if (quotationId == quotationEdit.id) {
        shipToDetails.push(data);
      } else {
        shipToDetails[quotationEdit.id] = data;
      }
      const res = await editQuotation({
        data: { shipToDetails },
        id: quotationId,
      }).unwrap();
      navigate(`/quotation-details/${quotationId}`);
      toast.success(res.msg);
      dispatch(clearQuotationEdit());
      return;
    }

    if (newShip === "Add New") {
      dispatch(setQuotationDetails({ name: "shipDetails", data }));
      reset();
      toast.success("New Ship To Details Added");
    } else {
      if (quotationEdit.status) {
        dispatch(
          setQuotationDetails({
            name: "shipDetails",
            data,
            id: quotationEdit.id,
          })
        );
      } else {
        dispatch(setQuotationDetails({ name: "shipDetails", data }));
      }
      handleNext();
    }
    setNewShip("");
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="px-2 py-4 bg-gray-50">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-10">
        <div>
          <div className="flex justify-around">
            <h2 className="text-xl font-medium text-center text-blue-600">
              Shipping Information
            </h2>
            <Button
              onClick={copyBillDetails}
              label="Same as billing"
              small
              color="bg-gray-700"
            />
          </div>
          <div className="mt-3 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-4">
            <div className="md:col-span-2">
              <div className="flex">
                <div className="w-48">
                  <Controller
                    name="prefix"
                    rules={{ required: "Select prefix" }}
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputSelect
                        options={prefix}
                        onChange={onChange}
                        value={value}
                        label="Prefix"
                      />
                    )}
                  />
                  <p className="text-xs text-red-500 -bottom-4 pl-1">
                    {errors.prefix?.message}
                  </p>
                </div>
                <div className="w-full ml-2">
                  <InputRow
                    label="Full Name"
                    id="name"
                    errors={errors}
                    register={register}
                    type="text"
                  />
                  <p className="text-xs text-red-500 -bottom-4 pl-1">
                    {errors.name && "Client name is required"}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <InputRow
                label="Premise Name & Flat/Office no"
                id="address"
                errors={errors}
                register={register}
                type="text"
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.address && "Flat/office no & premise name is required"}
              </p>
            </div>
            <div>
              <InputRow
                label="Road/Lane Name"
                id="road"
                errors={errors}
                register={register}
                type="text"
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.road && "Road/Lane name is required"}
              </p>
            </div>
            <div>
              <InputRow
                label="Location"
                id="location"
                errors={errors}
                register={register}
                type="text"
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.location && "location name is required"}
              </p>
            </div>
            <div>
              <InputRow
                label="Landmark/Near By Place"
                id="landmark"
                errors={errors}
                register={register}
                type="text"
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.landmark && "Landmark name is required"}
              </p>
            </div>
            <div>
              <InputRow
                label="City"
                id="city"
                errors={errors}
                register={register}
                type="text"
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.city && "City name is required"}
              </p>
            </div>
            <div>
              <InputRow
                label="Pincode"
                id="pincode"
                errors={errors}
                register={register}
                type="text"
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.pincode && "Pincode is required"}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-medium text-center text-blue-600">
            Shipping Contacts Details
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-y-3 sm:grid-cols-3 sm:gap-x-4">
            <div>
              <InputRow
                label="Primary Contact"
                placeholder="Full Name"
                id="contact.0.name"
                errors={errors}
                register={register}
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.contact && "Contact name is required"}
              </p>
            </div>
            <div>
              <InputRow
                label="Primary Number"
                placeholder="Phone Number"
                id="contact.0.number"
                errors={errors}
                register={register}
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.contact && "Contact name is required"}
              </p>
            </div>
            <div>
              <InputRow
                label="Primary Email Id"
                placeholder="Email Address"
                id="contact.0.email"
                errors={errors}
                register={register}
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.contact && "Contact name is required"}
              </p>
            </div>
            <InputRow
              label="Alternate Contact - 1"
              placeholder="Full Name"
              id="contact.1.name"
              errors={errors}
              register={register}
              required={false}
            />
            <InputRow
              label="Alternate Contact - 1"
              placeholder="Phone Number"
              id="contact.1.number"
              errors={errors}
              register={register}
              required={false}
            />
            <InputRow
              label="Alternate Contact - 1"
              placeholder="Email Address"
              id="contact.1.email"
              errors={errors}
              register={register}
              required={false}
              type="email"
            />
            <InputRow
              label="Alternate Contact - 2"
              placeholder="Full Name"
              id="contact.2.name"
              errors={errors}
              register={register}
              required={false}
            />
            <InputRow
              label="Alternate Contact - 2"
              placeholder="Phone Number"
              id="contact.2.number"
              errors={errors}
              register={register}
              required={false}
            />
            <InputRow
              label="Alternate Contact - 2"
              placeholder="Email Address"
              id="contact.2.email"
              errors={errors}
              register={register}
              required={false}
              type="email"
            />
          </div>
        </div>
      </div>
      <h2 className="mt-3 text-xl font-medium text-center text-blue-600">
        Service Details
      </h2>
      {fields.map((field, index) => {
        return (
          <div
            className="grid grid-cols-1 sm:grid-cols-5 sm:gap-x-2"
            key={field.id}
          >
            <div className="md:col-span-2">
              <InputTextarea
                label="Treatment Location"
                rows={4}
                id={`serviceDetails.${index}.treatmentLocation`}
                errors={errors}
                register={register}
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.serviceDetails && "Treatment location is required"}
              </p>
              <div className="sm:grid sm:grid-cols-3 gap-x-2">
                <div className="md:col-span-1">
                  <InputRow
                    label="Cost"
                    placeholder="Total Cost"
                    id={`serviceDetails.${index}.cost`}
                    errors={errors}
                    register={register}
                  />
                  <p className="text-xs text-red-500 -bottom-4 pl-1">
                    {errors.serviceDetails && "Cost is required"}
                  </p>
                </div>
                <div className="col-span-2">
                  <Controller
                    name={`serviceDetails.${index}.costFrequency`}
                    control={control}
                    rules={{ required: "Select cost frequency is required" }}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputSelect
                        options={costFrequency}
                        onChange={onChange}
                        value={value}
                        label="Cost Frequency"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <AddService
                nestIndex={index}
                {...{ control, register, errors, Controller }}
              />
            </div>
            <div className="md:col-span-5 mt-2">
              <div className="flex justify-center">
                <Button
                  label="Add"
                  color="bg-black"
                  onClick={() =>
                    append({
                      treatmentLocation: "",
                      cost: "",
                      costFrequency: "",
                      service: [
                        {
                          name: "",
                          frequency: "",
                        },
                      ],
                    })
                  }
                />
                {index > 0 && (
                  <Button
                    color="bg-red-600"
                    label="Remove"
                    onClick={() => remove(index)}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
      <hr className="h-px my-3 mb-2 border-0 dark:bg-gray-700" />
      <div className="flex justify-center">
        {!quotationEdit.status && (
          <Button
            type="submit"
            label="Add New Ship To Details"
            onClick={(e) => setNewShip("Add New")}
          />
        )}
        <Button
          type="submit"
          label="Submit"
          color="bg-green-600"
          onClick={(e) => setNewShip("Submit")}
        />
        {!quotationId && (
          <Button
            label="Back"
            color="bg-gray-700"
            onClick={() => handleBack("Bill To Details")}
          />
        )}
      </div>
    </form>
  );
};
export default ShipToDetails;
