import { inject, Injectable } from '@angular/core';
import { Login } from '../Interfaces/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuarioHardcoded: Login = {
    correo: '12@gmail.com',
    clave: '123'
  };

  private isLoggedIn = false;
  private router = inject(Router);

  login(usuario: Login): boolean {
    const success =
      usuario.correo === this.usuarioHardcoded.correo &&
      usuario.clave === this.usuarioHardcoded.clave;

    this.isLoggedIn = success;
    return success;
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }

  estaLogueado(): boolean {
    return this.isLoggedIn;
  }
}
