import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import * as dataRaw from '@data/tracks.json';

// Marks this class as available to be injected as a dependency
@Injectable({
  providedIn: 'root', // Indicates that this service should be provided at the root level
})
export class TrackService {
  // Observable to hold trending tracks data
  dataTracksTrending$: Observable<TrackModel[]> = of([]);
  // Observable to hold random tracks data
  dataTracksRandom$: Observable<TrackModel[]> = of([]);

  constructor() {
    // Extract data from the JSON file
    const { data }: any = (dataRaw as any).default;

    // Initialize the trending tracks observable with data from the JSON file
    this.dataTracksTrending$ = of(data);

    // Create a new observable for random tracks data
    this.dataTracksRandom$ = new Observable((observer) => {
      // Example track to emit
      const trackExample: TrackModel = {
        _id: 0,
        name: 'Example',
        album: 'Cartel de santa',
        url: 'http://',
        cover:
          'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQTsDoLohEwNc7BXvuTBYxezL1ZEZqG0GaxyEcPIc7UJfbLXwSg',
      };

      // Emit the example track after a delay of 3500 milliseconds
      setTimeout(() => {
        observer.next([trackExample]);
      }, 3500);
    });
  }
}
