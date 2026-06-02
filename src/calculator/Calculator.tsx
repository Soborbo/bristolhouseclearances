import { useCalculator } from './hooks/useCalculator';
import { TOTAL_STEPS } from './lib/constants';
import { ProgressBar } from './components/ProgressBar';
import { StepItems } from './components/StepItems';
import { StepAccess } from './components/StepAccess';
import { StepAddress } from './components/StepAddress';
import { StepDetails } from './components/StepDetails';
import { StepResult } from './components/StepResult';

export default function Calculator() {
  const { state, dispatch } = useCalculator();

  function renderStep() {
    switch (state.currentStep) {
      case 1:
        return <StepItems state={state} dispatch={dispatch} />;
      case 2:
        return <StepAccess state={state} dispatch={dispatch} />;
      case 3:
        return <StepAddress state={state} dispatch={dispatch} />;
      case 4:
        return <StepDetails state={state} dispatch={dispatch} />;
      case 5:
        return <StepResult state={state} dispatch={dispatch} />;
      default:
        return null;
    }
  }

  return (
    <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
      <ProgressBar currentStep={state.currentStep} totalSteps={TOTAL_STEPS} />
      {renderStep()}
    </div>
  );
}
