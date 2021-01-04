import { AppRoutingModule } from './app-routing.module';
import { GlobalModule } from './global/global.module';
import { UiComponentsModule } from '@whisky-tracker/ui-components';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, GlobalModule, UiComponentsModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
