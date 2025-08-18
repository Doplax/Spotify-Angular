import { Component } from '@angular/core';
import { TrackModel } from '@shared/Models/Tracks';
import { SearchService } from '@modules/search/services/search.service';
import { Observable, of } from 'rxjs';
import { TrackService } from '@modules/tracks/services/track.service';
import { ActivatedRoute } from '@angular/router';
import { CardPlayerMode } from '@shared/enums';
import { ShazamSearchDTO } from '@shared/Models/Shazam';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrl: './search-page.component.scss',
    standalone: false
})
export class SearchPageComponent {
  public searchedData!: ShazamSearchDTO.SearchDTO;
  public CardPlayerMode = CardPlayerMode;
  public isLoading: boolean = false;
  public tracksPrueba: TrackModel[] = [];


  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute
  ){}


  ngOnInit(): void {
    this.reciveData()
  }

  reciveData(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const term = params.get('term') || '';

      // TODO: put alternative value
      //const offset = params.get('offset');
      //const limit = params.get('limit') ;

      this.searchService.search$(term).subscribe((data) => {
        this.searchedData = data ;
        console.log(data.artists.hits[0].artist.adamid)
      });
    });
  }

  reciveRelatedAlbums(){

  }


}
