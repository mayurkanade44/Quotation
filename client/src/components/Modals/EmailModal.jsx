import { useEffect, useState } from "react";
import Button from "../Button";
import Modal from "./Modal";
import { useSendQuotationMutation } from "../../redux/quotationSlice";
import { toast } from "react-toastify";

const EmailModal = ({ emails, fileName, id }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);

  const [sendEmail, { isLoading }] = useSendQuotationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let to = emails;
    if (email) to = `${emails},${email}`;
    try {
      const data = new FormData();
      data.set("emails", to);
      files.forEach((file) => {
        data.append("files", file);
      });
      const res = await sendEmail({ id, data }).unwrap();
      toast.success(res.msg);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        label="Send Email"
        color="bg-lime-600"
        onClick={() => setOpen(true)}
      />
      {open && (
        <Modal open={open}>
          <form className="text-center w-[500px]" onSubmit={handleSubmit}>
            <div className="mx-auto">
              <h3 className="text-lg font-black text-gray-800 ">
                Send Quotation
              </h3>
              <h3 className="text-left pl-2 my-2">
                <b>To:</b> {emails}
              </h3>
              <div className="flex items-center my-3">
                <label className="block w-52 text-md font-bold leading-6 text-gray-900">
                  Additional Emails:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-0.5 w-full py-0.5 px-2 border-2 rounded-md outline-none transition border-neutral-300 focus:border-black"
                />
              </div>
              <div className="flex items-center my-2">
                <label
                  htmlFor="files"
                  className="text-md font-bold leading-6 pl-2 mr-2 text-gray-900"
                >
                  File Upload:
                </label>
                <input
                  type="file"
                  onChange={(e) => setFiles(Array.from(e.target.files))}
                  multiple
                  className="mt-0.5"
                />
              </div>
              <div className="flex pl-2 mt-3 mb-2">
                <span className="font-bold mr-1">Attachments:</span>
                <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                  {fileName}
                </span>
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                className="btn bg-green-600 w-full rounded-md text-white py-1 cursor-pointer"
              >
                Send Email
              </button>
              <button
                onClick={() => setOpen(false)}
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
export default EmailModal;
