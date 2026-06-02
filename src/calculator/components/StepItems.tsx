import type { CalculatorState, CalculatorAction } from '../types';
import { CLEARANCE_ITEMS } from '../lib/items';
import { ItemCard } from './ItemCard';

interface Props {
  state: CalculatorState;
  dispatch: (action: CalculatorAction) => void;
}

export function StepItems({ state, dispatch }: Props) {
  const hasItems = Object.keys(state.items).length > 0;

  return (
    <div>
      <h3 class="text-xl font-bold text-brand-navy mb-2">
        What needs to be cleared?
      </h3>
      <p class="text-slate-500 text-sm mb-6">
        Select items and set quantities. You can choose multiple.
      </p>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CLEARANCE_ITEMS.map((item) => (
          <ItemCard
            key={item.field}
            item={item}
            quantity={state.items[item.field] || 0}
            onQuantityChange={(field, qty) =>
              dispatch({ type: 'SET_ITEM_QTY', field, quantity: qty })
            }
          />
        ))}
      </div>

      <div class="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => dispatch({ type: 'NEXT_STEP' })}
          disabled={!hasItems}
          class="px-6 py-2.5 bg-brand-green hover:bg-brand-green-dark disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          Next &rarr;
        </button>
      </div>

      <p class="mt-4 text-center text-xs text-slate-400">
        4.9/5 from 200+ reviews
      </p>
    </div>
  );
}
