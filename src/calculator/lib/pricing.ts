import type { PriceResult, PriceBreakdownItem } from '../types';
import { MILE_RATE, COMPLICATION_MULTIPLIER } from './constants';
import { CLEARANCE_ITEMS } from './items';

export function calculatePrice(
  items: Record<string, number>,
  accessIssues: string[],
  miles: number,
): PriceResult {
  const breakdown: PriceBreakdownItem[] = [];
  let subtotal = 0;

  for (const item of CLEARANCE_ITEMS) {
    const qty = items[item.field] || 0;
    if (qty > 0) {
      const lineTotal = item.unitPrice * qty;
      breakdown.push({
        label: item.label,
        quantity: qty,
        unitPrice: item.unitPrice,
        lineTotal,
      });
      subtotal += lineTotal;
    }
  }

  if (miles > 0) {
    const distanceCost = Math.round(miles * MILE_RATE * 100) / 100;
    breakdown.push({
      label: 'Distance charge',
      quantity: Math.round(miles * 10) / 10,
      unitPrice: MILE_RATE,
      lineTotal: distanceCost,
    });
    subtotal += distanceCost;
  }

  let total = subtotal;

  if (accessIssues.length > 0) {
    const surcharge = Math.round(subtotal * COMPLICATION_MULTIPLIER * 100) / 100;
    breakdown.push({
      label: 'Access difficulty surcharge (20%)',
      quantity: 1,
      unitPrice: surcharge,
      lineTotal: surcharge,
    });
    total = subtotal + surcharge;
  }

  return {
    total: Math.round(total * 100) / 100,
    breakdown,
  };
}
