interface Props {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = ['Items', 'Access', 'Address', 'Details', 'Quote'];

export function ProgressBar({ currentStep, totalSteps }: Props) {
  return (
    <div class="flex items-center justify-between mb-8">
      {STEP_LABELS.map((label, idx) => {
        const step = idx + 1;
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;
        return (
          <div key={step} class="flex items-center flex-1 last:flex-none">
            <div class="flex flex-col items-center">
              <div
                class={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  isCompleted
                    ? 'bg-brand-green text-white'
                    : isActive
                      ? 'bg-brand-navy text-white'
                      : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isCompleted ? (
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                class={`mt-1.5 text-xs font-medium hidden sm:block ${
                  isActive ? 'text-brand-navy' : 'text-slate-400'
                }`}
              >
                {label}
              </span>
            </div>
            {step < totalSteps && (
              <div
                class={`flex-1 h-0.5 mx-2 ${
                  isCompleted ? 'bg-brand-green' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
