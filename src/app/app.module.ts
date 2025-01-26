import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { InjectSessionInterceptor } from '@core/interceptors/inject-sesion.interceptor';
import { HeaderComponent } from "./shared/components/header/header.component";

@NgModule({
  declarations: [
    // Could be: Components, directives, pipes
    AppComponent,
  ],
  imports: [
    // Only import other Modules
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderComponent
],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InjectSessionInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
