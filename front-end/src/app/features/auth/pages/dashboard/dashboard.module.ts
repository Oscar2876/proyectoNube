import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../../../core/guards/auth.guard'; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [AuthGuard],
        component: DashboardComponent 
      }
    ])
  ]
})
export class DashboardModule {}

import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
@Component({
  selector: 'app-dashboard',
  template: `<h1>Bienvenido al panel</h1>`
})
export class DummyDashboardComponent {}
