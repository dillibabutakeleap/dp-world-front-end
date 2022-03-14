import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { TransferLicenseConditionsDialogComponent } from './transfer-license-conditions-dialog/transfer-license-conditions-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent implements OnInit {
  users: any[] = [];
  loggedInUserDetails: any;
  totalRecords = 0;
  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    this.loggedInUserDetails = localStorage.getItem('dp-world-loggedInUser');
    this.loggedInUserDetails = JSON.parse(this.loggedInUserDetails);
  }

  search = {
    size: 10,
    page: 0,
  };
  ngOnInit(): void {
    this.getUserTeam();
  }
  getUserTeam() {
    this.dashboardService.getUserTeam(this.search).subscribe(
      (res: any) => {
        this.users = res.trainers;
        this.totalRecords = res.totalRecords;
      },
      (err) => {
        console.error(err);
        this.alertService.error(err.message);
      }
    );
  }

  onTransferLicenseClick(user: any) {
    const dialolgRef = this.dialog.open(
      TransferLicenseConditionsDialogComponent,
      {
        minWidth: '25rem',
        disableClose: true,
      }
    );
    dialolgRef.afterClosed().subscribe((res) => {
      if (res) {
        this.router.navigate(['/users/add'], {
          queryParams: { teamUserId: user.teamUserId },
        });
      }
    });
  }
  onPageChange(pageEv: PageEvent) {
    this.search.page = pageEv.pageIndex;
    this.search.size = pageEv.pageSize;
    this.getUserTeam();
    return pageEv;
  }

  getUserOverallProgress(user: any) {
    let substationProgress =
      user && user.userProgressData ? user.userProgressData['SUB-STATION'] : 0;
    let firstAidProgress =
      user && user.userProgressData ? user.userProgressData['OFFICE'] : 0;
    let totalProgress = +substationProgress + +firstAidProgress;
    return totalProgress > 0 ? totalProgress / 2 : 0;
  }
  onViewProgressDataClick(user: any) {
    this.storeSelectedUser(user);
    this.router.navigate([user.teamUser.userId, 'progress'], {
      relativeTo: this.route,
    });
  }

  onViewTraineesClick(user: any) {
    this.storeSelectedUser(user);
    this.router.navigate([user.teamUser.userId, 'trainees'], {
      relativeTo: this.route,
    });
  }
  onResetTrainerPasswordClick(user: any) {
    this.storeSelectedUser(user);
    this.router.navigate([user.teamUser.userId, 'reset-password'], {
      relativeTo: this.route,
    });
  }
  storeSelectedUser(user: any) {
    localStorage.setItem(
      'dp-world-selected-trainer',
      JSON.stringify(user.teamUser)
    );
  }
}
