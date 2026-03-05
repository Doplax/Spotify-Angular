import { Component } from '@angular/core';
import { EXPLORE_CATEGORIES, ExploreCategory } from '@modules/search/models/explore-categories.model';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.scss',
  standalone: false,
})
export class ExplorePageComponent {
  public categories: ExploreCategory[] = EXPLORE_CATEGORIES;
}
