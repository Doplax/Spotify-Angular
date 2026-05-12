import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Thin logging facade so debug output never reaches production builds.
 * Errors are always forwarded — they should be visible regardless of env.
 */
@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(...args: unknown[]): void {
    if (!environment.production) {
      console.log(...args);
    }
  }

  warn(...args: unknown[]): void {
    if (!environment.production) {
      console.warn(...args);
    }
  }

  error(...args: unknown[]): void {
    console.error(...args);
  }
}
