import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>();
  myObservable1$: Subject<any> = new Subject<any>();

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public audio!: HTMLAudioElement;

  constructor() {

    this.trackInfo$.subscribe((response) => {
      if(response) {
        this.setAudio(response);
      }
      console.log('Recibiendo canción...', response);
    });
    
    this.audio = new Audio();


  }

  private listenAllEvents(): void {}

  public setAudio(track: TrackModel): void {
    console.log('Cambiando canción...', track);
    this.audio.src = track.url;
    this.audio.play();
  }
}
