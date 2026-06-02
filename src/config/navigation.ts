export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    label: 'House Clearance',
    href: '/house-clearance/',
    children: [
      { label: 'Hoarder Clearance', href: '/house-clearance/hoarder-clearance/' },
      { label: 'End of Tenancy', href: '/house-clearance/end-of-tenancy-clearance/' },
      { label: 'Landlord Clearance', href: '/house-clearance/landlord-clearance/' },
      { label: 'Loft Clearance', href: '/house-clearance/loft-clearance/' },
      { label: 'Cellar Clearance', href: '/house-clearance/cellar-clearance/' },
      { label: 'Flat Clearance', href: '/house-clearance/flat-clearance/' },
      { label: 'Downsizing Clearance', href: '/house-clearance/downsizing-clearance/' },
      { label: 'Furniture Removal', href: '/house-clearance/furniture-removal/' },
    ],
  },
  {
    label: 'Probate',
    href: '/probate-house-clearance/',
    children: [
      { label: 'Bereavement Clearance', href: '/probate-house-clearance/bereavement-clearance/' },
      { label: 'Estate Clearance', href: '/probate-house-clearance/estate-clearance/' },
    ],
  },
  {
    label: 'Commercial',
    href: '/commercial-clearance/',
    children: [
      { label: 'Office Clearance', href: '/commercial-clearance/office-clearance/' },
      { label: 'Shop Clearance', href: '/commercial-clearance/shop-clearance/' },
      { label: 'Warehouse Clearance', href: '/commercial-clearance/warehouse-clearance/' },
      { label: 'Confidential Waste', href: '/commercial-clearance/confidential-waste-disposal/' },
    ],
  },
  {
    label: 'Garden',
    href: '/garden-clearance/',
    children: [
      { label: 'Garage Clearance', href: '/garden-clearance/garage-clearance/' },
      { label: 'Shed Clearance', href: '/garden-clearance/shed-clearance/' },
      { label: 'Garden Waste Removal', href: '/garden-clearance/garden-waste-removal/' },
      { label: 'Outbuilding Clearance', href: '/garden-clearance/outbuilding-clearance/' },
    ],
  },
  { label: 'Areas', href: '/areas/' },
  { label: 'Guides', href: '/guides/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerNav = {
  services: [
    { label: 'House Clearance', href: '/house-clearance/' },
    { label: 'Probate Clearance', href: '/probate-house-clearance/' },
    { label: 'Commercial Clearance', href: '/commercial-clearance/' },
    { label: 'Garden Clearance', href: '/garden-clearance/' },
    { label: 'Hoarder Clearance', href: '/house-clearance/hoarder-clearance/' },
    { label: 'Office Clearance', href: '/commercial-clearance/office-clearance/' },
  ],
  areas: [
    { label: 'Clifton', href: '/areas/clifton/' },
    { label: 'Redland', href: '/areas/redland/' },
    { label: 'Bishopston', href: '/areas/bishopston/' },
    { label: 'Bedminster', href: '/areas/bedminster/' },
    { label: 'Fishponds', href: '/areas/fishponds/' },
    { label: 'Keynsham', href: '/areas/keynsham/' },
    { label: 'All Areas', href: '/areas/' },
  ],
  guides: [
    { label: 'House Clearance Costs', href: '/guides/house-clearance-cost-bristol/' },
    { label: 'Clearing a House After Death', href: '/guides/clearing-house-after-death/' },
    { label: 'Skip Hire vs Clearance', href: '/guides/house-clearance-vs-skip-hire/' },
    { label: 'All Guides', href: '/guides/' },
  ],
  company: [
    { label: 'About Us', href: '/about/' },
    { label: 'Reviews', href: '/reviews/' },
    { label: 'Case Studies', href: '/case-studies/' },
    { label: 'FAQ', href: '/faq/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'For Solicitors', href: '/for-solicitors/' },
    { label: 'For Estate Agents', href: '/for-estate-agents/' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions/' },
    { label: 'Environmental Policy', href: '/environmental-policy/' },
    { label: 'Licensing & Accreditations', href: '/licensing-accreditations/' },
  ],
};
