import { Component, OnInit } from '@angular/core';
import { SvgLogoComponent } from "../../SVGcomnents/svg-logo/svg-logo.component";
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '@modules/auth/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    SvgLogoComponent,
    MatIconModule,
    MatButtonModule
  ]
})
export class HeaderComponent implements OnInit {
  isAuth: boolean = false

  constructor(
    private authService: AuthService,
    public router:Router
  ){}

  ngOnInit(): void {
    this.authService.isAuth$.subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
  }

  checkIsAuth(){
    const isAuth = this.authService.checkIsAuth()
    console.log({isAuth});
    return isAuth
  }

  logOut(){
    this.authService.logOut()
    this.router.navigate(['/auth/login'])
  }

}
