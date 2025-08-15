const nodemailer = require('nodemailer');

const smtpTransporter = (process.env.EMAIL_HOST && process.env.EMAIL_PASS)
  ? nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false 

      }
    })
  : null;

const gmailTransporter = (process.env.GMAIL_USER && process.env.GMAIL_PASS)
  ? nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      }
    })
  : null;

if (process.env.NODE_ENV !== 'production') {
  console.log("📧 Email Transport Status:");
  console.log(smtpTransporter ? "✅ SMTP (Hostinger) is configured" : "❌ SMTP (Hostinger) NOT configured");
  console.log(gmailTransporter ? "✅ Gmail fallback is configured" : "❌ Gmail fallback NOT configured");
}

const escapeHtml = (text = '') =>
  String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;') 

    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const sendContactEmail = async ({ name, email, message }) => {

  if (!process.env.MY_EMAIL) {
    throw new Error('Configuration Error: MY_EMAIL is not defined');
  }
  if (!name || !email || !message) {
    throw new Error('Validation Error: All fields (name, email, message) are required');
  }

  const baseMailOptions = {
    to: process.env.MY_EMAIL,
    replyTo: email, 

    subject: `New Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
        <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${escapeHtml(email)}</a></p>
        <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #007bff; border-radius: 4px;">
          <p style="margin-top: 0; font-weight: bold;">Message:</p>
          ${escapeHtml(message).replace(/\n/g, '<br>')}
        </div>
        <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
        <small style="color: #888;">This email was sent from your portfolio contact form.</small>
      </div>
    `,
  };

  let lastError;

  if (smtpTransporter) {
    try {
      const info = await smtpTransporter.sendMail({
        ...baseMailOptions,
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`
      });
      console.log("✅ Sent via SMTP:", info.messageId);
      return info;
    } catch (err) {
      console.warn("⚠️ SMTP failed, attempting Gmail fallback...", err.message);
      lastError = err;
    }
  }

  if (gmailTransporter) {
    try {
      const info = await gmailTransporter.sendMail({
        ...baseMailOptions,
        from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`
      });
      console.log("✅ Sent via Gmail:", info.messageId);
      return info;
    } catch (err) {
      console.error("❌ Gmail fallback also failed.");
      lastError = err;
    }
  }

  throw lastError || new Error("No valid email transporter was configured");
};

module.exports = { sendContactEmail };