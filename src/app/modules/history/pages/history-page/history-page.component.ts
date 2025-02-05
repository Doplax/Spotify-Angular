import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchComponent } from '@modules/history/components/search/search.component';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';
import { TrackService } from 'src/app/tracks/services/track.service';

@Component({
    selector: 'app-history-page',
    templateUrl: './history-page.component.html',
    styleUrl: './history-page.component.scss',
    standalone: false
})
export class HistoryPageComponent {
  listResults$: Observable<any> = of([]);


  constructor(
    private searchService: SearchService,
    private trackService: TrackService
  ){
    this.loadDataAll();
  }

  reciveData(event: string): void {
    this.listResults$ = this.searchService.searchTracks$(event)
  }

  async loadDataAll(): Promise<any> {
    this.listResults$ = await this.trackService.getAllTracks$();
  }

}
