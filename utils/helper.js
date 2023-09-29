// import jwt from "jsonwebtoken";
import moment from "moment";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import SibApiV3Sdk from "@getbrevo/brevo";

export const capitalLetter = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const uploadFile = async ({ filePath, folder }) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      use_filename: true,
      folder,
      quality: 40,
      resource_type: "auto",
    });

    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (error) {
    console.log("Cloud Upload", error);
    return false;
  }
};

export const sendEmail = async ({
  attachment,
  dynamicData,
  emailList,
  templateId,
}) => {
  try {
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "EPCORN",
      email: process.env.NO_REPLY_EMAIL,
    };
    sendSmtpEmail.to = emailList;
    sendSmtpEmail.params = dynamicData;
    sendSmtpEmail.templateId = templateId;
    if (attachment) sendSmtpEmail.attachment = attachment;
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
