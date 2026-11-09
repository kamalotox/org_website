import crypto from 'node:crypto';

export const DEPARTMENT_LABELS = {
  general: 'General Enquiries',
  driver: 'Driver Support & Onboarding',
  partnerships: 'Partnerships & Collaborations',
  technical: 'Technical Support'
};

export const FORM_SOURCES = {
  'contact-page': {
    id: 'contact-page',
    badge: 'CONTACT PAGE',
    title: 'Contact Page — Direct Message Form',
    shortLabel: 'Contact Form',
    defaultRoute: '/contact',
    badgeBg: '#DBEAFE',
    badgeBorder: '#93C5FD',
    badgeText: '#1E3A8A'
  },
  'drivers-page': {
    id: 'drivers-page',
    badge: 'FOR DRIVERS PAGE',
    title: 'For Drivers Page — Verification Kit Form',
    shortLabel: 'Drivers Page',
    defaultRoute: '/drivers',
    badgeBg: '#FEF3C7',
    badgeBorder: '#FCD34D',
    badgeText: '#78350F'
  },
  'driver-modal': {
    id: 'driver-modal',
    badge: 'DRIVER POPUP MODAL',
    title: 'Quick Driver Modal — Verification Request Form',
    shortLabel: 'Driver Modal',
    defaultRoute: '/',
    badgeBg: '#D1FAE5',
    badgeBorder: '#6EE7B7',
    badgeText: '#064E3B'
  }
};

const EMAIL_REGEX = /^[^\s@<>()[\]\\,;:"']+@[^\s@<>()[\]\\,;:"']+\.[^\s@<>()[\]\\,;:"']{2,}$/;

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sanitizeHeaderValue(value) {
  return String(value ?? '')
    .replace(/[\r\n\u0000-\u001F\u007F]+/g, ' ')
    .trim();
}

function cleanText(value, maxLength = 200) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .trim()
    .slice(0, maxLength);
}

function cleanSingleLine(value, maxLength = 160) {
  return cleanText(value, maxLength).replace(/[\r\n]+/g, ' ');
}

function sanitizeTelHref(phone) {
  return String(phone ?? '').replace(/[^\d+]/g, '');
}

function countDigits(value) {
  return String(value ?? '').replace(/\D/g, '').length;
}

function formatTimestampIst(date) {
  try {
    return (
      new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date) + ' IST'
    );
  } catch {
    return date.toISOString();
  }
}

function createSubmissionId(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const rand = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `OTOX-${y}${m}${d}-${rand}`;
}

/**
 * Validates and normalizes incoming form payload from any OTOX website form.
 * Throws an Error with `statusCode = 400` if input is invalid.
 */
