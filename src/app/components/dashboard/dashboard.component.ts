import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import Swal from 'sweetalert2';
import { DashboardService } from './dashboard.service';
import { ChartComponent } from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userDetails: any;
  activeSubscription: any;
  @ViewChild('chart') chart: ChartComponent;
  public officeChart: any;
  public dashboardData: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private alertService: AlertService
  ) {
    this.userDetails = localStorage.getItem('dp-world-loggedInUser');
    this.userDetails = JSON.parse(this.userDetails);
  }

  licensesCount = '';
  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    if (params['subscriptionAdded']) {
      setTimeout(() => {
        Swal.fire(
          'Congratulations!',
          'Subscription added to your account successfully.',
          'success'
        );
        this.router.navigate(['.'], {
          relativeTo: this.route,
          queryParams: {},
        });
      }, 500);
    }
    this.getUserTeam();
    this.getDashboardData();
  }

  getUserTeam() {
    this.dashboardService.getUserTeam({ page: 0, size: 99999 }).subscribe(
      (res: any) => {
        this.licensesCount = res.licensesCount;
      },
      (error) => {
        console.log(error);
        this.alertService.error(error.message);
      }
    );
  }

  getDashboardData() {
    this.dashboardService.getDashboardData().subscribe(
      (data) => {
        this.dashboardData = data;
        this.processOfficeChartData();
      },
      (err) => {
        console.log(err);
        this.alertService.error(err.message);
      }
    );
  }

  processOfficeChartData() {
    let unCompleted: number = 0;
    let fireSafety: number = 0;
    let firstAid: number = 0;
    console.log(this.dashboardData);
    if (this.dashboardData && this.dashboardData.progressData) {
      unCompleted = this.dashboardData.progressData['unCompleted']
        ? this.dashboardData.progressData['unCompleted']
        : 0;
      fireSafety = this.dashboardData.progressData['Training Simulation']
        ? this.dashboardData.progressData['Training Simulation']
        : 0;
      firstAid = this.dashboardData.progressData['Tutorials']
        ? this.dashboardData.progressData['Tutorials']
        : 0;
      console.log('coming');
    }
    this.officeChart = {
      // uncompleted, fire safety, first aid
      series: [unCompleted, fireSafety, firstAid],
      chart: {
        width: 300,
        type: 'donut',
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: false,
      },
      fill: {
        type: 'gradient',
        colors: ['#CECECE', '#55BBD5', '#24A3F8'],
      },
      colors: ['#CECECE', '#55BBD5', '#24A3F8'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'top',
            },
          },
        },
      ],
    };
  }
}
