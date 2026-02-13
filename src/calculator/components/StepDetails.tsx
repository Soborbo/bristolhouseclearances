import { useState, useRef } from 'preact/hooks';
import type { CalculatorState, CalculatorAction } from '../types';
import { calculatePrice } from '../lib/pricing';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Props {
  state: CalculatorState;
  dispatch: (action: CalculatorAction) => void;
}

export function StepDetails({ state, dispatch }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const submittingRef = useRef(false);

  const isValid =
    state.contact.firstName.trim().length > 0 &&
    state.contact.lastName.trim().length > 0 &&
    EMAIL_RE.test(state.contact.email) &&
    state.contact.phone.replace(/\D/g, '').length >= 10 &&
    state.gdprConsent;

  async function handleSubmit() {
    if (submittingRef.current) return;

    const validationErrors: Record<string, string> = {};
    if (!state.contact.firstName.trim()) validationErrors.firstName = 'Required';
    if (!state.contact.lastName.trim()) validationErrors.lastName = 'Required';
    if (!EMAIL_RE.test(state.contact.email)) validationErrors.email = 'Valid email required';
    if (state.contact.phone.replace(/\D/g, '').length < 10) validationErrors.phone = 'Valid phone required';
    if (!state.gdprConsent) validationErrors.gdpr = 'Please agree to continue';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    submittingRef.current = true;
    setSubmitError('');
    dispatch({ type: 'SUBMIT_START' });

    // Calculate price client-side for instant display
    const priceResult = calculatePrice(
      state.items,
      state.accessIssues,
      state.distance.miles,
    );

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: state.items,
          accessIssues: state.accessIssues,
          address: state.address,
          contact: state.contact,
          distance: state.distance,
          turnstileToken: state.turnstileToken,
        }),
      });

      const data = await res.json();

      if (data.success) {
        dispatch({
          type: 'SUBMIT_SUCCESS',
          priceResult: data.price || priceResult,
        });
      } else {
        submittingRef.current = false;
        const msg = data.error || 'Something went wrong. Please try again or call us directly.';
        setSubmitError(msg);
        dispatch({ type: 'SUBMIT_ERROR', error: msg });
      }
    } catch {
      submittingRef.current = false;
      const msg = 'Network error. Please check your connection and try again.';
      setSubmitError(msg);
      dispatch({ type: 'SUBMIT_ERROR', error: msg });
    }
  }

  return (
    <div>
      <h3 class="text-xl font-bold text-brand-navy mb-2">
        Your details
      </h3>
      <p class="text-slate-500 text-sm mb-6">
        We'll send your firm quote to these details within 2 hours.
      </p>

      <div class="flex flex-col gap-4 max-w-md">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="calc-firstName" class="block text-sm font-medium text-slate-700 mb-1">First name</label>
            <input
              id="calc-firstName"
              type="text"
              value={state.contact.firstName}
              maxLength={100}
              aria-describedby={errors.firstName ? 'calc-firstName-error' : undefined}
              onInput={(e) =>
                dispatch({ type: 'SET_CONTACT', field: 'firstName', value: (e.target as HTMLInputElement).value })
              }
              class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition"
              required
            />
            {errors.firstName && <p id="calc-firstName-error" class="mt-1 text-xs text-red-500">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="calc-lastName" class="block text-sm font-medium text-slate-700 mb-1">Last name</label>
            <input
              id="calc-lastName"
              type="text"
              value={state.contact.lastName}
              maxLength={100}
              aria-describedby={errors.lastName ? 'calc-lastName-error' : undefined}
              onInput={(e) =>
                dispatch({ type: 'SET_CONTACT', field: 'lastName', value: (e.target as HTMLInputElement).value })
              }
              class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition"
              required
            />
            {errors.lastName && <p id="calc-lastName-error" class="mt-1 text-xs text-red-500">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="calc-phone" class="block text-sm font-medium text-slate-700 mb-1">Phone number</label>
          <input
            id="calc-phone"
            type="tel"
            value={state.contact.phone}
            maxLength={20}
            aria-describedby={errors.phone ? 'calc-phone-error' : undefined}
            onInput={(e) => {
              const value = (e.target as HTMLInputElement).value.replace(/[^\d\s+()-]/g, '');
              dispatch({ type: 'SET_CONTACT', field: 'phone', value });
            }}
            placeholder="07XXX XXXXXX"
            class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition"
            required
          />
          {errors.phone && <p id="calc-phone-error" class="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="calc-email" class="block text-sm font-medium text-slate-700 mb-1">Email address</label>
          <input
            id="calc-email"
            type="email"
            value={state.contact.email}
            aria-describedby={errors.email ? 'calc-email-error' : undefined}
            onInput={(e) =>
              dispatch({ type: 'SET_CONTACT', field: 'email', value: (e.target as HTMLInputElement).value })
            }
            placeholder="you@example.com"
            class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition"
            required
          />
          {errors.email && <p id="calc-email-error" class="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="calc-notes" class="block text-sm font-medium text-slate-700 mb-1">
            Notes <span class="text-slate-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="calc-notes"
            value={state.contact.notes}
            maxLength={1000}
            onInput={(e) =>
              dispatch({ type: 'SET_CONTACT', field: 'notes', value: (e.target as HTMLTextAreaElement).value })
            }
            placeholder="Anything else we should know about the job?"
            rows={3}
            class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition resize-none"
          />
        </div>

        <label class="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={state.gdprConsent}
            onChange={(e) =>
              dispatch({ type: 'SET_GDPR_CONSENT', consent: (e.target as HTMLInputElement).checked })
            }
            class="mt-0.5 w-5 h-5 rounded border-slate-300 text-brand-green focus:ring-brand-green"
          />
          <span class="text-xs text-slate-600 leading-relaxed">
            I agree to Bristol House Clearances contacting me about my quote. We'll never share your details with third parties.
          </span>
        </label>
        {errors.gdpr && <p class="text-xs text-red-500">{errors.gdpr}</p>}
      </div>

      {submitError && (
        <div class="mt-4 bg-red-50 text-red-700 rounded-lg px-4 py-3 text-sm">
          {submitError}
        </div>
      )}

      {state.error && !submitError && (
        <div class="mt-4 bg-red-50 text-red-700 rounded-lg px-4 py-3 text-sm">
          {state.error}
        </div>
      )}

      <div class="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => dispatch({ type: 'PREV_STEP' })}
          class="px-6 py-2.5 border border-slate-300 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
        >
          &larr; Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || state.submitting}
          class="px-6 py-2.5 bg-brand-green hover:bg-brand-green-dark disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          {state.submitting ? 'Calculating...' : 'Get My Quote'}
        </button>
      </div>

      <p class="mt-4 text-center text-xs text-slate-400">
        We respond within 2 hours
      </p>
    </div>
  );
}
