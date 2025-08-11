import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShazamSearchDTO } from '@shared/Models/Shazam';
import { ShazamService } from '@shared/services/shazam.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService  {
  constructor(
    private shazamService: ShazamService,
  ) {}

    search$(
      term: string,
      locale: string = 'en-US',
      offset: number = 0,
      limit: number = 5
    ): Observable<ShazamSearchDTO.SearchDTO> {
    return this.shazamService.search$(term, locale, offset, limit).pipe(
      map((searchData: ShazamSearchDTO.SearchDTO) => {
        return searchData
      })
    );
    }
}
