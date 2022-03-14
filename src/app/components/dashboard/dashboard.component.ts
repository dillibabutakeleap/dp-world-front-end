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
  public chartOptions: any;
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
        this.processSubStationData();
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
    if (this.dashboardData && this.dashboardData.progressData.OFFICE) {
      unCompleted = this.dashboardData.progressData.OFFICE['unCompleted']
        ? this.dashboardData.progressData.OFFICE['unCompleted']
        : 0;
      fireSafety = this.dashboardData.progressData.OFFICE['FIRE SAFETY']
        ? this.dashboardData.progressData.OFFICE['FIRE SAFETY']
        : 0;
      firstAid = this.dashboardData.progressData.OFFICE['FIRST AID']
        ? this.dashboardData.progressData.OFFICE['FIRST AID']
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
  processSubStationData() {
    let unCompleted: number = 0;
    let fireSafety: number = 0;
    let firstAid: number = 0;
    console.log(this.dashboardData);
    if (this.dashboardData && this.dashboardData.progressData['SUB-STATION']) {
      unCompleted = this.dashboardData.progressData['SUB-STATION'][
        'unCompleted'
      ]
        ? this.dashboardData.progressData['SUB-STATION']['unCompleted']
        : 0;
      fireSafety = this.dashboardData.progressData['SUB-STATION']['FIRE SAFETY']
        ? this.dashboardData.progressData['SUB-STATION']['FIRE SAFETY']
        : 0;
      firstAid = this.dashboardData.progressData['SUB-STATION']['FIRST AID']
        ? this.dashboardData.progressData['SUB-STATION']['FIRST AID']
        : 0;
      console.log('coming');
    }
    if (fireSafety + firstAid <= 0) {
      unCompleted = 100;
    }
    this.chartOptions = {
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
