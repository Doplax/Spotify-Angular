import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL = environment.api;
  private readonly TOKEN_COOKIE = 'token_service';
  private readonly TOKEN_EXPIRES_DAYS = 4;

  private isAuthSubject = new BehaviorSubject<boolean>(false);
  public isAuth$: Observable<boolean> = this.isAuthSubject.asObservable();

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.checkIsAuth();
  }

  checkIsAuth(): boolean {
    const isAuth = !!this.cookie.get(this.TOKEN_COOKIE);
    this.isAuthSubject.next(isAuth);
    return isAuth;
  }

  sendCredentials(email: string, password: string): Observable<LoginResponse> {
    const body: LoginCredentials = { email, password };
    return this.http
      .post<LoginResponse>(`${this.URL}/api/auth/login`, body)
      .pipe(
        tap((response: LoginResponse) => {
          this.cookie.set(
            this.TOKEN_COOKIE,
            response.token,
            this.TOKEN_EXPIRES_DAYS,
            '/',
            undefined,
            environment.production,
            'Strict'
          );
          this.checkIsAuth();
        })
      );
  }

  logOut(): boolean {
    this.cookie.delete(this.TOKEN_COOKIE, '/');
    return this.checkIsAuth();
  }
}
