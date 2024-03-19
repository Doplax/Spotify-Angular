import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './modules/auth/pages/pages.component';
import { AuthPageComponent } from './modules/auth/pages/auth-page/auth-page.component';
import { TracksPageComponent } from './modules/tracks/pages/tracks-page/tracks-page.component';
import { HistoryPageComponent } from './modules/history/pages/history-page/history-page.component';
import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';

@NgModule({
  declarations: [
    // Could be: Components, directives, pipes
    AppComponent,
    PagesComponent,
    AuthPageComponent,
    TracksPageComponent,
    HistoryPageComponent,
    HomePageComponent,
  ],
  imports: [
    // Only import other Modules
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
