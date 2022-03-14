import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  dataForm: FormGroup;
  teamUserId: any;
  public isShowConfirmPasswordError: boolean = false;
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.buildFormGroup();
    this.teamUserId = this.route.snapshot.queryParams['teamUserId'];
  }
  buildFormGroup() {
    this.dataForm = this.fb.group({
      name: [''],
      email: ['', [Validators.email]],
      phoneNumber: ['', [Validators.email]],
      password: [''],
      confirmPassword: [''],
      employeeId: ['', Validators.required],
    });
  }

  onAddUserClick() {
    const payload = this.dataForm.value;
    if (!payload.password || payload.confirmPassword !== payload.password) {
      this.isShowConfirmPasswordError = true;
      return;
    }
    this.isShowConfirmPasswordError = false;
    this.dashboardService.addTrainer(payload).subscribe(
      (res: any) => {
        this.alertService.success(res.message);
        this.router.navigate(['/trainers']);
      },
      (error) => {
        console.log(error);
        this.alertService.error(error.message);
      }
    );
  }

  onTransferLicenseClick() {
    const payload = { teamUserId: this.teamUserId, ...this.dataForm.value };
    this.dashboardService.transferLicense(payload).subscribe(
      (res) => {
        this.alertService.success(res.message);
        this.router.navigate(['/trainers']);
      },
      (err) => {
        console.log(err);
        this.alertService.error(err.message);
      }
    );
  }
}
