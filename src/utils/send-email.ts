import nodemailer, { Transporter } from "nodemailer";

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
      user: process.env.GOOGLE_ACCOUNT,
      pass: process.env.GOOGLE_APP_PASSWORD,
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
    console.log("Email sent: " + info.response);
    return info;
  } catch (err) {
    console.error(err);
  }
};
