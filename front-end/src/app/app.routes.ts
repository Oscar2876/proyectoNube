import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { DashboardComponent } from './features/auth/pages/dashboard/dashboard.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { RegistroActividadComponent } from './features/auth/pages/registro-actividad/registro-actividad.component';
import { VerRutinaSemanalComponent } from './features/auth/pages/ver-rutina-semanal/ver-rutina-semanal.component';

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
    path: 'ver-rutina-semanal',
    component: VerRutinaSemanalComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];