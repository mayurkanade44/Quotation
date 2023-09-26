import { useSelector } from "react-redux";
import { BillToDetails, GeneralDetails } from "../components/QuotationForm";

const EditQuotation = () => {
  const { quotationEdit } = useSelector((store) => store.helper);
  return (
    <div className="mx-10 my-5">
      {quotationEdit.name === "generalDetails" ? (
        <GeneralDetails />
      ) : quotationEdit.name === "billToDetails" ? (
        <BillToDetails />
      ) : null}
    </div>
  );
};
export default EditQuotation;
