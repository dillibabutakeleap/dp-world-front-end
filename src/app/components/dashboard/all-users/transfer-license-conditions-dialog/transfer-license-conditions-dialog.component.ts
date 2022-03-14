import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-transfer-license-conditions-dialog',
  templateUrl: './transfer-license-conditions-dialog.component.html',
  styleUrls: ['./transfer-license-conditions-dialog.component.scss'],
})
export class TransferLicenseConditionsDialogComponent implements OnInit {
  conditions: any[] = [];
  constructor(
    private dashboardService: DashboardService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.dashboardService.loadTransferLicenseConditions().subscribe(
      (res: any) => {
        this.conditions = res.conditions;
      },
      (err) => {
        console.log(err);
        this.alertService.error(err.message);
      }
    );
  }
}
