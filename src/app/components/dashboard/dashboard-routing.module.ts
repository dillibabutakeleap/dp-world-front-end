import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserProgressComponent } from './all-users/user-progress/user-progress.component';
import { BillingComponent } from './billing/billing.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'users',
    component: AllUsersComponent,
  },
  {
    path: 'users/:userId/progress',
    component: UserProgressComponent,
  },
  {
    path: 'users/add',
    component: AddUserComponent,
  },
  {
    path: 'billing',
    component: BillingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
