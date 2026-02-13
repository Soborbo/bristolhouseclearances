export const prerender = false;

import type { APIRoute } from 'astro';
import { submitSchema } from '../../lib/schemas';
import { calculatePrice } from '../../calculator/lib/pricing';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const parsed = submitSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid request data' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Turnstile verification
    const turnstileSecret = import.meta.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: parsed.data.turnstileToken,
        }),
      });
      const turnstileData = await turnstileRes.json() as { success: boolean };
      if (!turnstileData.success) {
        return new Response(
          JSON.stringify({ success: false, message: 'Verification failed' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } },
        );
      }
    }

    const { items, accessIssues, address, contact, distance } = parsed.data;

    // Calculate price server-side
    const priceResult = calculatePrice(items, accessIssues, distance.miles);

    // Send emails via Resend (if configured)
    const resendKey = import.meta.env.RESEND_API_KEY;
    const adminEmail = import.meta.env.ADMIN_EMAIL;
    const fromEmail = import.meta.env.FROM_EMAIL;

    if (resendKey && adminEmail && fromEmail) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(resendKey);

        // Admin notification
        const itemLines = Object.entries(items)
          .filter(([, qty]) => (qty ?? 0) > 0)
          .map(([field, qty]) => `  ${field}: ${qty}`)
          .join('\n');

        await resend.emails.send({
          from: fromEmail,
          to: adminEmail,
          subject: `New Quote Request: ${contact.firstName} ${contact.lastName} - £${priceResult.total.toFixed(2)}`,
          text: `New quote request:\n\nName: ${contact.firstName} ${contact.lastName}\nEmail: ${contact.email}\nPhone: ${contact.phone}\n\nAddress:\n${address.line1}\n${address.city || ''}\n${address.postcode}\n\nDistance: ${distance.miles} miles\n\nItems:\n${itemLines}\n\nAccess issues: ${accessIssues.join(', ') || 'None'}\nNotes: ${contact.notes || 'None'}\n\nEstimated price: £${priceResult.total.toFixed(2)}`,
        });

        // Customer confirmation
        await resend.emails.send({
          from: fromEmail,
          to: contact.email,
          subject: 'Your Bristol House Clearances Quote Request',
          text: `Dear ${contact.firstName},\n\nThank you for your quote request. Your estimated price is £${priceResult.total.toFixed(2)}.\n\nWe'll review your details and send you a firm, locked-in quote within 2 hours.\n\nWant it faster? Send us photos via WhatsApp or call us on 0117 123 4567.\n\nBest regards,\nBristol House Clearances`,
        });
      } catch (emailErr) {
        console.error('Email send failed:', emailErr);
      }
    }

    // Log to Google Sheets (fire and forget)
    const sheetsId = import.meta.env.GOOGLE_SHEETS_ID;
    const saEmail = import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const saKey = import.meta.env.GOOGLE_SERVICE_ACCOUNT_KEY;

    if (sheetsId && saEmail && saKey) {
      import('../../lib/google-sheets').then(({ appendToSheet }) =>
        appendToSheet(sheetsId, saEmail, saKey, [
          new Date().toISOString(),
          `${contact.firstName} ${contact.lastName}`,
          contact.email,
          contact.phone,
          `${address.line1}, ${address.postcode}`,
          distance.miles,
          JSON.stringify(items),
          accessIssues.join(', '),
          priceResult.total,
          contact.notes || '',
        ]),
      ).catch(() => {});
    }

    return new Response(
      JSON.stringify({ success: true, price: priceResult }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('Submit error:', err);
    return new Response(
      JSON.stringify({ success: false, message: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
