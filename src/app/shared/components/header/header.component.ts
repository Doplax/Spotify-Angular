import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';


interface AccountDropDown {
  label: string;
  route: string;
  command: () => void;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: false,
})
export class HeaderComponent implements OnInit, AfterViewInit  {
  isAuth: boolean = false;
  isOpenDropdown: boolean = false;
  acountdropDown: AccountDropDown[] = [
    {
      label: 'Cuenta',
      route: '/account',
      command: () =>  this.router.navigate(['/numbers'])
    },
    {
      label: 'Perfil',
      route: '/profile',
      command: () => this.router.navigate(['/profile'])
    },
    {
      label: 'Sube a Premium',
      route: '/premium',
      command: () => this.router.navigate(['/premium'])
    },
    {
      label: 'Asistencia',
      route: '/support',
      command: () => this.router.navigate(['/support'])
    },
    {
      label: 'Descargar',
      route: '/download',
      command: () => this.router.navigate(['/download'])
    },
    {
      label: 'Configuración',
      route: '/settings',
      command: () => this.router.navigate(['/settings'])
    },
    {
      label: 'Cerrar sesión',
      route: '/logout',
      command: () => this.logOut()
    }
  ];

  constructor(private authService: AuthService, public router: Router) {}
  @ViewChild('accountButton') accountButton!: ElementRef;

  ngOnInit(): void {
    this.authService.isAuth$.subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
  }

  ngAfterViewInit() {
    if (this.accountButton) { // Check if the element is available
      const focus$ = fromEvent(this.accountButton.nativeElement, 'focus');
      const blur$ = fromEvent(this.accountButton.nativeElement, 'blur');

      focus$.subscribe(() => this.isOpenDropdown = true); // Open on focus
      blur$.subscribe(() => this.isOpenDropdown = false);  // Close on blur
    }
  }

  checkIsAuth() {
    const isAuth = this.authService.checkIsAuth();
    console.log({ isAuth });
    return isAuth;
  }

  toggleDropdown() {
    this.isOpenDropdown = !this.isOpenDropdown;
    console.log('isOpenDropdown',this.isOpenDropdown);
  }

  logOut() {
    console.log('logut funcion');
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
