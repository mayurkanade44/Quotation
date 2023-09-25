import Quotation from "../models/quotationModel.js";
import fs from "fs";
import { createReport } from "docx-templates";
import moment from "moment";

export const createQuotation = async (req, res) => {
  try {
    req.body.number = 444;
    const quotation = await Quotation.create(req.body);

    // const template = fs.readFileSync("./tmp/quotation.docx");

    // const buffer = await createReport({
    //   cmdDelimiter: ["{", "}"],
    //   template,

    //   additionalJsContext: {
    //     quotationNo: quotation.number,
    //     date: moment(quotation.createdAt).format("DD/MM/YYYY"),
    //     business: quotation.business,
    //     sales: quotation.salesName,
    //     referenceName: quotation.referenceName,
    //     name: quotation.billToDetails.name,
    //     address: quotation.billToDetails.address,
    //     road: quotation.billToDetails.road,
    //     location: quotation.billToDetails.location,
    //     nearBy: quotation.billToDetails.landmark,
    //     city: `${quotation.billToDetails.city}-${quotation.billToDetails.pincode}`,
    //     payment: quotation.payment,
    //     shipToDetails: quotation.shipToDetails,
    //   },
    // });

    // fs.writeFileSync("./tmp/output2.docx", buffer);

    return res.status(201).json({ msg: `${quotation.number} created` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};
