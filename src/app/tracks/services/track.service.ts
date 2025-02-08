import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { TrackModel } from '@core/models/tracks.model';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) {}

  private skipById(
    listTracks: TrackModel[],
    id: number
  ): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter((a) => a._id !== id);
      resolve(listTmp);
    });
  }

  /**
   * data:[..1,..2,..3]
   *
   * @returns
   */
  getAllTracks$(): Observable<any> {
    return this.httpClient
      .get(`${this.URL}/api/tracks`)
      .pipe(
        map(({ data }: any) => {
          return data;
        })
      );
  }

  /**
   *
   * @returns random songs
   */
  getAllRandom$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/api/tracks`).pipe(
      mergeMap(({ data }: any) => this.skipById(data, 1)),
      catchError((err) => {
        console.error("something went wrong...",err);
        return of([])
      })
    );
  }
}
