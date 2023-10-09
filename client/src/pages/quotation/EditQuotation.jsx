import { useSelector } from "react-redux";
import {
  BillToDetails,
  GeneralDetails,
  ShipToDetails,
} from "../../components/QuotationForm";

const EditQuotation = () => {
  const { quotationEdit } = useSelector((store) => store.helper);
  return (
    <div className="mx-10 my-5">
      {quotationEdit.name === "generalDetails" ? (
        <GeneralDetails />
      ) : quotationEdit.name === "billToDetails" ? (
        <BillToDetails />
      ) : quotationEdit.name === "shipDetails" ? (
        <ShipToDetails />
      ) : null}
    </div>
  );
};
export default EditQuotation;
