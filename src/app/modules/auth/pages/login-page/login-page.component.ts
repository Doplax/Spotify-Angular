import {
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
//import { AuthService } from '@modules/auth/services/auth.service';
//import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  errorSession: boolean = false;
  formLogin: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private cookie:CookieService) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('test@prueba.com', [
        // Para usar uno valor por defecto
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('FakePass', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
    });
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value;

    this.authService.sendCredentials(email, password).subscribe(
      (responseOk) => {
        //TODO: When response is Ok
        console.log("Login successful");
        const { tokenSession } = responseOk
        this.cookie.set('token', tokenSession , 4, '/' )
      },
      (err) => {
        //TODO error >= 400
        this.errorSession = err;
        console.log('Login failed');
      }
    );
  }
}
