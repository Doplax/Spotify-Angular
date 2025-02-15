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

  isOpenDropdown: boolean = false;
  acountdropDown: string[] = ['Cuenta', 'Perfil', 'Sube a Premium', 'Asistencia','Descargar','Configuración','Cerrar sesión'];

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.authService.isAuth$.subscribe((isAuth) => {
      this.isAuth = isAuth;
      console.log(this.isAuth);
    });
  }

  toggleDropdown() {
    this.isOpenDropdown = !this.isOpenDropdown;
  }

  checkIsAuth() {
    const isAuth = this.authService.checkIsAuth();
    console.log({ isAuth });
    return isAuth;
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
