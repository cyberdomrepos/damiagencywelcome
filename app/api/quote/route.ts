// Minimal API route to satisfy Next's dev-time type generation.
// Replace with your full implementation when ready.

export async function GET() {
	return new Response(JSON.stringify({ ok: true, route: "quote" }), {
		status: 200,
		headers: { "content-type": "application/json" },
	});
}

export async function POST(req: Request) {
	try {
		const body = await req.json().catch(() => null);

		// If a SendGrid API key is provided via env, attempt to send a transactional email.
	const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
	// Force all quote emails to a single administrative inbox per request from the owner.
	// Do not rely on environment-provided TO_EMAIL here — use the address below only.
	const TO_EMAIL = "damiagencyadmin@damiagency.com";
	const FROM_EMAIL = process.env.SENDGRID_FROM || `no-reply@damiagency.com`;

		if (SENDGRID_API_KEY && body) {
			const subject = `New quote request — ${body.serviceType || "general"}`;
			const plain = Object.entries(body)
				.map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
				.join("\n");

			const payload = {
				personalizations: [
					{
						to: [{ email: TO_EMAIL }],
						subject,
					},
				],
				from: { email: FROM_EMAIL },
				content: [
					{ type: "text/plain", value: plain },
					{ type: "text/html", value: `<pre style="white-space:pre-wrap">${plain}</pre>` },
				],
			};

			const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${SENDGRID_API_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				const text = await res.text().catch(() => "");
				console.error("SendGrid error:", res.status, text);
				return new Response(JSON.stringify({ ok: false, error: "sendgrid_error", status: res.status, detail: text }), {
					status: 500,
					headers: { "content-type": "application/json" },
				});
			}

			return new Response(JSON.stringify({ ok: true, sent: true }), {
				status: 200,
				headers: { "content-type": "application/json" },
			});
		}

		// Fallback: no transactional provider configured — log the payload for now and return success.
		console.log("Quote request received (no provider configured):", body);

		return new Response(JSON.stringify({ ok: true, received: !!body, note: "no-provider" }), {
			status: 200,
			headers: { "content-type": "application/json" },
		});
	} catch (err) {
		return new Response(JSON.stringify({ ok: false, error: String(err) }), {
			status: 500,
			headers: { "content-type": "application/json" },
		});
	}
}
