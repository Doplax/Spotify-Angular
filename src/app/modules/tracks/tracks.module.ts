import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';
import { TracksPageComponent } from './pages/tracks-page/tracks-page.component';
import { SharedModule } from '@shared/shared.module';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

@NgModule({
  declarations: [TracksPageComponent],
  imports: [
    CommonModule,
    TracksRoutingModule,
    SharedModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class TracksModule {}
