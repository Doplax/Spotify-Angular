import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SvgLogoComponent } from "../../shared/SVGcomnents/svg-logo/svg-logo.component";
import { SvgGoogleComponent } from "../../shared/SVGcomponents/svg-google/svg-google.component";
import { SvgFacebookComponent } from "../../shared/SVGcomponents/svg-facebook/svg-facebook.component";
import { SvgAppleComponent } from "../../shared/SVGcomponents/svg-apple/svg-apple.component";
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SvgLogoComponent,
    SvgGoogleComponent,
    SvgFacebookComponent,
    SvgAppleComponent,
    MatButtonModule
]
})
export class AuthModule { }
