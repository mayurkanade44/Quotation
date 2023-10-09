import { Button, InputRow, InputSelect, Loading } from "..";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearQuotationEdit,
  setQuotationDetails,
} from "../../redux/helperSlice";
import { useEditQuotationMutation } from "../../redux/quotationSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GeneralDetails = ({ handleNext }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quotationDetails, quotationEdit, adminValues } = useSelector(
    (store) => store.helper
  );

  const [editQuotation, { isLoading }] = useEditQuotationMutation();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
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

  const submit = async (data) => {
    try {
      if (quotationEdit.status) {
        const res = await editQuotation({
          data,
          id: quotationEdit.id,
        }).unwrap();
        navigate(`/quotation-details/${quotationEdit.id}`);
        toast.success(res.msg);
        dispatch(clearQuotationEdit());
      } else {
        dispatch(setQuotationDetails({ name: "generalDetails", data }));
        handleNext();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex justify-center bg-gray-50"
    >
      <div className="w-full md:w-2/4 lg:w-1/4">
        <h1 className="text-center mt-2 mb-4 text-2xl font-medium text-green-600">
          {quotationEdit.status ? "Update Quotation" : "New Quotation"}
        </h1>
        <Controller
          name="salesName"
          control={control}
          rules={{ required: "Sales person name is required" }}
          render={({ field: { onChange, value, ref } }) => (
            <InputSelect
              options={adminValues.salesPerson}
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
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.referenceName && "Reference name is required"}
        </p>
        <InputRow
          label="Other Reference"
          id="otherReference"
          errors={errors}
          register={register}
          required={false}
        />
        <Controller
          name="business"
          control={control}
          rules={{ required: "Business name is required" }}
          render={({ field: { onChange, value, ref } }) => (
            <InputSelect
              options={adminValues.business}
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
        />
        <p className="text-xs text-red-500 -bottom-4 pl-1">
          {errors.payment && "Payments terms is required"}
        </p>
        <div className="mt-2 w-32">
          <Button
            label={quotationEdit.status ? "Save" : "Next"}
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};
export default GeneralDetails;
