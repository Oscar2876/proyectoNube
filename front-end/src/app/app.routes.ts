import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { DashboardComponent } from './features/auth/pages/dashboard/dashboard.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { RegistroActividadComponent } from './features/auth/pages/registro-actividad/registro-actividad.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent 
  },
   {
    path: 'register',
    component:  RegisterComponent
  },
  {
    path: 'registro-actividad',
    component: RegistroActividadComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];