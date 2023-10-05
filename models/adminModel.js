import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  serviceName: { type: Object },
  salePerson: { type: Object },
  business: { type: Object },
  quotationNumber: { type: Number },
});

const Admin = mongoose.model("Admin", adminSchema)
export default Admin