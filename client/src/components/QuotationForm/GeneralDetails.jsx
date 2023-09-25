import { Button, InputRow, InputSelect, Loading } from "..";
import { useForm, Controller } from "react-hook-form";
import { business, sales } from "../../utils/constData";
import { useDispatch, useSelector } from "react-redux";
import { setQuotationDetails } from "../../redux/helperSlice";

const GeneralDetails = ({ handleNext }) => {
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
    defaultValues: quotationDetails.generalDetails || {
      salesName: "",
      referenceName: "",
      otherReference: "",
      business: "",
      payment: "",
    },
  });

  const submit = (data) => {
    dispatch(setQuotationDetails({ name: "generalDetails", data }));
    handleNext();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex justify-center bg-gray-50"
    >
      <div className="w-full md:w-2/4 lg:w-1/4">
        <h1 className="text-center mt-2 mb-4 text-2xl font-medium text-green-600">
          New Quotation
        </h1>
        <Controller
          name="salesName"
          control={control}
          rules={{ required: "Sales person name is required" }}
          render={({ field: { onChange, value, ref } }) => (
            <InputSelect
              options={sales}
              onChange={onChange}
              value={value}
              label="Sales Person"
            />
          )}
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.salesName?.message}
        </p>
        <InputRow
          label="Reference Name"
          id="referenceName"
          errors={errors}
          register={register}
          type="text"
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.referenceName && "Reference name is required"}
        </p>
        <InputRow
          label="Other Reference"
          id="otherReference"
          errors={errors}
          register={register}
          type="text"
          required={false}
        />
        <Controller
          name="business"
          control={control}
          rules={{ required: "Business name is required" }}
          render={({ field: { onChange, value, ref } }) => (
            <InputSelect
              options={business}
              onChange={onChange}
              value={value}
              label="Type Of Business"
            />
          )}
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.business?.message}
        </p>
        <InputRow
          label="Payment Terms"
          id="payment"
          errors={errors}
          register={register}
          type="text"
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.payment && "Payments terms is required"}
        </p>
        <div className="mt-2 w-32">
          <Button label="Next" type="submit" />
        </div>
      </div>
    </form>
  );
};
export default GeneralDetails;
