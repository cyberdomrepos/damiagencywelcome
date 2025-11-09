// Simple test endpoint to trigger a one-off SendGrid send when configured.
// POST to this route with a JSON payload to attempt a send to the admin inbox.

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const FROM_EMAIL = process.env.SENDGRID_FROM || `no-reply@damiagency.com`;
    const TO_EMAIL = "damiagencyadmin@damiagency.com";

    if (!SENDGRID_API_KEY) {
      return new Response(JSON.stringify({ ok: false, error: 'no_sendgrid', message: 'SENDGRID_API_KEY not configured on server' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    const subject = `Test quote send — ${body?.serviceType || 'general'}`;
    const plain = Object.entries(body || {})
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
      .join('\n');

    const payload = {
      personalizations: [
        { to: [{ email: TO_EMAIL }], subject },
      ],
      from: { email: FROM_EMAIL },
      content: [
        { type: 'text/plain', value: plain },
        { type: 'text/html', value: `<pre style="white-space:pre-wrap">${plain}</pre>` },
      ],
    };

    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return new Response(JSON.stringify({ ok: false, error: 'send_failed', status: res.status, detail: text }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true, sent: true, to: TO_EMAIL }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
