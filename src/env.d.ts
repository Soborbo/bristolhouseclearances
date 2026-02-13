/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly GOOGLE_MAPS_API_KEY: string;
  readonly TURNSTILE_SECRET_KEY: string;
  readonly TURNSTILE_SITE_KEY: string;
  readonly SHEETS_WEBHOOK_URL: string;
  readonly ADMIN_EMAIL: string;
  readonly FROM_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
