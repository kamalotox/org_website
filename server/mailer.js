import nodemailer from 'nodemailer';
import { sanitizeHeaderValue } from './emailTemplates.js';
import { OTOX_LOGO_CID, getEmailLogoAttachment } from './logoAsset.js';

export function getSmtpConfig(env = process.env) {
  const host = (env.SMTP_HOST || 'smtp.gmail.com').trim();
  const parsedPort = Number.parseInt(env.SMTP_PORT || '465', 10);
  const port = Number.isFinite(parsedPort) && parsedPort > 0 ? parsedPort : 465;

  const secureEnv = (env.SMTP_SECURE || '').trim().toLowerCase();
  const secure = secureEnv ? secureEnv === 'true' : port === 465;

  const user = (env.SMTP_USER || '').trim();
  const pass = (env.SMTP_PASS || '').trim();

  const fromName = sanitizeHeaderValue(env.MAIL_FROM_NAME || 'OTOX Website Enquiries');
  const fromEmail = sanitizeHeaderValue(env.MAIL_FROM_EMAIL || user);
  const toEmail = sanitizeHeaderValue(env.MAIL_TO || user || 'kamalotox@gmail.com');

  return {
    host,
    port,
    secure,
    user,
    pass,
    fromName,
    fromEmail,
    toEmail
  };
}

/**
 * Sends a rendered enquiry email over SMTP using Nodemailer.
 * Supports dependency injection of a custom transporter for unit/integration tests.
 */
export async function sendEnquiryEmail(emailContent, options = {}) {
  const config = getSmtpConfig(options.env || process.env);

  if (!options.transporter && (!config.user || !config.pass)) {
    const err = new Error(
      'SMTP credentials are not configured. Set SMTP_USER and SMTP_PASS in your environment.'
    );
    err.code = 'SMTP_CONFIG_MISSING';
    err.statusCode = 503;
    throw err;
  }

  const transporter =
    options.transporter ||
    nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000
    });

  const fromAddress = config.fromEmail
    ? `"${config.fromName.replace(/"/g, '')}" <${config.fromEmail}>`
    : undefined;

  const attachments = [...(emailContent.attachments || [])];
  if (
    typeof emailContent.html === 'string' &&
    emailContent.html.includes(`cid:${OTOX_LOGO_CID}`) &&
    !attachments.some((item) => item?.cid === OTOX_LOGO_CID)
  ) {
    attachments.push(getEmailLogoAttachment());
  }

  const mailOptions = {
    from: fromAddress,
    to: config.toEmail,
    replyTo: emailContent.replyTo,
    subject: emailContent.subject,
    text: emailContent.text,
    html: emailContent.html,
    ...(attachments.length > 0 ? { attachments } : {})
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return {
      messageId: info?.messageId || null,
      to: config.toEmail
    };
  } finally {
    if (!options.transporter && typeof transporter.close === 'function') {
      transporter.close();
    }
  }
}
