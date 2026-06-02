export interface ClearanceItem {
  field: string;
  label: string;
  unitLabel: string;
  unitPrice: number;
  image: string;
}

export interface AccessIssue {
  id: string;
  label: string;
  image: string;
}

export interface PriceBreakdownItem {
  label: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface PriceResult {
  total: number;
  breakdown: PriceBreakdownItem[];
}

export interface CalculatorState {
  currentStep: number;
  items: Record<string, number>;
  accessIssues: string[];
  address: {
    line1: string;
    city: string;
    postcode: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes: string;
  };
  distance: {
    miles: number;
    calculated: boolean;
  };
  turnstileToken: string;
  gdprConsent: boolean;
  submitting: boolean;
  submitted: boolean;
  error: string | null;
  priceResult: PriceResult | null;
}

export type CalculatorAction =
  | { type: 'SET_ITEM_QTY'; field: string; quantity: number }
  | { type: 'TOGGLE_ACCESS'; issueId: string }
  | { type: 'SET_ADDRESS'; field: keyof CalculatorState['address']; value: string }
  | { type: 'SET_CONTACT'; field: keyof CalculatorState['contact']; value: string }
  | { type: 'SET_DISTANCE'; miles: number }
  | { type: 'SET_TURNSTILE_TOKEN'; token: string }
  | { type: 'SET_GDPR_CONSENT'; consent: boolean }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS'; priceResult: PriceResult }
  | { type: 'SUBMIT_ERROR'; error: string }
  | { type: 'RESET' };
