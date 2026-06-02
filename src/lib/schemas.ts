import { z } from 'zod';

const phoneRegex = /^[\d\s+()-]{10,20}$/;

export const submitSchema = z.object({
  items: z.object({
    garden_qty: z.number().min(0).max(99).optional(),
    general_qty: z.number().min(0).max(99).optional(),
    sofa_qty: z.number().min(0).max(99).optional(),
    fridge_qty: z.number().min(0).max(99).optional(),
    washer_qty: z.number().min(0).max(99).optional(),
    mattress_qty: z.number().min(0).max(99).optional(),
    bed_qty: z.number().min(0).max(99).optional(),
    room_qty: z.number().min(0).max(99).optional(),
  }).strict(),
  accessIssues: z.array(
    z.enum(['restricted-parking', 'no-lift', 'narrow-doors', 'attic-basement']),
  ).max(4),
  address: z.object({
    line1: z.string().min(1).max(200),
    city: z.string().optional(),
    postcode: z.string().regex(/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i),
  }).strict(),
  contact: z.object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    email: z.string().email(),
    phone: z.string().regex(phoneRegex),
    notes: z.string().max(1000).optional(),
  }).strict(),
  distance: z.object({
    miles: z.number().min(0).max(100),
    calculated: z.boolean(),
  }).strict(),
  turnstileToken: z.string().min(1),
}).strict();

export const distanceSchema = z.object({
  address: z.string().min(1).max(200),
  postcode: z.string().regex(/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i),
}).strict();

export const contactSchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().regex(phoneRegex),
  email: z.string().email(),
  postcode: z.string().optional(),
  message: z.string().max(2000).optional(),
}).strict();
