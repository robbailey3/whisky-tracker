import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

Sentry.init({
  dsn:
    'https://ef0d8e6c01c74a1080ff3636a5da30c7@o368150.ingest.sentry.io/5593172',
  autoSessionTracking: true,
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost'],
      routingInstrumentation: Sentry.routingInstrumentation
    })
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
