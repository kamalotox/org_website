/**
 * Submits website enquiries to `/api/submit-form` with explicit form source metadata
 * so every SMTP notification clearly identifies which form generated it.
 */
export async function submitWebsiteForm({ formSource, pagePath, triggerSource, data }) {
  const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
  const endpoint = `${apiBase}/api/submit-form`;

  const resolvedPagePath =
    pagePath || (typeof window !== 'undefined' ? window.location.pathname : '/');

  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        formSource,
        pagePath: resolvedPagePath,
        triggerSource,
        data
      })
    });
  } catch {
    throw new Error(
      'Network error while sending your submission. Please check your internet connection and try again.'
    );
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok || !payload?.ok) {
    throw new Error(
      payload?.error ||
        'Unable to submit your request right now. Please try again or email support@otoxmobility.com.'
    );
  }

  return payload;
}
