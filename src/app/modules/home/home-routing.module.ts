import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorePageComponent } from '@modules/search/pages/explore-page/explore-page.component';

const routes: Routes = [
  {
    path: 'tracks',
    loadChildren: () =>
      import('@modules/tracks/tracks.module').then((m) => m.TracksModule),
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('@modules/favorites/favorites.module').then((m) => m.FavoritesModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('@modules/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'explore',
    component: ExplorePageComponent,
  },
  {
    path: '**', // when 404 redirects us to tracks
    redirectTo:'/tracks'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
