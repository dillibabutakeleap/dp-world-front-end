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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onAddUserClick() {
    this.dashboardService.addTeamUser(this.dataForm.value).subscribe(
      (res: any) => {
        this.alertService.success(res.message);
        this.router.navigate(['/users']);
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
        this.router.navigate(['/users']);
      },
      (err) => {
        console.log(err);
        this.alertService.error(err.message);
      }
    );
  }
}