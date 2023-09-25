import { Button, InputRow, InputSelect, Loading } from "..";
import { useForm, Controller } from "react-hook-form";
import { prefix } from "../../utils/constData";
import { useDispatch, useSelector } from "react-redux";
import { setQuotationDetails } from "../../redux/helperSlice";

const BillToDetails = ({ handleNext, handleBack }) => {
  const dispatch = useDispatch();
  const { quotationDetails } = useSelector((store) => store.helper);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
  } = useForm({
    defaultValues: quotationDetails.billToDetails || {
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
    },
  });

  const submit = (data) => {
    dispatch(setQuotationDetails({ name: "billToDetails", data }));
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-10 px-2 py-4 bg-gray-50">
        <div>
          <h2 className="text-xl font-medium text-center text-blue-600">
            Billing Information
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-4">
            <div className="md:col-span-2">
              <div className="flex">
                <div className="w-48">
                  <Controller
                    name="prefix"
                    control={control}
                    rules={{ required: "Select prefix" }}
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
                  />
                  <p className="text-xs text-red-500 -bottom-4 pl-1">
                    {errors.name && "Client name is required"}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <InputRow
                label="Flat/Office no & Premise Name"
                id="address"
                errors={errors}
                register={register}
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
            Billing Contacts Details
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
                {errors.contact && "Phone Number is required"}
              </p>
            </div>
            <div>
              <InputRow
                label="Primary Email Id"
                placeholder="Email Address"
                id="contact.0.email"
                errors={errors}
                register={register}
                type="email"
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.contact && "Email id is required"}
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
      <Button label="Back" color="bg-gray-700" handleClick={handleBack} />
      <Button label="Next" type="submit" />
    </form>
  );
};
export default BillToDetails;
