import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkCookieSeession();
  }

  checkCookieSeession(): boolean {
    try {
      const token: boolean = this.cookieService.check('token_service');
      if (!token) {
        this.router.navigate(['/','auth'])
      }
      return token

    } catch (e) {
      console.error('Something happens:', e);
      return false;
    }
  }
}