export function validateAndNormalizeSubmission(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    const err = new Error('Invalid JSON request payload.');
    err.statusCode = 400;
    throw err;
  }

  const formSourceKey = cleanSingleLine(payload.formSource, 40);
  const sourceMeta = FORM_SOURCES[formSourceKey];

  if (!sourceMeta) {
    const err = new Error('Unsupported or missing formSource identifier.');
    err.statusCode = 400;
    throw err;
  }

  const rawData = payload.data && typeof payload.data === 'object' ? payload.data : payload;
  const pagePath = cleanSingleLine(payload.pagePath, 160) || sourceMeta.defaultRoute;
  const triggerSource = cleanSingleLine(payload.triggerSource, 120);

  const now = new Date();
  const submissionId = createSubmissionId(now);
  const submittedAtIst = formatTimestampIst(now);
  const submittedAtIso = now.toISOString();

  if (formSourceKey === 'contact-page') {
    const name = cleanSingleLine(rawData.name, 120);
    const email = cleanSingleLine(rawData.email, 160).toLowerCase();
    const phone = cleanSingleLine(rawData.phone, 40);
    const departmentKey = DEPARTMENT_LABELS[rawData.department] ? rawData.department : 'general';
    const departmentLabel = DEPARTMENT_LABELS[departmentKey];
    const message = cleanText(rawData.message, 4000);

    if (!name) {
      const err = new Error('Please enter your full name.');
      err.statusCode = 400;
      throw err;
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      const err = new Error('Please enter a valid email address.');
      err.statusCode = 400;
      throw err;
    }
    if (phone && (countDigits(phone) < 7 || countDigits(phone) > 16)) {
      const err = new Error('Please enter a valid phone number or leave it blank.');
      err.statusCode = 400;
      throw err;
    }
    if (!message || message.length < 2) {
      const err = new Error('Please enter your message or feedback.');
      err.statusCode = 400;
      throw err;
    }

    return {
      submissionId,
      submittedAtIst,
      submittedAtIso,
      source: sourceMeta,
      pagePath,
      triggerSource: triggerSource || 'Contact Page — Direct Message Form',
      replyTo: sanitizeHeaderValue(`"${name.replace(/"/g, '')}" <${email}>`),
      subject: sanitizeHeaderValue(
        `[OTOX Contact Page] ${departmentLabel} — ${name}`
      ),
      previewText: `New ${departmentLabel} message from ${name} (${email}) via Contact Page.`,
      footerHint: `Reply directly to this email to respond to ${name} (${email}).`,
      fields: [
        { label: 'Full Name', value: name, type: 'text' },
        { label: 'Email Address', value: email, type: 'email' },
        {
          label: 'Phone Number',
          value: phone || 'Not provided',
          type: phone ? 'phone' : 'muted'
        },
        { label: 'Inquiry Category', value: departmentLabel, type: 'tag' },
        { label: 'Message / Feedback', value: message, type: 'multiline' }
      ],
      raw: { name, email, phone, department: departmentKey, departmentLabel, message }
    };
  }

  // Driver onboarding forms: drivers-page & driver-modal share identical schema
  const name = cleanSingleLine(rawData.name || rawData.fullName, 120);
  const phone = cleanSingleLine(rawData.phone, 40);
  const vehicleNo = cleanSingleLine(rawData.vehicleNo, 30).toUpperCase();
  const city = cleanSingleLine(rawData.city, 100);

  if (!name) {
    const err = new Error('Please enter the driver full name.');
    err.statusCode = 400;
    throw err;
  }
  if (!phone || countDigits(phone) < 7 || countDigits(phone) > 16) {
    const err = new Error('Please enter a valid mobile phone number.');
    err.statusCode = 400;
    throw err;
  }
  if (!vehicleNo || vehicleNo.length < 4) {
    const err = new Error('Please enter a valid vehicle registration number.');
    err.statusCode = 400;
    throw err;
  }
  if (!city) {
    const err = new Error('Please enter the city.');
    err.statusCode = 400;
    throw err;
  }

  const subjectTag =
    formSourceKey === 'drivers-page'
      ? '[OTOX For Drivers Page] Verification Kit Application'
      : '[OTOX Driver Modal] Quick Driver Registration';

  const defaultTrigger =
    formSourceKey === 'drivers-page'
      ? 'For Drivers Page — Verification Kit Form'
      : 'Header / CTA Popup Modal';

  return {
    submissionId,
    submittedAtIst,
    submittedAtIso,
    source: sourceMeta,
    pagePath,
    triggerSource: triggerSource || defaultTrigger,
    replyTo: undefined,
    subject: sanitizeHeaderValue(`${subjectTag} — ${name} (${vehicleNo})`),
    previewText: `Driver submission from ${sourceMeta.shortLabel} (${pagePath}): ${name}, ${vehicleNo}, ${city}.`,
    footerHint: `Reach out to ${name} at ${phone} to follow up on QR verification kit onboarding in ${city}.`,
    fields: [
      { label: 'Driver Full Name', value: name, type: 'text' },
      { label: 'Mobile Phone', value: phone, type: 'phone' },
      { label: 'Auto Registration No.', value: vehicleNo, type: 'code' },
      { label: 'City', value: city, type: 'text' }
    ],
    raw: { name, phone, vehicleNo, city }
  };
}

