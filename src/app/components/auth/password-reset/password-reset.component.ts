import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  public dataForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isSubmitted: boolean = false;
  showPasswordMismatchError: boolean = false;
  token: string;
  public errorMsg = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('dp-world-loggedInUser')) {
      this.router.navigate(['/']);
    }

    this.token = this.route.snapshot.queryParams['token'];
    if (!this.token) {
      this.router.navigate(['/login']);
    }
    this.buildDataForm();
  }
  buildDataForm() {
    this.dataForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  f() {
    return this.dataForm;
  }
  onResetPassword() {
    this.isSubmitted = true;
    if (this.dataForm.invalid) {
      return;
    }
    let payload = this.dataForm.value;
    payload.token = this.token;

    if (payload.password != payload.confirmPassword) {
      this.showPasswordMismatchError = true;
      return;
    } else {
      this.showPasswordMismatchError = false;
    }
    this.errorMsg = '';
    this.authService.resetPassword(payload).subscribe(
      (res) => {
        this.alertService.success(res.message);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        this.isSubmitted = false;
        this.errorMsg = error.message;
        console.error(error);
        this.alertService.error(error.message);
        if (error.isTokenExpired) {
          setTimeout(() => this.router.navigate(['/login']), 3000);
        }
      }
    );
  }
}
