import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
      password: ['', Validators.required],
    });
  }

  f() {
    return this.dataForm;
  }
  onLogin() {
    if (this.dataForm.invalid) {
      return;
    }
    let payload = this.dataForm.value;
    this.errorMsg = '';
    this.authService.login(payload).subscribe(
      (res) => {
        localStorage.setItem('dp-world-loggedInUser', JSON.stringify(res.user));
        this.alertService.success(res.message);
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMsg = error.message;
        console.error(error);
        this.alertService.error(error.message);
      }
    );
  }
}
