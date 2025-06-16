import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isInvalid(control: string): boolean {
    const campo = this.registerForm.get(control);
    return !!campo && campo.invalid && campo.touched;
  }

 onSubmit(): void {
  if (this.registerForm.invalid) return;

  this.errorMessage = '';
  this.loading = true;

  const userData = {
    ...this.registerForm.value,
    rol: 'USUARIO'
  };

  this.authService.register(userData).subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: err => {
      this.errorMessage = err.error?.error || err.error?.message || 'Error al registrar usuario';
      this.loading = false;
    }
  });
}

Loginsubmit(){
      this.router.navigate(['/login']);
}

}
