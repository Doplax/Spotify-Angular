import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { AuthService, LoginResponse } from '../../services/auth.service';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: false,
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public isErrorSession: boolean = false;
  public errorMessage: string = '';
  public formLogin!: FormGroup<LoginForm>;

  private readonly destroy$ = new Subject<void>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup<LoginForm>({
      email: new FormControl('admin@example.com', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('1234', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ],
      }),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sendLogin(): void {
    if (this.formLogin.invalid) return;

    const { email, password } = this.formLogin.getRawValue();
    this.authService
      .sendCredentials(email, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_response: LoginResponse) => {
          this.isErrorSession = false;
          this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          this.isErrorSession = true;
          this.errorMessage = `Login failed: ${
            error.error?.message ?? 'There is some problem with the server connection...'
          }`;
        },
      });
  }
}
