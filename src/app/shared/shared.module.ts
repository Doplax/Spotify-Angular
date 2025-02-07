import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MediaPlayerComponent } from './components/media-player/media-player.component';
import { SectionGenericComponent } from './components/section-generic/section-generic.component';
import { CardPlayerComponent } from './components/card-player/card-player.component';
import { PlayListHeaderComponent } from './components/play-list-header/play-list-header.component';
import { PlayListBodyComponent } from './components/play-list-body/play-list-body.component';
import { RouterLink, RouterModule } from '@angular/router';
import { OrderListPipe } from './pipe/order-list.pipe';
import { ImgBrokenDirective } from './directives/img-broken.directive';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SideBarComponent,
    MediaPlayerComponent,
    SectionGenericComponent,
    CardPlayerComponent,
    PlayListHeaderComponent,
    PlayListBodyComponent,
    OrderListPipe,
    ImgBrokenDirective,
  ],
  imports: [CommonModule, RouterModule, MatSliderModule, FormsModule],
  exports: [
    SideBarComponent,
    MediaPlayerComponent,
    SectionGenericComponent,
    CardPlayerComponent,
    PlayListHeaderComponent,
    PlayListBodyComponent,
    ImgBrokenDirective
  ],
})
export class SharedModule {}
