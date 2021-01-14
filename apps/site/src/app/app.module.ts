// eslint-disable-next-line import/order
import { AppRoutingModule } from './app-routing.module';
import { UiComponentsModule } from '@whisky-tracker/ui-components';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import * as Sentry from '@sentry/angular';

import { GlobalModule } from './global/global.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, GlobalModule, UiComponentsModule],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true
      })
    },
    {
      provide: Sentry.TraceService,
      deps: [Router]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
