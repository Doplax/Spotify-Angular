import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritePageComponent } from '@modules/favorites/pages/favorite-page/favorite-page.component';
import { PlaylistDetailPageComponent } from '@modules/favorites/pages/playlist-detail-page/playlist-detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: FavoritePageComponent
  },
  {
    path: ':id',
    component: PlaylistDetailPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
