import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SharedModule } from "@shared/shared.module";
import { FormsModule } from '@angular/forms';

import { ArtistCardComponent } from '@modules/search/components/artist-card/artist-card.component';
import { TrackComponent } from '@modules/search/components/track/track.component';



@NgModule({
  declarations: [
    SearchPageComponent,
    ArtistCardComponent,
    TrackComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    FormsModule
]
})
export class SearchModule { }
