import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { InjectSessionInterceptor } from '@core/interceptors/inject-sesion.interceptor';
import { HeaderComponent } from "./shared/components/header/header.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';

//import { MatIconModule } from '@angular/material/icon';

@NgModule({ declarations: [
        // Could be: Components, directives, pipes
        AppComponent,
    ],
    bootstrap: [AppComponent], imports: [
        // Only import other Modules
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        HeaderComponent], providers: [
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InjectSessionInterceptor,
            multi: true,
        },
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
