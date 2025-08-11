import { CardPlayerComponent } from './components/card-player/card-player.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ImgBrokenDirective } from './directives/img-broken.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MediaPlayerComponent } from './components/media-player/media-player.component';
import { NgModule } from '@angular/core';
import { OrderListPipe } from './pipe/order-list.pipe';
import { PlayListBodyComponent } from './components/play-list-body/play-list-body.component';
import { PlayListHeaderComponent } from './components/play-list-header/play-list-header.component';
import { RouterLink, RouterModule } from '@angular/router';
import { SectionGenericComponent } from './components/section-generic/section-generic.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SvgModule } from './SVGcomponents/svg.module';


@NgModule({
  declarations: [
    CardPlayerComponent,
    HeaderComponent,
    ImgBrokenDirective,
    MediaPlayerComponent,
    OrderListPipe,
    PlayListBodyComponent,
    PlayListHeaderComponent,
    SectionGenericComponent,
    SideBarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatTooltipModule,
    RouterModule,
    SvgModule,
  ],
  exports: [
    CardPlayerComponent,
    HeaderComponent,
    ImgBrokenDirective,
    MediaPlayerComponent,
    PlayListBodyComponent,
    PlayListHeaderComponent,
    SectionGenericComponent,
    SideBarComponent,
  ],
})
export class SharedModule {}
