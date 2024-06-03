import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackService {

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) {


  }


  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
  }
}
