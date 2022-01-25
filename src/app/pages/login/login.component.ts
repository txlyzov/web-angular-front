import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  form = new FormGroup({
    login: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) {}

  submit(): void {
    this.authService.loginUser(this.form.getRawValue()).subscribe(
      (res) => {
        this.tokenStorageService.saveToken(res.token);
        this.tokenStorageService.saveLogin(res.login);
        this.reloadPage();
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      },
    );
  }

  reloadPage() {
    this.router.navigate(['/']);
  }
}
