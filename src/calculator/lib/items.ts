import type { ClearanceItem } from '../types';

export const CLEARANCE_ITEMS: ClearanceItem[] = [
  {
    field: 'garden_qty',
    label: 'Garden waste',
    unitLabel: 'ton bag',
    unitPrice: 40,
    image: '/img/calculator/garden-waste-clearance.webp',
  },
  {
    field: 'general_qty',
    label: 'Mixed non-recyclables',
    unitLabel: 'ton bag',
    unitPrice: 60,
    image: '/img/calculator/non-recyclable-waste-clearance.webp',
  },
  {
    field: 'sofa_qty',
    label: 'Sofa',
    unitLabel: 'set',
    unitPrice: 80,
    image: '/img/calculator/sofa-clearance.webp',
  },
  {
    field: 'mattress_qty',
    label: 'Mattress',
    unitLabel: 'each',
    unitPrice: 40,
    image: '/img/calculator/mattress-clearance.webp',
  },
  {
    field: 'bed_qty',
    label: 'Bed + Mattress',
    unitLabel: 'set',
    unitPrice: 80,
    image: '/img/calculator/bed-mattress-clearance.webp',
  },
  {
    field: 'fridge_qty',
    label: 'Fridge / Large appliance',
    unitLabel: 'each',
    unitPrice: 110,
    image: '/img/calculator/fridge-clearance.webp',
  },
  {
    field: 'washer_qty',
    label: 'Washing machine',
    unitLabel: 'each',
    unitPrice: 40,
    image: '/img/calculator/washing-machine-clearance.webp',
  },
  {
    field: 'room_qty',
    label: 'Full room clearance',
    unitLabel: 'room',
    unitPrice: 400,
    image: '/img/calculator/full-room-clearance.webp',
  },
];
