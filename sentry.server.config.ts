// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://097eab46cd93eb3e605400b6b6066c34@o4511375953952768.ingest.us.sentry.io/4511375955132416',
  enabled: false,
  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,
});
