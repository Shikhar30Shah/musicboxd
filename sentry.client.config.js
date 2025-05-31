import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://dead49af27273474364b9165b13a17ae@o4509383825752064.ingest.us.sentry.io/4509383826997248",
  integrations: [
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});