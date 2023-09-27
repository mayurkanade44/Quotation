import Quotation from "../models/quotationModel.js";
import fs from "fs";
import { createReport } from "docx-templates";
import moment from "moment";

export const createQuotation = async (req, res) => {
  try {
    req.body.number = 444;
    const quotation = await Quotation.create(req.body);

    const clientName = `${quotation.billToDetails.prefix.label}. ${quotation.billToDetails.name}`;
    const template = fs.readFileSync("./tmp/quotation.docx");

    const buffer = await createReport({
      cmdDelimiter: ["{", "}"],
      template,

      additionalJsContext: {
        quotationNo: quotation.number,
        date: moment(quotation.createdAt).format("DD/MM/YYYY"),
        business: quotation.business,
        sales: quotation.salesName,
        referenceName: quotation.referenceName,
        name: clientName,
        address: quotation.billToDetails.address,
        road: quotation.billToDetails.road,
        location: quotation.billToDetails.location,
        nearBy: quotation.billToDetails.landmark,
        city: `${quotation.billToDetails.city}-${quotation.billToDetails.pincode}`,
        payment: quotation.payment,
        shipToDetails: quotation.shipToDetails,
      },
    });

    const fileName = clientName.replace(/\//g, "-");

    fs.writeFileSync(`./tmp/${fileName}.docx`, buffer);

    return res.status(201).json({ msg: `${quotation.number} created` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const getAllQuotation = async (req, res) => {
  const { search, page } = req.query;
  let query = {};
  if (search) {
    query = {
      $or: [
        { number: { $regex: search, $options: "i" } },
        { "shipToDetails.name": { $regex: search, $options: "i" } },
        { "billToDetails.name": { $regex: search, $options: "i" } },
        {
          "billToDetails.contact": {
            $elemMatch: { number: { $regex: search, $options: "i" } },
          },
        },
        {
          "shipToDetails.contact": {
            $elemMatch: { number: { $regex: search, $options: "i" } },
          },
        },
      ],
    };
  }
  try {
    const quotation = await Quotation.find(query).sort("-createdAt");

    return res.json(quotation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const getQuotation = async (req, res) => {
  const { id } = req.params;
  try {
    const quotation = await Quotation.findById(id);
    if (!quotation) return res.status(404).json({ msg: "Quotation not found" });

    return res.json(quotation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const editQuotation = async (req, res) => {
  const { id } = req.params;

  try {
    const quotation = await Quotation.findById(id);
    if (!quotation) return res.status(404).json({ msg: "Quotation not found" });

    await Quotation.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({ msg: "Quotation updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};
