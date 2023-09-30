import { useEffect, useState } from "react";
import Button from "../Button";
import Modal from "./Modal";
import InputRow from "../InputRow";

const EmailModal = ({ emails }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div>
      <Button
        label="Send Email"
        color="bg-lime-600"
        onClick={() => setOpen(true)}
      />
      {open && (
        <Modal open={open}>
          <form className="text-center w-[500px]">
            <div className="mx-auto">
              <h3 className="text-lg font-black text-gray-800 ">
                Send Quotation
              </h3>
              <h3 className="text-left pl-2 my-2">
                <b>To:</b> {emails}
              </h3>
              <div className="flex items-center my-3">
                <label className="block w-44 text-md font-bold leading-6 text-gray-900">
                  Extra Email Ids:
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
                  onChange={(e) => setImages(Array.from(e.target.files))}
                  multiple
                  className="mt-0.5"
                  accept="image/*"
                />
              </div>
              <div className="flex pl-2 my-2">Attachments:</div>
            </div>
            <div className="flex gap-4 pt-2">
              <button
                type="button"
                className="btn bg-green-600 w-full rounded-md text-white py-1 cursor-pointer"
              >
                Send Email
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
export default EmailModal;
