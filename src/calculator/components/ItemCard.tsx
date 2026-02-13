import type { ClearanceItem } from '../types';

interface Props {
  item: ClearanceItem;
  quantity: number;
  onQuantityChange: (field: string, qty: number) => void;
}

export function ItemCard({ item, quantity, onQuantityChange }: Props) {
  const isSelected = quantity > 0;

  return (
    <div
      class={`flex flex-col rounded-xl border-2 p-4 transition-all ${
        isSelected
          ? 'border-brand-green bg-green-50 shadow-sm'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div class="text-center flex-1">
        <div class="w-full aspect-[4/3] rounded-lg overflow-hidden mb-2">
          <img
            src={item.image}
            alt={item.label}
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <h3 class="font-semibold text-sm text-brand-navy">{item.label}</h3>
        <p class="text-xs text-slate-500 mt-0.5">
          From &pound;{item.unitPrice}/{item.unitLabel}
        </p>
      </div>

      <div class="flex items-center justify-center gap-3 mt-auto pt-3">
        <button
          type="button"
          onClick={() => onQuantityChange(item.field, Math.max(0, quantity - 1))}
          class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold transition-colors"
          aria-label={`Decrease ${item.label} quantity`}
        >
          −
        </button>
        <span class="w-8 text-center font-semibold text-lg tabular-nums">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => onQuantityChange(item.field, Math.min(99, quantity + 1))}
          class="w-8 h-8 rounded-full bg-brand-green hover:bg-brand-green-dark flex items-center justify-center text-white font-bold transition-colors"
          aria-label={`Increase ${item.label} quantity`}
        >
          +
        </button>
      </div>
    </div>
  );
}
