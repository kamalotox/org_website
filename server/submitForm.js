import { validateAndNormalizeSubmission, buildSubmissionEmail } from './emailTemplates.js';
import { getSmtpConfig, sendEnquiryEmail } from './mailer.js';

const MAX_BODY_BYTES = 32 * 1024; // 32 KB limit for form payloads

function sendJson(res, statusCode, data, extraHeaders = {}) {
  const body = JSON.stringify(data);
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    for (const [k, v] of Object.entries(extraHeaders)) {
      res.setHeader(k, v);
    }
    return res.status(statusCode).json(data);
  }

  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  for (const [k, v] of Object.entries(extraHeaders)) {
    res.setHeader(k, v);
  }
  res.end(body);
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body;
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      const err = new Error('Malformed JSON request body.');
      err.statusCode = 400;
      throw err;
    }
  }

  const chunks = [];
  let totalBytes = 0;

  for await (const chunk of req) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    totalBytes += buf.length;
    if (totalBytes > MAX_BODY_BYTES) {
      const err = new Error('Request payload is too large.');
      err.statusCode = 413;
      throw err;
    }
    chunks.push(buf);
  }

  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) {
    const err = new Error('Request body cannot be empty.');
    err.statusCode = 400;
    throw err;
  }

  try {
    return JSON.parse(raw);
  } catch {
    const err = new Error('Malformed JSON request body.');
    err.statusCode = 400;
    throw err;
  }
}

export async function handleSubmitFormRequest(req, res, options = {}) {
  const method = (req.method || 'GET').toUpperCase();

  if (method === 'OPTIONS') {
    return sendJson(res, 204, {}, { Allow: 'POST, OPTIONS' });
  }

  if (method !== 'POST') {
    return sendJson(
      res,
      405,
      { ok: false, error: 'Method not allowed. Use POST.' },
      { Allow: 'POST, OPTIONS' }
    );
  }

  try {
    const payload = await readJsonBody(req);

    // Silent honeypot check to drop automated bot spam cleanly
    if (typeof payload?._honeypot === 'string' && payload._honeypot.trim().length > 0) {
      return sendJson(res, 200, {
        ok: true,
        message: 'Submission recorded.'
      });
    }

    const normalized = validateAndNormalizeSubmission(payload);
    const smtpConfig = getSmtpConfig(options.env || process.env);
    const emailContent = buildSubmissionEmail(normalized, {
      recipientEmail: smtpConfig.toEmail
    });

    const mailResult = await sendEnquiryEmail(emailContent, {
      env: options.env || process.env,
      transporter: options.transporter
    });

    return sendJson(res, 200, {
      ok: true,
      submissionId: normalized.submissionId,
      formSource: normalized.source.id,
      messageId: mailResult.messageId,
      message: 'Your submission has been sent to our team.'
    });
  } catch (err) {
    const statusCode = Number.isInteger(err?.statusCode) ? err.statusCode : 500;

    if (statusCode >= 500) {
      console.error('[OTOX Form API Error]', {
        code: err?.code,
        message: err?.message
      });
    }

    const clientMessage =
      statusCode === 400 || statusCode === 413
        ? err.message
        : err?.code === 'SMTP_CONFIG_MISSING'
          ? 'Email delivery is not configured yet on this environment. Please contact support@otoxmobility.com or +91 98765 43210.'
          : 'Unable to send your submission right now. Please try again in a moment or reach us at support@otoxmobility.com.';

    return sendJson(res, statusCode, {
      ok: false,
      error: clientMessage
    });
  }
}
