import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  activeSubscription: any;
  constructor(
    private dashboardService: DashboardService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getUserSubscriptions();
  }

  getUserSubscriptions() {
    this.dashboardService.getUserSubscriptions().subscribe(
      (res: any) => {
        if (res.activeUserSubscriptions && res.activeUserSubscriptions.length) {
          this.activeSubscription = res.activeUserSubscriptions[0];
        }
      },
      (error) => {
        console.log(error);
        this.alertService.error(error.message);
      }
    );
  }
}
