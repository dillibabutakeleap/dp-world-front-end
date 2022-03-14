import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ResetTrainerPasswordComponent } from './all-users/reset-trainer-password/reset-trainer-password.component';
import { TraineesComponent } from './all-users/trainees/trainees.component';
import { UserProgressComponent } from './all-users/user-progress/user-progress.component';
import { BillingComponent } from './billing/billing.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'trainers',
    component: AllUsersComponent,
  },
  {
    path: 'trainers/:userId/progress',
    component: UserProgressComponent,
  },
  {
    path: 'trainers/add',
    component: AddUserComponent,
  },
  {
    path: 'trainers/:trainerId/trainees',
    component: TraineesComponent,
  },
  {
    path: 'trainers/:trainerId/reset-password',
    component: ResetTrainerPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
