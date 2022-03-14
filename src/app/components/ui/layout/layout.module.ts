import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { TopHeaderNavComponent } from './top-header-nav/top-header-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AlertModule } from 'src/app/shared/alert/alert.module';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [LayoutComponent, TopHeaderNavComponent, SidebarComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    AlertModule,
  ],
})
export class LayoutModule {}
