import nodemailer from "nodemailer";

// No mail provider is configured yet by default (SMTP_HOST is blank in
// .env). When it's blank, emails are logged to the console instead of
// thrown away silently, so the password-reset flow is still visibly
// "sent" during local development. Set SMTP_HOST/PORT/USER/PASS in .env
// (any real SMTP provider — Mailtrap, SES, Gmail app password, etc.) to
// actually deliver mail.
const isConfigured = Boolean(process.env.SMTP_HOST);

const transporter = isConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    })
  : null;

export const sendMail = async ({ to, subject, html }) => {
  if (!isConfigured) {
    console.log(`[mailer] SMTP not configured — would have sent to ${to}: "${subject}"\n${html}`);
    return { delivered: false };
  }

  await transporter.sendMail({
    from: process.env.MAIL_FROM || "no-reply@ecommerce.test",
    to,
    subject,
    html,
  });

  return { delivered: true };
};
