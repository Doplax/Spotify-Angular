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
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject<string>('00:00');
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject<string>('paused');
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.audio = new Audio();

    this.trackInfo$.subscribe((response) => {
      if(response) {
        this.setAudio(response);
      }
    });
    this.listenAllEvents();
  }

  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate',this.calculateTime,false);
    this.audio.addEventListener('playing',this.setPlayerStatus,false);
    this.audio.addEventListener('play',this.setPlayerStatus,false);
    this.audio.addEventListener('pause',this.setPlayerStatus,false);
    this.audio.addEventListener('ended',this.setPlayerStatus,false);
  }

  private calculateTime = () => {
    const { duration, currentTime } = this.audio;
    //console.table([duration, currentTime]);
    this.setTimeElapsed(currentTime);
    this.setRemaining(currentTime, duration);
    this.setPercentage(currentTime, duration);
  }

  private setPercentage(currentTime:number, duration: number): void {
    const percentage = (currentTime / duration) * 100;
    this.playerPercentage$.next(percentage);
  }

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60)
    let minutes = Math.floor((currentTime / 60) % 60);

    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat);
  }

  private setRemaining(currentTime: number, duration: number) {
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft / 60) % 60);

    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`;
    this.timeElapsed$.next(displayFormat);
  }

  private setPlayerStatus = (state:any) => {
    switch (state.type) {
      case 'playing':
        this.playerStatus$.next('playing');
        break;
      case 'pause':
        this.playerStatus$.next('paused');
        break;
      case 'ended':
        this.playerStatus$.next('ended');
        break;
      default:
        this.playerStatus$.next('paused');
        break;
    }
  }


  // Public
  public setAudio(track: TrackModel): void {
    console.log('Cambiando canción...', track);
    this.audio.src = track.url;
    this.audio.play();
  }

  public tooglePlayer(): void {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
}
