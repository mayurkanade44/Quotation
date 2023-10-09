import { useState } from "react";
import { useDeleteAdminValueMutation } from "../../redux/adminSlice";
import { toast } from "react-toastify";
import Button from "../Button";
import Modal from "./Modal";
import { AiOutlineDelete } from "react-icons/ai";

const DeleteServiceModal = ({ description, id }) => {
  const [open, setOpen] = useState(false);

  const [deleteValue, { isLoading }] = useDeleteAdminValueMutation();

  const handleDelete = async () => {
    if (!id) return toast.error("Please provide valid id");
    try {
      const res = await deleteValue({ id }).unwrap();
      toast.success(res.msg);
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  return (
    <div>
      <Button label="Delete" color="bg-red-600" onClick={() => setOpen(true)} />
      {open && (
        <Modal open={open}>
          <div className="text-center w-auto">
            <AiOutlineDelete className="text-red-500 mx-auto w-10 h-10" />
            <div className="mx-auto my-1">
              <h3 className="text-lg font-black text-gray-800">
                Confirm Delete
              </h3>
              <p className="text-sm text-gray-500">
                Are you sure do you want to delete this {description}?
              </p>
            </div>
            <div className="flex gap-4 pt-2">
              <button
                onClick={handleDelete}
                type="button"
                className="btn bg-red-700 w-full rounded-md text-white py-2 cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="btn bg-gray-200 w-full rounded-md text-dark py-2 font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default DeleteServiceModal;
