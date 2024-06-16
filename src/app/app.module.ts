import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    // Could be: Components, directives, pipes
    AppComponent,

  ],
  imports: [
    // Only import other Modules
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
