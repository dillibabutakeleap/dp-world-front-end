import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransferLicenseConditionsDialogComponent } from './all-users/transfer-license-conditions-dialog/transfer-license-conditions-dialog.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BillingComponent } from './billing/billing.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserProgressComponent } from './all-users/user-progress/user-progress.component';
import { TraineesComponent } from './all-users/trainees/trainees.component';
import { ResetTrainerPasswordComponent } from './all-users/reset-trainer-password/reset-trainer-password.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AllUsersComponent,
    AddUserComponent,
    TransferLicenseConditionsDialogComponent,
    BillingComponent,
    UserProgressComponent,
    TraineesComponent,
    ResetTrainerPasswordComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    FormsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    MatDialogModule,
  ],
})
export class DashboardModule {}
