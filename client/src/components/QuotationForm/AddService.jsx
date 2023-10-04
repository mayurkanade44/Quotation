import { useFieldArray } from "react-hook-form";
import InputSelect from "../InputSelect";
import { service, serviceFrequency } from "../../utils/constData";
import { CiCircleRemove } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import InputRow from "../InputRow";
import Button from "../Button";

const AddService = ({ nestIndex, control, register, errors, Controller }) => {
  const { fields, append, remove } = useFieldArray({
    name: `serviceDetails[${nestIndex}].services`,
    control,
  });

  return (
    <>
      {fields.map((item, k) => {
        return (
          <div className="flex items-end gap-x-1" key={item.id}>
            <div className="w-full">
              <Controller
                name={`serviceDetails[${nestIndex}].services[${k}].name`}
                control={control}
                rules={{ required: "Service name is required" }}
                render={({ field: { onChange, value, ref } }) => (
                  <InputSelect
                    options={service}
                    onChange={onChange}
                    value={value}
                    label="Service Name"
                  />
                )}
              />
            </div>
            <div className="w-full">
              <Controller
                name={`serviceDetails[${nestIndex}].services[${k}].freq`}
                control={control}
                rules={{ required: "Service frequency is required" }}
                render={({ field: { onChange, value, ref } }) => (
                  <InputSelect
                    options={serviceFrequency}
                    onChange={onChange}
                    value={value}
                    label="Service Frequency"
                  />
                )}
              />
            </div>
            <IoMdAddCircleOutline
              className="w-28 h-12 text-green-500"
              onClick={() => append({ name: "", freq: "" })}
            />

            <CiCircleRemove
              className="w-28 h-12 text-red-500"
              onClick={() => remove(k)}
            />
          </div>
        );
      })}
    </>
  );
};
export default AddService;
