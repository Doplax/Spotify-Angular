import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only inject the session token for requests to our own backend.
    // External APIs (iTunes, Shazam, etc.) must not receive the auth header.
    const isOwnApi = req.url.startsWith(environment.api);
    if (!isOwnApi) {
      return next.handle(req);
    }

    try {
      const token = this.cookieService.get('token_service');
      const newRequest = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
      return next.handle(newRequest);
    } catch (error) {
      console.error(error);
      return next.handle(req);
    }
  }
}
