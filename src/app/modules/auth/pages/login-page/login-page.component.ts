import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
//import { AuthService } from '@modules/auth/services/auth.service';
//import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({})

  constructor() { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('email@prueba.com',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('email@prueba.com',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ]),
    })
  }

  sendLogin():void {
    const body = this.formLogin.value;
    console.log(body);

  }
}
