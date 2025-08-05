import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/search/services/search.service';
import { Observable, of } from 'rxjs';
import { TrackService } from '@modules/tracks/services/track.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrl: './search-page.component.scss',
    standalone: false
})
export class SearchPageComponent {
  listResults$: Observable<any> = of([]);


  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute
  ){}


  ngOnInit(): void {
    this.reciveData()
  }

  reciveData(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const term = params.get('term') || '';        // "kiss the rain"

      // TODO: put alternative value
      //const offset = params.get('offset');
      //const limit = params.get('limit') ;

      this.searchService.search$(term).subscribe((data) => {
        this.listResults$ = data;
        console.log('Search results:', data);
      });
    });
  }


}
