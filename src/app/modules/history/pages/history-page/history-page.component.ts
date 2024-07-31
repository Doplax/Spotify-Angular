import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchComponent } from '@modules/history/components/search/search.component';
import { SearchService } from '@modules/history/services/search.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss'
})
export class HistoryPageComponent {
  listResults: TrackModel[] = [];
  constructor(private searchService: SearchService){


  }

  reciveData(event: string): void {
    //TODO: solo se ejecuta cuando llaga + de 3 letras
    console.log(event);
    this.searchService.searchTracks$(event)
      .subscribe(({data}) => {
        this.listResults = data;
      })
  }
}
