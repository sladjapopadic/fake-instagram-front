import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoggedUserService} from "./shared/logged-user/logged-user.service";
import {LoggedUserGuard} from "./guard/logged-user-guard";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [LoggedUserGuard, LoggedUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
