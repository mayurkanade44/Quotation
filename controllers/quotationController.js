import Quotation from "../models/quotationModel.js";
import fs from "fs";
import { createReport } from "docx-templates";
import moment from "moment";
import { uploadFile } from "../utils/helper.js";

export const createQuotation = async (req, res) => {
  try {
    req.body.number = "EPPL/QTN/444";
    const quotation = req.body;

    const template = fs.readFileSync("./tmp/quotation.docx");

    const buffer = await createReport({
      cmdDelimiter: ["{", "}"],
      template,

      additionalJsContext: {
        quotationNo: quotation.number,
        date: moment(quotation.date).format("DD/MM/YYYY"),
        sales: quotation.salesName,
        reference: `Your enquiry and our discussion had with ${quotation.referenceName}`,
        name: `${quotation.billToDetails.prefix.label}. ${quotation.billToDetails.name}`,
        address: quotation.billToDetails.address,
        road: quotation.billToDetails.road,
        location: quotation.billToDetails.location,
        nearBy: quotation.billToDetails.landmark,
        city: `${quotation.billToDetails.city}-${quotation.billToDetails.pincode}`,
        payment: quotation.payment,
        shipToDetails: quotation.shipToDetails,
      },
    });

    const clientName = `${quotation.shipToDetails[0].name} ${quotation.number}`;
    const fileName = clientName.replace(/\//g, "-");
    const filePath = `./tmp/${fileName}.docx`;

    fs.writeFileSync(filePath, buffer);

    const link = await uploadFile({ filePath, folder: "Eppl/Quotation" });
    if (link) {
      req.body.wordDoc = link;
      const newQuotation = await Quotation.create(req.body);
      return res.status(201).json({
        msg: `${newQuotation.number} created`,
        link,
        clientName,
      });
    }
    res.status(400).json({ msg: "Quotation not created, try again later" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const revisedQuotation = async (req, res) => {
  const { id } = req.params;
  try {
    const quotation = await Quotation.findById(id);
    if (!quotation) return res.status(404).json({ msg: "Quotation not found" });

    let quotationNo = quotation.number;
    let reference = `Your enquiry and our discussion had with ${quotation.referenceName}`;
    let date = quotation.date;
    if (req.body.revised) {
      reference = `Our Earlier Quotation No. ${quotationNo} dated ${moment(
        date
      ).format("DD/MM/YYYY")} being revised`;
      quotationNo = `EPPL/QTN/444/R-${quotation.revisedCount + 1}`;
      date = req.body.date;
    }

    const template = fs.readFileSync("./tmp/quotation.docx");

    const buffer = await createReport({
      cmdDelimiter: ["{", "}"],
      template,

      additionalJsContext: {
        quotationNo,
        date: moment(date).format("DD/MM/YYYY"),
        sales: quotation.salesName,
        reference,
        name: `${quotation.billToDetails.prefix.label}. ${quotation.billToDetails.name}`,
        address: quotation.billToDetails.address,
        road: quotation.billToDetails.road,
        location: quotation.billToDetails.location,
        nearBy: quotation.billToDetails.landmark,
        city: `${quotation.billToDetails.city}-${quotation.billToDetails.pincode}`,
        payment: quotation.payment,
        shipToDetails: quotation.shipToDetails,
      },
    });

    const clientName = `${quotation.shipToDetails[0].name} ${quotation.number}`;
    const fileName = clientName.replace(/\//g, "-");
    const filePath = `./tmp/${fileName}.docx`;

    fs.writeFileSync(filePath, buffer);

    const link = await uploadFile({ filePath, folder: "Eppl/Quotation" });
    if (link) {
      if (req.body.revised) {
        quotation.revisedCount += 1;
        quotation.date = req.body.date;
        quotation.number = quotationNo;
      }
      quotation.docx = link;
      await quotation.save();
      return res.status(201).json({
        msg: `${quotation.number} revised`,
        link,
        clientName,
      });
    }
    res.status(400).json({ msg: "Quotation not created, try again later" });
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

    req.body.docx = "";

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

export const deleteQuotation = async (req, res) => {
  const { id } = req.params;
  try {
    const quotation = await Quotation.findById(id);
    if (!quotation) return res.status(404).json({ msg: "Quotation not found" });

    await Quotation.findByIdAndDelete(id);
    return res.json({ msg: "Quotation deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};
