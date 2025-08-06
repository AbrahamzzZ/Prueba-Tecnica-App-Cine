import { Component, inject } from '@angular/core';
import { LoginService } from '../../core/Service/login.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  public servicio = inject(LoginService);

  cerrarSesion() {
    this.servicio.logout();
  }
}
