import type { CalculatorState, CalculatorAction } from '../types';
import { PHONE_NUMBER, PHONE_HREF, WHATSAPP_NUMBER, SESSION_KEY } from '../lib/constants';

interface Props {
  state: CalculatorState;
  dispatch: (action: CalculatorAction) => void;
}

export function StepResult({ state, dispatch }: Props) {
  const { priceResult } = state;

  if (!priceResult) {
    return (
      <div class="text-center py-12">
        <div class="animate-spin w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full mx-auto" />
        <p class="mt-4 text-slate-500">Calculating your quote...</p>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hi, I just got a quote estimate of £${priceResult.total.toFixed(2)} from your website. Here are photos of what needs clearing:`,
  );
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div>
      {/* Price display */}
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Quote request received
        </div>
        <h3 class="text-2xl font-bold text-brand-navy mb-1">Your Estimated Price</h3>
        <p class="text-5xl font-extrabold text-brand-green">
          &pound;{priceResult.total.toFixed(2)}
        </p>
        <p class="mt-2 text-sm text-slate-500">
          This is a guide price. For your exact, locked-in quote, we'll contact you within 2 hours.
        </p>
      </div>

      {/* Breakdown */}
      <div class="bg-slate-50 rounded-xl p-4 mb-6">
        <h4 class="font-semibold text-sm text-brand-navy mb-3">Price breakdown</h4>
        <div class="space-y-2">
          {priceResult.breakdown.map((item, i) => (
            <div key={i} class="flex justify-between text-sm">
              <span class="text-slate-600">
                {item.label}
                {item.quantity > 1 && item.label !== 'Access difficulty surcharge (20%)' && (
                  <span class="text-slate-400"> x{item.quantity}</span>
                )}
              </span>
              <span class="font-medium text-slate-800">&pound;{item.lineTotal.toFixed(2)}</span>
            </div>
          ))}
          <div class="pt-2 border-t border-slate-200 flex justify-between font-bold">
            <span class="text-brand-navy">Total estimate</span>
            <span class="text-brand-green">&pound;{priceResult.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Price Lock badge */}
      <div class="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <span class="text-2xl">🔒</span>
        <div>
          <p class="font-semibold text-sm text-amber-800">Price Lock Guarantee</p>
          <p class="text-xs text-amber-700">
            Your final quote will never go up. If there's less to clear, you pay less.
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div class="space-y-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener"
          class="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-lg transition-colors"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Send Photos via WhatsApp for Firm Quote
        </a>
        <a
          href={PHONE_HREF}
          class="flex items-center justify-center gap-2 w-full py-3 border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-semibold rounded-lg transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
          Call {PHONE_NUMBER} for Instant Quote
        </a>
      </div>

      {/* What happens next */}
      <div class="mt-8 bg-slate-50 rounded-xl p-4">
        <h4 class="font-semibold text-sm text-brand-navy mb-3">What happens next?</h4>
        <ol class="space-y-3 text-sm text-slate-600">
          <li class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-brand-green text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
            <span>We review your details and prepare your firm, locked-in quote (within 2 hours)</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-brand-green text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
            <span>We send your quote by email and WhatsApp — your price never goes up</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-brand-green text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
            <span>You confirm and we book your slot — same day available if you're in a rush</span>
          </li>
        </ol>
      </div>

      {/* Start over */}
      <div class="mt-6 text-center">
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem(SESSION_KEY);
            dispatch({ type: 'RESET' });
          }}
          class="text-sm text-slate-400 hover:text-slate-600 underline"
        >
          Start a new quote
        </button>
      </div>
    </div>
  );
}
