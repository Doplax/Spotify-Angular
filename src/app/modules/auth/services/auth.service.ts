import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL = environment.api;
  private isAuthSubject = new BehaviorSubject<boolean>(false);
  public isAuth$ = this.isAuthSubject.asObservable();

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.checkIsAuth()
  }

  checkIsAuth(): boolean {
    const isAuth = !!this.cookie.get('token_service');
    this.isAuthSubject.next(isAuth);
    return isAuth;
  }
  
  sendCredentials(email: string, password: string): Observable<any> {
    const body = {
      email,
      password,
    };
    return this.http.post(`${this.URL}/api/auth/login`, body).pipe(
      tap((responseOk: any) => {
        const { token } = responseOk;
        this.cookie.set('token_service', token, 4, '/');
        this.checkIsAuth()
      })
    );
  }

  logOut() {
    this.cookie.delete('token_service', '/');
    return this.checkIsAuth();
  }


}
