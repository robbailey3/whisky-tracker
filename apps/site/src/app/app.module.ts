// eslint-disable-next-line import/order
import { AppRoutingModule } from './app-routing.module';
import { UiComponentsModule } from '@whisky-tracker/ui-components';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GlobalModule } from './global/global.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, GlobalModule, UiComponentsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
