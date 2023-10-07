import { useState } from "react";
import Button from "../Button";
import { useForm, Controller } from "react-hook-form";
import InputRow from "../InputRow";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { useAddAdminValueMutation } from "../../redux/adminSlice";

const AddServiceModal = ({ label, editData }) => {
  const [open, setOpen] = useState(false);
  const [addAdminValues, { isLoading }] = useAddAdminValueMutation();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
  } = useForm({
    defaultValues: editData || {
      label: "",
      value: "",
      chemicals: "",
      description: "",
    },
  });

  const submit = async (form) => {
    let data = {};
    if (label === "Add Sale Person") {
      data.salePerson = {
        label: form.label,
        value: form.value,
      };
    }
    try {
      const res = await addAdminValues(data).unwrap();
      toast.success(res.msg);
      setOpen(false);
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  let bodyContent = (
    <div className="">
      <h4 className="text-center font-medium">New Sale Person</h4>
      <InputRow
        label="Full Name"
        id="label"
        errors={errors}
        register={register}
        type="text"
      />
      <p className="text-xs text-red-500 -bottom-4 pl-1">
        {errors.label && "Name is required"}
      </p>
      <InputRow
        label="Short Form"
        id="value"
        errors={errors}
        register={register}
        type="text"
      />
      <p className="text-xs text-red-500 -bottom-4 pl-1">
        {errors.value && "Short form is required"}
      </p>
    </div>
  );

  return (
    <div>
      <Button label={label} onClick={() => setOpen(true)} />
      {open && (
        <Modal open={open}>
          <form className="w-[300px]" onSubmit={handleSubmit(submit)}>
            {bodyContent}
            <div className="flex gap-4 pt-3">
              <button
                type="submit"
                className="btn bg-green-600 w-full rounded-md text-white py-1 cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="btn bg-gray-200 w-full rounded-md text-dark py-1 font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
export default AddServiceModal;
