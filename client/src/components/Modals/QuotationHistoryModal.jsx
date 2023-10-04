import { useState } from "react";
import Button from "../Button";
import Modal from "./Modal";

const QuotationHistoryModal = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        label="History"
        color="bg-orange-600"
        onClick={() => setOpen(true)}
      />
      {open && (
        <Modal open={open}>
          <div>
            <h2 className="text-center mb-3 text-lg font-medium">
              {!data.length && "No"} Revised History
            </h2>
            {data.length > 0 && (
              <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-800 border-2">
                  <tr>
                    <th className="border-r px-6 py-1 dark:border-neutral-800 border-2">
                      Name
                    </th>
                    <th className="border-r px-6 py-1 dark:border-neutral-800 border-2">
                      Created By
                    </th>
                    <th className="border-r px-6 py-1 dark:border-neutral-800 border-2">
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      className="border-b dark:border-neutral-500"
                      key={index}
                    >
                      <td className="whitespace-nowrap border-r px-2 py-1 font-normal dark:border-neutral-500">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap border-r px-2 py-1 font-normal dark:border-neutral-500">
                        {item.user}
                      </td>
                      <td className="whitespace-nowrap border-r px-2 py-1 font-normal dark:border-neutral-500">
                        <a href={item.link}>
                          <Button label="Download" color="bg-green-600" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="flex justify-center mt-2">
              <Button label="Close" onClick={() => setOpen(false)} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default QuotationHistoryModal;