function renderFieldValueHtml(field) {
  const escaped = escapeHtml(field.value);

  if (field.type === 'email') {
    return `<a href="mailto:${escaped}" style="color:#1D4ED8;font-weight:600;text-decoration:none;">${escaped}</a>`;
  }

  if (field.type === 'phone') {
    const tel = sanitizeTelHref(field.value);
    return `<a href="tel:${escapeHtml(tel)}" style="color:#0B0B0E;font-weight:700;text-decoration:none;">${escaped}</a>`;
  }

  if (field.type === 'code') {
    return `<span style="display:inline-block;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:13px;font-weight:700;letter-spacing:0.04em;color:#0B0B0E;background-color:#FFF8E1;border:1px solid #FDE68A;border-radius:6px;padding:3px 9px;">${escaped}</span>`;
  }

  if (field.type === 'tag') {
    return `<span style="display:inline-block;font-size:12px;font-weight:700;color:#0B0B0E;background-color:#F4F4F5;border:1px solid #E4E4E7;border-radius:6px;padding:3px 9px;">${escaped}</span>`;
  }

  if (field.type === 'muted') {
    return `<span style="color:#71717A;font-style:italic;">${escaped}</span>`;
  }

  if (field.type === 'multiline') {
    const formatted = escaped.replace(/\n/g, '<br />');
    return `<div style="background-color:#F8F9FA;border:1px solid #E4E4E7;border-radius:8px;padding:12px 14px;color:#18181B;font-size:14px;line-height:1.6;">${formatted}</div>`;
  }

  return `<span style="color:#0B0B0E;font-weight:600;">${escaped}</span>`;
}

/**
 * Generates branded HTML + plain-text email templates with explicit source attribution.
 */
