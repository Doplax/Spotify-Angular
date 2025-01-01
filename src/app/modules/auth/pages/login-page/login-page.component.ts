import {
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
//import { AuthService } from '@modules/auth/services/auth.service';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  errorSession: boolean = false;
  formLogin: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private cookie:CookieService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('admin@example.com', [
        // Para usar uno valor por defecto
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('1234', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
    });
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value;
    this.authService.sendCredentials(email, password).subscribe(
      (responseOk) => {
        this.router.navigate(['/']);
      },
      (err) => {
        //TODO error >= 400
        this.errorSession = err;
        console.log('Login failed');
      }
    );
  }
}
