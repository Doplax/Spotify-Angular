import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoggerService } from '@shared/services/logger.service';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private logger: LoggerService
  ) {}

  canActivate(): boolean {
    return this.checkCookieSession();
  }

  private checkCookieSession(): boolean {
    try {
      const hasToken = this.cookieService.check('token_service');
      if (!hasToken) {
        this.router.navigate(['/', 'auth']);
      }
      return hasToken;
    } catch (e: unknown) {
      this.logger.error('SessionGuard: error reading auth cookie', e);
      return false;
    }
  }
}
