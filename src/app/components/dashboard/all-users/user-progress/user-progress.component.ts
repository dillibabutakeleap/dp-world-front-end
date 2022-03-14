import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { DashboardService } from '../../dashboard.service';
import { TransferLicenseConditionsDialogComponent } from '../transfer-license-conditions-dialog/transfer-license-conditions-dialog.component';

@Component({
  selector: 'app-user-progress',
  templateUrl: './user-progress.component.html',
  styleUrls: ['./user-progress.component.scss'],
})
export class UserProgressComponent implements OnInit {
  data: any = {};
  selectedIndex = 0;
  selectedSideNavIndex = 0;
  userId: string;
  modules: any[] = [];
  selectedUser:any;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private dashboard: DashboardService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.selectedUser = JSON.parse(
      localStorage.getItem('dp-world-selected-user') || '{}'
    );
    this.userId = this.route.snapshot.params['userId'];
    if (!this.userId) {
      this.router.navigate(['/trainers']);
      return;
    }
    this.getUserProgressData();
  }
  getUserProgressData() {
    this.dashboard.getUserProgress(this.userId).subscribe(
      (res: any) => {
        this.data = res.data;
        console.log(this.data);
        for (let module in this.data) {
          this.modules.push(module);
        }
      },
      (err) => {
        console.error(err);
        this.alertService.error(err.message);
      }
    );
  }

  getUserOverallProgress(user: any) {
    let substationProgress =
      user && user.userProgressData ? user.userProgressData['SUB-STATION'] : 0;
    let firstAidProgress =
      user && user.userProgressData ? user.userProgressData['OFFICE'] : 0;
    let totalProgress = +substationProgress + +firstAidProgress;
    return totalProgress > 0 ? totalProgress / 2 : 0;
  }

  onTransferLicenseClick(user: any) {
    const dialogRef = this.dialog.open(
      TransferLicenseConditionsDialogComponent,
      {
        minWidth: '25rem',
        disableClose: true,
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.router.navigate(['/users/add'], {
          queryParams: { teamUserId: user.teamUserId },
        });
      }
    });
  }

  onNavItemClick(index: number) {
    this.selectedIndex = index;
  }

  onSideNavClick(index: number) {
    this.selectedSideNavIndex = index;
  }

  timeMask(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + 'M : ' + (value - minutes * 60) + 'S';
  }
}
