import mongoose from "mongoose";

const shipToSchema = new mongoose.Schema({
  prefix: { type: Object, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  road: { type: String, required: true },
  location: { type: String, required: true },
  landmark: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  contact: [Object],
  serviceDetails: [
    {
      treatmentLocation: { type: String, required: true },
      service: [Object],
      cost: { type: String, required: true },
      costFrequency: { type: Object, required: true },
    },
  ],
});

const quotationSchema = new mongoose.Schema(
  {
    number: { type: String, required: true },
    date: { type: Date, required: true },
    salesName: { type: Object, required: true },
    referenceName: { type: String, required: true },
    otherReference: { type: String },
    business: { type: Object, required: true },
    billToDetails: {
      prefix: { type: Object, required: true },
      name: { type: String, required: true },
      address: { type: String, required: true },
      road: { type: String, required: true },
      location: { type: String, required: true },
      landmark: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      contact: [Object],
    },
    shipToDetails: [shipToSchema],
    payment: { type: String, required: true },
    approved: { type: Boolean, default: false },
    docx: { type: String },
    pdf: { type: String },
    revisedCount: { type: Number, default: 0 },
    sentEmailData: [Object],
    lastEmailSent: { type: Date },
    reject: { type: Boolean, default: false },
    // user: {
    //   type: Mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
  },
  { timestamps: true }
);

const Quotation = mongoose.model("Quotation", quotationSchema);
export default Quotation;
