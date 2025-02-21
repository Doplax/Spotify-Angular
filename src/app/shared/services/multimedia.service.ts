import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Subject } from 'rxjs';

export enum PlayerStates {
  PLAY = 'play',
  PLAYING = 'playing',
  PAUSE = 'pause',
  ENDED = 'ended',
  TIMEUPDATE = 'timeupdate',
  CANPLAY = 'canplay',
  CANPLAYTHROUGH = 'canplaythrough',
}

@Injectable({
  providedIn: 'root',
})
export class MultimediaService {
  public trackInfo$ = new BehaviorSubject<TrackModel | null>(null);
  public currentSong!: HTMLAudioElement;
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject<string>(
    '00:00'
  );
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject<string>(
    '00:00'
  );
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject<string>(
    'paused'
  );
  public playerPercentage$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  constructor() {
    this.currentSong = new Audio();

    this.trackInfo$.subscribe((response) => {
      if (response) {
        this.setCurrentSong(response);
      }
    });
    this.setPlayerStatus = this.setPlayerStatus.bind(this);
    this.listenAllEvents();
  }

  private listenAllEvents(): void {
    this.currentSong.addEventListener(
      PlayerStates.TIMEUPDATE,
      this.calculateTime,
      false
    );
    this.currentSong.addEventListener(
      PlayerStates.PLAYING,
      this.setPlayerStatus,
      false
    );
    this.currentSong.addEventListener(
      PlayerStates.PLAY,
      this.setPlayerStatus,
      false
    );
    this.currentSong.addEventListener(
      PlayerStates.PAUSE,
      this.setPlayerStatus,
      false
    );
    this.currentSong.addEventListener(
      PlayerStates.ENDED,
      this.setPlayerStatus,
      false
    );
  }

  private calculateTime = () => {
    const { duration, currentTime } = this.currentSong;
    //console.table([duration, currentTime]);
    this.setTimeElapsed(currentTime);
    this.setRemaining(currentTime, duration);
    this.setPercentage(currentTime, duration);
  };

  private setPercentage(currentTime: number, duration: number): void {
    const percentage = (currentTime / duration) * 100;
    this.playerPercentage$.next(percentage);
  }

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60);
    let minutes = Math.floor((currentTime / 60) % 60);

    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}:${displaySeconds}`;
    this.timeElapsed$.next(displayFormat);
  }

  private setRemaining(currentTime: number, duration: number) {
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60) % 60);

    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`;
    this.timeRemaining$.next(displayFormat);
  }

  private setPlayerStatus(event: Event) {
    const type = event.type as PlayerStates;
    console.log('setPlayerStatus', type);
    this.playerStatus$.next(type);
  }

  // Public
  public setCurrentSong(track: TrackModel): void {
    this.currentSong.src = track.url;
    this.currentSong.play();
    //console.log({ currentSong: this.currentSong });
  }

  public tooglePlayer(): void {
    if (this.currentSong.paused) {
      this.currentSong.play();
    } else {
      this.currentSong.pause();
    }
  }

  /**
   * Seeks the audio to a specific point based on a percentage of the total duration.
   *
   * @param {number} percentage - The percentage of the total duration to seek to (0-100).
   */
  public seekAudio(percentage: number): void {
    const { duration } = this.currentSong;
    const currentTime = (percentage / 100) * duration;
    this.currentSong.currentTime = currentTime;
  }
}
