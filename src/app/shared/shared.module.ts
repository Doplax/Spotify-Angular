import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { MediaPlayerComponent } from './components/media-player/media-player.component';
import { SectionGenericComponent } from './components/section-generic/section-generic.component';
import { CardPlayerComponent } from './components/card-player/card-player.component';
import { PlayListHeaderComponent } from './components/play-list-header/play-list-header.component';
import { PlayListBodyComponent } from './components/play-list-body/play-list-body.component';

@NgModule({
  declarations: [
    SideBarComponent,
    HeaderUserComponent,
    MediaPlayerComponent,
    SectionGenericComponent,
    CardPlayerComponent,
    PlayListHeaderComponent,
    PlayListBodyComponent,
  ],
  imports: [CommonModule],
  exports: [
    SideBarComponent,
    MediaPlayerComponent,
    HeaderUserComponent,
    SectionGenericComponent,
    CardPlayerComponent,
    PlayListHeaderComponent,
    PlayListBodyComponent
  ],
})
export class SharedModule {}
