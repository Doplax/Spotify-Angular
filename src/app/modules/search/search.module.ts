import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchPageComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    FormsModule
]
})
export class SearchModule { }
