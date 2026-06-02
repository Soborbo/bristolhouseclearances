import type { CalculatorState, CalculatorAction } from '../types';
import { ACCESS_ISSUES } from '../lib/access-issues';

interface Props {
  state: CalculatorState;
  dispatch: (action: CalculatorAction) => void;
}

export function StepAccess({ state, dispatch }: Props) {
  return (
    <div>
      <h3 class="text-xl font-bold text-brand-navy mb-2">
        Any access difficulties?
      </h3>
      <p class="text-slate-500 text-sm mb-6">
        Tick any that apply to your property. This helps us quote accurately. Optional — skip if none apply.
      </p>

      <div class="grid grid-cols-4 gap-3">
        {ACCESS_ISSUES.map((issue) => {
          const isSelected = state.accessIssues.includes(issue.id);
          return (
            <button
              key={issue.id}
              type="button"
              role="checkbox"
              aria-pressed={isSelected}
              onClick={() => dispatch({ type: 'TOGGLE_ACCESS', issueId: issue.id })}
              class={`relative rounded-lg overflow-hidden transition-all ring-3 ${
                isSelected
                  ? 'ring-brand-green shadow-md'
                  : 'ring-transparent hover:ring-slate-300'
              }`}
            >
              <img
                src={issue.image}
                alt={issue.label}
                class="w-full block"
                loading="lazy"
              />
              {isSelected && (
                <div class="absolute top-2 right-2 w-6 h-6 rounded-full bg-brand-green flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {state.accessIssues.length > 0 && (
        <p class="mt-3 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
          Access difficulties may add up to 20% to the estimate.
        </p>
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
          onClick={() => dispatch({ type: 'NEXT_STEP' })}
          class="px-6 py-2.5 bg-brand-green hover:bg-brand-green-dark text-white font-semibold rounded-lg transition-colors"
        >
          Next &rarr;
        </button>
      </div>

      <p class="mt-4 text-center text-xs text-slate-400">
        95% of items recycled or donated
      </p>
    </div>
  );
}
