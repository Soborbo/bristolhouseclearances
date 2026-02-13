import { useState, useRef } from 'preact/hooks';
import type { CalculatorState, CalculatorAction } from '../types';
import { usePostcodeLookup } from '../hooks/usePostcodeLookup';

interface Props {
  state: CalculatorState;
  dispatch: (action: CalculatorAction) => void;
}

export function StepAddress({ state, dispatch }: Props) {
  const { lookup, loading: postcodeLoading, result: postcodeResult } = usePostcodeLookup();
  const [distanceLoading, setDistanceLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const isValid =
    state.address.line1.trim().length > 0 &&
    state.address.postcode.trim().length >= 5;

  async function handlePostcodeBlur() {
    const pc = state.address.postcode.trim();
    if (pc.length >= 5) {
      await lookup(pc);
      // Abort any in-flight distance request
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;

      // Calculate distance via our API
      setDistanceLoading(true);
      try {
        const res = await fetch('/api/distance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address: state.address.line1,
            postcode: pc,
          }),
          signal: controller.signal,
        });
        const data = await res.json();
        if (data.success && data.data) {
          dispatch({ type: 'SET_DISTANCE', miles: data.data.miles });
        }
      } catch (err) {
        // Ignore abort errors; distance calc failure is not critical
        if (err instanceof DOMException && err.name === 'AbortError') return;
      } finally {
        setDistanceLoading(false);
      }
    }
  }

  return (
    <div>
      <h3 class="text-xl font-bold text-brand-navy mb-2">
        Where is the pickup?
      </h3>
      <p class="text-slate-500 text-sm mb-6">
        We need your address to calculate distance and provide an accurate estimate.
      </p>

      <div class="space-y-4 max-w-md">
        <div>
          <label htmlFor="calc-street" class="block text-sm font-medium text-slate-700 mb-1">
            Street address
          </label>
          <input
            id="calc-street"
            type="text"
            value={state.address.line1}
            maxLength={200}
            onInput={(e) =>
              dispatch({
                type: 'SET_ADDRESS',
                field: 'line1',
                value: (e.target as HTMLInputElement).value,
              })
            }
            placeholder="123 Example Street"
            class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition"
            required
          />
        </div>

        <div>
          <label htmlFor="calc-city" class="block text-sm font-medium text-slate-700 mb-1">
            City
          </label>
          <input
            id="calc-city"
            type="text"
            value={state.address.city}
            maxLength={200}
            onInput={(e) =>
              dispatch({
                type: 'SET_ADDRESS',
                field: 'city',
                value: (e.target as HTMLInputElement).value,
              })
            }
            placeholder="Bristol"
            class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="calc-postcode" class="block text-sm font-medium text-slate-700 mb-1">
            Postcode
          </label>
          <input
            id="calc-postcode"
            type="text"
            value={state.address.postcode}
            maxLength={10}
            onInput={(e) =>
              dispatch({
                type: 'SET_ADDRESS',
                field: 'postcode',
                value: (e.target as HTMLInputElement).value.toUpperCase(),
              })
            }
            onBlur={handlePostcodeBlur}
            placeholder="BS1 1AA"
            class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition"
            required
          />
          {postcodeLoading && (
            <p class="mt-1 text-xs text-slate-400">Verifying postcode...</p>
          )}
          {postcodeResult && !postcodeResult.valid && (
            <p class="mt-1 text-xs text-red-500">{postcodeResult.error}</p>
          )}
          {postcodeResult?.valid && (
            <p class="mt-1 text-xs text-green-600">Postcode verified</p>
          )}
          {distanceLoading && (
            <p class="mt-1 text-xs text-slate-400">Calculating distance...</p>
          )}
          {state.distance.calculated && (
            <p class="mt-1 text-xs text-slate-500">
              {state.distance.miles} miles from our depot
            </p>
          )}
        </div>
      </div>

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
          onClick={() => dispatch({ type: 'NEXT_STEP' })}
          disabled={!isValid}
          class="px-6 py-2.5 bg-brand-green hover:bg-brand-green-dark disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          Next &rarr;
        </button>
      </div>

      <p class="mt-4 text-center text-xs text-slate-400">
        We cover Bristol, Bath &amp; 30 miles surrounding
      </p>
    </div>
  );
}
