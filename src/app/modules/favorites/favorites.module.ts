import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritePageComponent } from './pages/favorite-page/favorite-page.component';
import { PlaylistDetailPageComponent } from './pages/playlist-detail-page/playlist-detail-page.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    FavoritePageComponent,
    PlaylistDetailPageComponent,
  ],
  imports: [CommonModule, FavoritesRoutingModule, SharedModule],
})
export class FavoritesModule {}
