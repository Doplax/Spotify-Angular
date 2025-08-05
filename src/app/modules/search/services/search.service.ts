import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    ): Observable<any> {
    return this.shazamService.search$(term, locale, offset, limit).pipe(
      map((data: any) => {
        return this.shazamService.shazamParser(data)
      })
    );
    }
}
