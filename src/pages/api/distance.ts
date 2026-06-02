export const prerender = false;

import type { APIRoute } from 'astro';
import { distanceSchema } from '../../lib/schemas';

const HQ_POSTCODE = 'BS34 6FE';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const parsed = distanceSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid request data' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const apiKey = import.meta.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      // Fallback: estimate based on postcode prefix
      return new Response(
        JSON.stringify({
          success: true,
          data: { miles: 5, distanceText: '~5 miles (estimated)', durationText: '~15 min' },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const { address, postcode } = parsed.data;
    const origin = encodeURIComponent(`${HQ_POSTCODE}, UK`);
    const destination = encodeURIComponent(`${address} ${postcode}, UK`);

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== 'OK') {
      return new Response(
        JSON.stringify({ success: false, message: 'Distance calculation failed' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const element = data.rows?.[0]?.elements?.[0];
    if (!element || element.status !== 'OK') {
      return new Response(
        JSON.stringify({ success: false, message: 'Location not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const miles = Math.round((element.distance.value / 1609.34) * 10) / 10;
    const durationMins = Math.round(element.duration.value / 60);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          miles,
          distanceText: `${miles} miles`,
          durationText: `${durationMins} min`,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('Distance error:', err);
    return new Response(
      JSON.stringify({ success: false, message: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