export function buildSubmissionEmail(normalized, options = {}) {
  const recipientEmail = options.recipientEmail || 'kamalotox@gmail.com';
  const { source, submissionId, submittedAtIst, pagePath, triggerSource, fields, footerHint } =
    normalized;

  const fieldRowsHtml = fields
    .map((field) => {
      if (field.type === 'multiline') {
        return `
          <tr>
            <td colspan="2" style="padding:14px 18px 16px 18px;border-top:1px solid #E4E4E7;">
              <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#71717A;margin-bottom:8px;">
                ${escapeHtml(field.label)}
              </div>
              ${renderFieldValueHtml(field)}
            </td>
          </tr>
        `;
      }

      return `
        <tr>
          <td width="34%" valign="top" style="padding:12px 14px 12px 18px;border-top:1px solid #E4E4E7;font-size:12px;font-weight:700;color:#71717A;white-space:nowrap;">
            ${escapeHtml(field.label)}
          </td>
          <td width="66%" valign="top" style="padding:12px 18px 12px 10px;border-top:1px solid #E4E4E7;font-size:14px;line-height:1.5;color:#0B0B0E;">
            ${renderFieldValueHtml(field)}
          </td>
        </tr>
      `;
    })
    .join('');

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(normalized.subject)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#F4F4F6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0B0B0E;">
    <!-- Hidden Email Client Preview Text -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
      ${escapeHtml(normalized.previewText)}
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F4F4F6;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background-color:#FFFFFF;border:1px solid #E4E4E7;border-radius:14px;overflow:hidden;">
            <!-- Header -->
            <tr>
              <td style="background-color:#0B0B0F;padding:20px 24px;border-bottom:4px solid #FFC107;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td align="left" valign="middle">
                      <span style="font-size:22px;font-weight:800;letter-spacing:-0.04em;color:#FFFFFF;">OT</span><span style="font-size:22px;font-weight:800;letter-spacing:-0.04em;color:#FFC107;">O</span><span style="font-size:22px;font-weight:800;letter-spacing:-0.04em;color:#FFFFFF;">X</span>
                    </td>
                    <td align="right" valign="middle" style="font-size:12px;font-weight:600;color:#A1A1AA;letter-spacing:0.02em;">
                      Website Enquiry Alert
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Form Source Identification Banner -->
            <tr>
              <td style="padding:22px 24px 18px 24px;background-color:#FAFAFC;border-bottom:1px solid #E4E4E7;">
                <div style="margin-bottom:10px;">
                  <span style="display:inline-block;background-color:${source.badgeBg};border:1px solid ${source.badgeBorder};color:${source.badgeText};font-size:11px;font-weight:800;letter-spacing:0.06em;padding:4px 10px;border-radius:999px;">
                    SOURCE: ${escapeHtml(source.badge)}
                  </span>
                </div>
                <h1 style="margin:0 0 12px 0;font-size:19px;font-weight:800;line-height:1.3;color:#0B0B0E;">
                  ${escapeHtml(source.title)}
                </h1>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#FFFFFF;border:1px solid #E4E4E7;border-radius:10px;">
                  <tr>
                    <td valign="top" style="padding:8px 12px;font-size:12px;color:#52525B;border-bottom:1px solid #F4F4F5;" width="50%">
                      <strong style="color:#0B0B0E;">Page Path:</strong> <code style="font-family:monospace;font-size:12px;color:#0B0B0E;">${escapeHtml(pagePath)}</code>
                    </td>
                    <td valign="top" style="padding:8px 12px;font-size:12px;color:#52525B;border-bottom:1px solid #F4F4F5;" width="50%">
                      <strong style="color:#0B0B0E;">Submitted:</strong> ${escapeHtml(submittedAtIst)}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" valign="top" style="padding:8px 12px;font-size:12px;color:#52525B;">
                      <strong style="color:#0B0B0E;">Placement:</strong> ${escapeHtml(triggerSource)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Submitted Form Data -->
            <tr>
              <td style="padding:20px 24px 10px 24px;">
                <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#52525B;margin-bottom:10px;">
                  Submitted Details
                </div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #E4E4E7;border-radius:10px;border-collapse:separate;overflow:hidden;">
                  <tr>
                    <td width="34%" style="padding:11px 14px 11px 18px;background-color:#F9FAFB;font-size:12px;font-weight:700;color:#71717A;">
                      Reference ID
                    </td>
                    <td width="66%" style="padding:11px 18px 11px 10px;background-color:#F9FAFB;font-family:monospace;font-size:12px;font-weight:700;color:#27272A;">
                      ${escapeHtml(submissionId)}
                    </td>
                  </tr>
                  ${fieldRowsHtml}
                </table>
              </td>
            </tr>

            <!-- Next Action Note -->
            <tr>
              <td style="padding:12px 24px 22px 24px;">
                <div style="background-color:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:11px 14px;font-size:13px;line-height:1.5;color:#78350F;">
                  ${escapeHtml(footerHint)}
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:14px 24px;background-color:#FAFAFC;border-top:1px solid #E4E4E7;font-size:11px;line-height:1.5;color:#71717A;">
                Automated notification from the OTOX website (<code style="font-family:monospace;">${escapeHtml(recipientEmail)}</code>) &bull; &copy; 2026 OTOX.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const fieldLinesText = fields
    .map((field) => {
      if (field.type === 'multiline') {
        return `\n${field.label}:\n${'-'.repeat(30)}\n${field.value}\n${'-'.repeat(30)}`;
      }
      return `${field.label.padEnd(24, ' ')}: ${field.value}`;
    })
    .join('\n');

  const text = [
    'OTOX WEBSITE — NEW FORM SUBMISSION',
    '==================================================',
    `SUBMITTED FROM FORM : ${source.title}`,
    `PAGE PATH           : ${pagePath}`,
    `PLACEMENT           : ${triggerSource}`,
    `REFERENCE ID        : ${submissionId}`,
    `SUBMITTED AT        : ${submittedAtIst}`,
    '==================================================',
    '',
    'SUBMITTED DETAILS:',
    fieldLinesText,
    '',
    `NEXT STEP: ${footerHint}`
  ].join('\n');

  return {
    subject: normalized.subject,
    replyTo: normalized.replyTo,
    html,
    text
  };
}
