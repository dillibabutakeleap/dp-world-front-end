import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { DashboardService } from '../../dashboard.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-trainees',
  templateUrl: './trainees.component.html',
  styleUrls: ['./trainees.component.scss'],
})
export class TraineesComponent implements OnInit {
  public trainees: any[] = [];
  public selectedTrainer: any;
  public totalRecords: number = 0;
  public search: any = {
    page: 0,
    size: 20,
  };
  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.selectedTrainer = localStorage.getItem('dp-world-selected-trainer');
    if (this.selectedTrainer) {
      this.selectedTrainer = JSON.parse(this.selectedTrainer);
    }
    if (!this.selectedTrainer) {
      this.router.navigate(['/trainers']);
    }
    this.getTrainees();
  }

  private getTrainees() {
    this.dashboardService
      .getTrainees(this.selectedTrainer.userId, this.search)
      .subscribe(
        (res: any) => {
          this.trainees = res.trainees;
          this.totalRecords = res.totalRecords;
        },
        (err) => {
          console.error(err);
          this.alertService.error(err.message);
        }
      );
  }
  onViewProgressDataClick(user: any) {
    user.teamUser['progress'] = user.progress;
    localStorage.setItem(
      'dp-world-selected-user',
      JSON.stringify(user.teamUser)
    );
    this.router.navigate([user.teamUser.userId, 'progress'], {
      relativeTo: this.route,
    });
  }
  onPageChange(pageEv: PageEvent) {
    this.search.page = pageEv.pageIndex;
    this.search.size = pageEv.pageSize;
    this.getTrainees();
    return pageEv;
  }

  onDownloadUserProgress(user: any) {
    this.dashboardService
      .getUserCourseCompletionCertificate(user.teamUser.userId)
      .subscribe(
        (data: any) => {
          var fileName = user.teamUser.employeeId + '-certificate.pdf';
          const contentDisposition = data.headers.get('Content-Disposition');
          if (contentDisposition) {
            const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = fileNameRegex.exec(contentDisposition);
            if (matches != null && matches[1]) {
              fileName = matches[1].replace(/['"]/g, '');
            }
          }
          saveAs(data.body, fileName);
          this.alertService.success('Certificate downloaded successfully.');
        },
        (error) => {
          console.error(error);
          this.alertService.error(error.message);
        }
      );
  }
  onDeleteTrainerClick(user: any) {
    console.log(user);
    if (
      confirm(
        'Are you sure you want to delete the trainer?.\nNOTE: Trainees data of this trainer will get deleted too.'
      )
    ) {
      let payload = { userId: user.userId };
      this.dashboardService.deleteUser(payload).subscribe(
        (res: any) => {
          this.alertService.success(res.message);
           this.getTrainees();
        },
        (error: any) => {
          console.log(error);
          this.alertService.error(
            error && error.message ? error.message : error
          );
        }
      );
    }
  }

}
