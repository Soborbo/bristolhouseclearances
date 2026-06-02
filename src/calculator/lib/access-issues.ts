import type { AccessIssue } from '../types';

export const ACCESS_ISSUES: AccessIssue[] = [
  {
    id: 'restricted-parking',
    label: 'Restricted or distant parking',
    image: '/img/calculator/restricted-access-clearance.jpg',
  },
  {
    id: 'no-lift',
    label: 'Upper floor without lift access',
    image: '/img/calculator/no-elevator-clearance.jpg',
  },
  {
    id: 'narrow-doors',
    label: 'Item size exceeds door width',
    image: '/img/calculator/narrow-doors-clearance.jpg',
  },
  {
    id: 'attic-basement',
    label: 'Items in attic or basement',
    image: '/img/calculator/attic-basement-clearance.jpg',
  },
];
