import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';

import { InjectSessionInterceptor } from './inject-session.interceptor';

describe('InjectSessionInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InjectSessionInterceptor, CookieService],
    });
  });

  it('should be created', () => {
    const interceptor = TestBed.inject(InjectSessionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
