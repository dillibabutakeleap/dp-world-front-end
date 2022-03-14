import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-reset-trainer-password',
  templateUrl: './reset-trainer-password.component.html',
  styleUrls: ['./reset-trainer-password.component.scss'],
})
export class ResetTrainerPasswordComponent implements OnInit {
  dataForm: FormGroup;
  public isShowConfirmPasswordError: boolean = false;
  private trainerId: any;
  public selectedTrainer: any;
  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.trainerId = this.route.snapshot.params['trainerId'];
    this.selectedTrainer = localStorage.getItem('dp-world-selected-trainer');
    if (this.selectedTrainer) {
      this.selectedTrainer = JSON.parse(this.selectedTrainer);
    }
    if (!this.selectedTrainer) {
      this.router.navigate(['/trainers']);
    }
    this.trainerId = this.route.snapshot.params['trainerId'];
    this.buildDataForm();
  }
  buildDataForm() {
    this.dataForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onResetPassword() {
    let payload = this.dataForm.value;
    payload['trainerId'] = this.trainerId;
    if (payload.password !== payload.confirmPassword) {
      this.isShowConfirmPasswordError = true;
      return;
    }
    this.isShowConfirmPasswordError = false;
    this.dashboardService.resetTrainerPassword(payload).subscribe(
      (res: any) => {
        this.alertService.success(res.message);
        setTimeout(() => {
          this.router.navigate(['/trainers']);
        }, 2000);
      },
      (error) => {
        console.error(error);
        this.alertService.error(error.message);
      }
    );
  }
}
