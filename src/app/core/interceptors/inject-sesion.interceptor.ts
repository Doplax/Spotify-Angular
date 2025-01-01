import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      try {
        const token = this.cookieService.get('token_service')
        let newRequest = req
        newRequest = req.clone({
          setHeaders: {
            authorization: `Bearer ${token}`
          }
        })
        return next.handle(newRequest);

      } catch (error) {
        console.log(error);
        return next.handle(req)
      }
  }
}
