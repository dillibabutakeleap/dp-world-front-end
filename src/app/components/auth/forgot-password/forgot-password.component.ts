import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public dataForm: FormGroup;
  showPassword: boolean = false;
  public errorMsg = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('dp-world-loggedInUser')) {
      this.router.navigate(['/']);
    }
    this.buildDataForm();
  }
  buildDataForm() {
    this.dataForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  f() {
    return this.dataForm;
  }
  onForgotPasswordSubmit() {
    if (this.dataForm.invalid) {
      return;
    }
    let payload = this.dataForm.value;
    this.errorMsg = '';
    this.authService.forgotPassword(payload).subscribe(
      (res) => {
        this.alertService.success(res.message);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        this.errorMsg = error.message;
        console.error(error);
        this.alertService.error(error.message);
      }
    );
  }
}
