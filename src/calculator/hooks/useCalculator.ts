import { useReducer, useEffect } from 'preact/hooks';
import type { CalculatorState, CalculatorAction } from '../types';
import { TOTAL_STEPS, SESSION_KEY } from '../lib/constants';

const initialState: CalculatorState = {
  currentStep: 1,
  items: {},
  accessIssues: [],
  address: { line1: '', city: '', postcode: '' },
  contact: { firstName: '', lastName: '', email: '', phone: '', notes: '' },
  distance: { miles: 0, calculated: false },
  turnstileToken: '',
  gdprConsent: false,
  submitting: false,
  submitted: false,
  error: null,
  priceResult: null,
};

function reducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'SET_ITEM_QTY': {
      const qty = Math.max(0, Math.min(99, action.quantity));
      const items = { ...state.items };
      if (qty > 0) {
        items[action.field] = qty;
      } else {
        delete items[action.field];
      }
      return { ...state, items };
    }

    case 'TOGGLE_ACCESS': {
      const has = state.accessIssues.includes(action.issueId);
      return {
        ...state,
        accessIssues: has
          ? state.accessIssues.filter((id) => id !== action.issueId)
          : [...state.accessIssues, action.issueId],
      };
    }

    case 'SET_ADDRESS':
      return {
        ...state,
        address: { ...state.address, [action.field]: action.value },
      };

    case 'SET_CONTACT':
      return {
        ...state,
        contact: { ...state.contact, [action.field]: action.value },
      };

    case 'SET_DISTANCE':
      return {
        ...state,
        distance: { miles: action.miles, calculated: true },
      };

    case 'SET_TURNSTILE_TOKEN':
      return { ...state, turnstileToken: action.token };

    case 'SET_GDPR_CONSENT':
      return { ...state, gdprConsent: action.consent };

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS),
      };

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
      };

    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: Math.max(1, Math.min(action.step, TOTAL_STEPS)),
      };

    case 'SUBMIT_START':
      return { ...state, submitting: true, error: null };

    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        submitting: false,
        submitted: true,
        priceResult: action.priceResult,
        currentStep: TOTAL_STEPS,
      };

    case 'SUBMIT_ERROR':
      return { ...state, submitting: false, error: action.error };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

function loadState(): CalculatorState {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate shape
      if (
        typeof parsed === 'object' && parsed !== null &&
        typeof parsed.currentStep === 'number' &&
        parsed.currentStep >= 1 && parsed.currentStep <= TOTAL_STEPS &&
        typeof parsed.items === 'object' && parsed.items !== null &&
        Array.isArray(parsed.accessIssues)
      ) {
        return { ...initialState, ...parsed, submitting: false, error: null, turnstileToken: '' };
      }
    }
  } catch {}
  return initialState;
}

export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState, loadState);

  useEffect(() => {
    try {
      const { submitting, error, turnstileToken, ...saveable } = state;
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(saveable));
    } catch {}
  }, [state]);

  return { state, dispatch };
}
