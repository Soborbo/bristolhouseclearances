export const site = {
  name: 'Bristol House Clearances',
  shortName: 'Bristol House Clearances',
  shortNameAbbr: 'BHC',
  domain: 'bristolhouseclearances.co.uk',
  url: 'https://bristolhouseclearances.co.uk',
  phone: '0117 123 4567',
  phoneHref: 'tel:+441171234567',
  whatsapp: '447123456789',
  whatsappUrl: 'https://wa.me/447123456789',
  email: 'hello@bristolhouseclearances.co.uk',
  address: {
    street: 'Bristol',
    city: 'Bristol',
    county: 'South Gloucestershire',
    postcode: 'BS34 6FE',
    country: 'GB',
  },
  geo: { lat: 51.5054, lng: -2.5907 },
  hours: 'Mon–Sat 7am–7pm, Sun by appointment',
  openingHours: [
    { days: 'Monday-Saturday', open: '07:00', close: '19:00' },
    { days: 'Sunday', open: 'By appointment', close: '' },
  ],
  social: {
    facebook: 'https://www.facebook.com/bristolhouseclearances',
    google: 'https://g.page/bristolhouseclearances',
  },
  legal: {
    wasteCarrierLicence: 'CBDU000000',
    companyRegistration: '00000000',
    vatNumber: '',
    insurancePublicLiability: '£10M',
    insuranceEmployers: '£10M',
    insuranceProfessionalIndemnity: '£2M',
  },
  brand: {
    primary: '#2e50e0',      // cobalt
    primaryDark: '#2340bd',
    navy: '#10172a',         // ink
    navyDark: '#0b1020',
    accent: '#ffc73c',       // sunshine
    background: '#fbfbf7',
    text: '#10172a',
  },
  tagline: 'Clear the clutter, keep the calm.',
} as const;
