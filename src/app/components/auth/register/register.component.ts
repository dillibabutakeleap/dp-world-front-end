import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public dataForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  showPasswordMismatchError: boolean = false;
  isSubmitted: boolean = false;
  errorMsg = '';
  successMsg = '';
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
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  f() {
    return this.dataForm;
  }
  onRegister() {
    this.isSubmitted = true;
    let formValue = this.dataForm.value;
    if (formValue.password != formValue.confirmPassword) {
      this.showPasswordMismatchError = true;
      return;
    } else {
      this.showPasswordMismatchError = false;
    }
    if (this.dataForm.invalid) {
      return;
    }
    this.authService.registerUser(formValue).subscribe(
      (res) => {
        this.successMsg = res.message;
        localStorage.setItem('dp-world-loggedInUser', JSON.stringify(res.user));
        this.alertService.success(res.message);
        setTimeout(() => this.router.navigate(['/']), 1000);
      },
      (error) => {
        console.error(error);
        this.errorMsg = error.message;
        this.alertService.error(error.message);
      }
    );
  }
}
