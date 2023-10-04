import Quotation from "../models/quotationModel.js";
import fs from "fs";
import { createReport } from "docx-templates";
import moment from "moment";
import {
  createQuotationDoc,
  sendEmail,
  uploadFile,
} from "../utils/helperFunctions.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const createQuotation = async (req, res) => {
  try {
    req.body.number = "EPPL/QTN/444";
    const quotation = req.body;

    let otherReference = "";
    if (quotation.otherReference)
      otherReference = `2. ${quotation.otherReference}`;

    const template = fs.readFileSync("./tmp/quotation1.docx");
    const data = {
      quotationNo: quotation.number,
      date: moment(quotation.date).format("DD/MM/YYYY"),
      sales: quotation.salesName,
      reference: `Your enquiry and our discussion had with ${quotation.referenceName}`,
      otherReference,
      name: `${quotation.billToDetails.prefix.label}. ${quotation.billToDetails.name}`,
      address: quotation.billToDetails.address,
      road: quotation.billToDetails.road,
      location: quotation.billToDetails.location,
      nearBy: quotation.billToDetails.landmark,
      city: `${quotation.billToDetails.city}-${quotation.billToDetails.pincode}`,
      payment: quotation.payment,
      shipToDetails: quotation.shipToDetails,
    };

    const buffer = await createQuotationDoc({ template, data });
    if (buffer) {
      const clientName = `${quotation.shipToDetails[0].name} ${quotation.number}.docx`;
      const fileName = clientName.replace(/\//g, "-");
      const filePath = `./tmp/${fileName}`;
      fs.writeFileSync(filePath, buffer);

      const link = await uploadFile({ filePath, folder: "Eppl/Quotation" });
      if (link) {
        req.body.docx = link;
        const newQuotation = await Quotation.create(req.body);
        return res.status(201).json({
          msg: `${newQuotation.number} created`,
          link,
          clientName,
        });
      }
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
      let tempNo = quotation.number.split("/");
      quotationNo = `EPPL/QTN/${tempNo[2]}/R-${quotation.revisedCount + 1}`;
      date = req.body.date;
    }

    let otherReference = "";
    if (quotation.otherReference)
      otherReference = `2. ${quotation.otherReference}`;

    const template = fs.readFileSync("./tmp/quotation1.docx");
    const data = {
      quotationNo,
      date: moment(date).format("DD/MM/YYYY"),
      sales: quotation.salesName,
      reference,
      otherReference,
      name: `${quotation.billToDetails.prefix.label}. ${quotation.billToDetails.name}`,
      address: quotation.billToDetails.address,
      road: quotation.billToDetails.road,
      location: quotation.billToDetails.location,
      nearBy: quotation.billToDetails.landmark,
      city: `${quotation.billToDetails.city}-${quotation.billToDetails.pincode}`,
      payment: quotation.payment,
      shipToDetails: quotation.shipToDetails,
    };
    const buffer = await createQuotationDoc({ template, data });

    if (buffer) {
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
          msg: `${quotation.number} generated`,
          link,
          clientName,
        });
      }
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

export const sendQuotation = async (req, res) => {
  const { id } = req.params;
  try {
    const quotation = await Quotation.findById(id);
    if (!quotation) return res.status(404).json({ msg: "Quotation not found" });

    const emails = req.body.emails.split(",");

    const emailList = [];
    emails.map((item) => emailList.push({ email: item }));
    const attachment = [
      { url: quotation.docx, name: `Quotation ${quotation.number}.docx` },
    ];

    if (req.files) {
      let files = [];
      if (req.files.files.length > 0) files = req.files.files;
      else files.push(req.files.files);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const docPath = path.join(__dirname, "../tmp/" + `${file.name}`);
        await file.mv(docPath);
        const filePath = `tmp/${file.name}`;
        const link = await uploadFile({ filePath, folder: "Eppl/Quotation" });
        if (!link)
          return res
            .status(400)
            .json({ msg: "Upload error, please try again later" });
        attachment.push({ url: link, name: file.name });
      }
    }

    const dynamicData = {
      number: quotation.number,
    };

    const mail = await sendEmail({
      attachment,
      emailList,
      templateId: 2,
      dynamicData,
    });
    if (mail) {
      if (quotation.sentEmailData.length) {
        quotation.sentEmailData.push({
          date: new Date(),
          user: "Mayur",
        });
      } else quotation.sentEmailData = [{ date: new Date(), user: "Mayur" }];
      quotation.lastEmailSent = new Date();
      await quotation.save();
      return res.json({ msg: "Quotation sent" });
    }
    return res.status(400).json({ msg: "Quotation not send" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};
