export const prerender = false;

import type { APIRoute } from 'astro';
import { contactSchema } from '../../lib/schemas';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // Honeypot check — bots fill the hidden "website" field
    if (body.website) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid request data' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const { name, phone, email, postcode, message } = parsed.data;

    const resendKey = import.meta.env.RESEND_API_KEY;
    const adminEmail = import.meta.env.ADMIN_EMAIL;
    const fromEmail = import.meta.env.FROM_EMAIL;

    if (resendKey && adminEmail && fromEmail) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(resendKey);

        await resend.emails.send({
          from: fromEmail,
          to: adminEmail,
          subject: `Contact Form: ${name}`,
          text: `New contact form submission:\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nPostcode: ${postcode || 'Not provided'}\n\nMessage:\n${message || 'No message'}`,
        });
      } catch (emailErr) {
        console.error('Email send failed:', emailErr);
      }
    }

    // Log to Google Sheets
    const sheetsId = import.meta.env.GOOGLE_SHEETS_ID;
    const saEmail = import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const saKey = import.meta.env.GOOGLE_SERVICE_ACCOUNT_KEY;

    if (sheetsId && saEmail && saKey) {
      import('../../lib/google-sheets').then(({ appendToSheet }) =>
        appendToSheet(sheetsId, saEmail, saKey, [
          new Date().toISOString(),
          'contact',
          name,
          email,
          phone,
          postcode || '',
          message || '',
        ]),
      ).catch(() => {});
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('Contact error:', err);
    return new Response(
      JSON.stringify({ success: false, message: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
