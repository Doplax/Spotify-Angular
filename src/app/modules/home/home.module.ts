import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ExplorePageComponent } from '@modules/search/pages/explore-page/explore-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    HomePageComponent,
    ExplorePageComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
