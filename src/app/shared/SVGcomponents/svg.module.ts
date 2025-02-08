import { NgModule } from '@angular/core';
import { SvgAppleComponent } from './svg-apple/svg-apple.component';
import { SvgExploreComponent } from './svg-explore/svg-explore.component';
import { SvgFacebookComponent } from './svg-facebook/svg-facebook.component';
import { SvgGoogleComponent } from './svg-google/svg-google.component';
import { SvgLogoComponent } from './svg-logo/svg-logo.component';

@NgModule({
  declarations: [
    SvgAppleComponent,
    SvgLogoComponent,
    SvgExploreComponent,
    SvgFacebookComponent,
    SvgGoogleComponent,
    SvgLogoComponent,
  ],
  imports: [],
  exports: [
    SvgAppleComponent,
    SvgLogoComponent,
    SvgExploreComponent,
    SvgFacebookComponent,
    SvgGoogleComponent,
    SvgLogoComponent,
  ],
})
export class SvgModule {}
