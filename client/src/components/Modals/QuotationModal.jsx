import { useState } from "react";
import Button from "../Button";
import Modal from "./Modal";
import { useReviseQuotationMutation } from "../../redux/quotationSlice";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

const QuotationModal = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [revised, setRevised] = useState(false);

  const [reviseQuotation, { isLoading: reviseLoading }] =
    useReviseQuotationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await reviseQuotation({
        id,
        data: { revised },
      }).unwrap();
      toast.success(res.msg);
      saveAs(res.link, `${res.clientName}.docx`);
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  return (
    <div>
      <Button label="Create Quotation" onClick={() => setOpen(true)} />
      {open && (
        <Modal open={open}>
          <form className="text-center w-[400px]" onSubmit={handleSubmit}>
            <div className="mx-auto">
              <h3 className="text-lg font-black text-gray-800 mb-4 ">
                Create Quotation
              </h3>
            </div>
            <div className="flex items-center justify-center mb-3">
              <p className="ml-3 text-lg font-semibold text-red-600 mr-2">
                Is this revised quotation?
              </p>
              <select
                name="revised"
                className="border w-16 h-6 mt-1 border-gray-300 dark:border-gray-700  rounded text-sm focus:outline-none focus:border-indigo-700 "
                value={revised}
                onChange={(e) => setRevised(e.target.value)}
              >
                <option value="false" className="text-center">
                  No
                </option>
                <option value="true" className="text-center">
                  Yes
                </option>
              </select>
            </div>
            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                className="btn bg-green-600 w-full rounded-md text-white py-1 cursor-pointer"
              >
                Generate
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
export default QuotationModal;
