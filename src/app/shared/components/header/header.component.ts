import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: false,
})
export class HeaderComponent implements OnInit {
  isAuth: boolean = false;

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.authService.isAuth$.subscribe((isAuth) => {
      this.isAuth = isAuth;
      console.log(this.isAuth);
    });
  }

  checkIsAuth() {
    const isAuth = this.authService.checkIsAuth();
    console.log({ isAuth });
    return isAuth;
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/auth/login']);
  }
}
