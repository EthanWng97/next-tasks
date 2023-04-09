import nodemailer, { Transporter } from "nodemailer";
import envs from "@/envs";

export const sendEmail = async (
  fromEmail: string,
  toEmail: string,
  subject: string,
  text: string,
  fileName: string,
  fileData: any
) => {
  const transporter: Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: envs.value.google.account,
      pass: envs.value.google.app_password,
    },
  });

  const mailOptions = {
    from: fromEmail,
    to: toEmail,
    subject: subject,
    text: text,
    attachments: [
      {
        filename: fileName,
        content: fileData,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.accepted);
  } catch (err) {
    throw err;
  }
};
