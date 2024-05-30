import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
//import { AuthService } from '@modules/auth/services/auth.service';
//import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({})

  constructor(private authService:AuthService ) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('test@prueba.com',[ // Para usar uno valor por defecto
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('FakePass',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ]),
    })
  }

  sendLogin():void {
    const { email , password } = this.formLogin.value;

    this.authService.sendCredentials(email , password );
  }
}
