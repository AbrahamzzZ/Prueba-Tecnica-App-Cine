import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../Components/core/Service/login.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../Components/core/Interfaces/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public servicio = inject(LoginService);
  public formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  public formLogin = this.formBuilder.nonNullable.group({
    correo:['', [Validators.required, Validators.email]],
    clave:['', Validators.required]
  });

  constructor(private router: Router){}

  login() {
    if (this.formLogin.valid) {
      const credenciales: Login = {
        correo: this.formLogin.get('correo')?.value ?? '',
        clave: this.formLogin.get('clave')?.value ?? ''
      };

      const exito = this.servicio.login(credenciales); 

      if (exito) {
        this.snackBar.open('¡Inicio de sesión exitoso!', 'Cerrar', {
          duration: 3000
        });

        this.router.navigate(['/dashboard']);
      } else {
        this.snackBar.open('Correo o contraseña incorrectos', 'Cerrar', {
          duration: 3000
        });
      }
    } else {
      this.formLogin.markAllAsTouched();
      this.snackBar.open('Complete todos los campos obligatorios', 'Cerrar', {
        duration: 3000
      });
    }
  }
}
