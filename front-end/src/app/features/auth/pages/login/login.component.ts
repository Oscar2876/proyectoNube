import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PushNotificationService } from '../../../../core/services/push.notification.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private pushService: PushNotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email!, password!).subscribe({
        next: async () => {
          this.loading = false;

          try {
  // Obtener token FCM
          const fcmToken = await this.pushService.requestPermission();

          // Enviar notificación de bienvenida solo si se obtuvo un token válido
          if (fcmToken) {
            this.authService.sendNotification({
              token: fcmToken,
              title: 'Inicio de sesión exitoso',
              body: `Bienvenido/a ${email}`
            }).subscribe({
              next: () => console.log('🔔 Notificación enviada'),
              error: err => console.error('❌ Error al enviar notificación', err)
            });
          } else {
            console.warn('⚠️ No se obtuvo un token FCM válido, no se enviará la notificación.');
          }
          } catch (err) {
            console.error('❌ No se pudo obtener el token FCM:', err);
          }

          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'Credenciales inválidas';
        }
      });
    }
  }

  registersubmit() {
    this.router.navigate(['/register']);
  }


}
