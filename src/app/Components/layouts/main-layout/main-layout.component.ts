import { Component, inject } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { RouterOutlet } from "@angular/router";
import { LoginService } from '../../core/Service/login.service';

@Component({
  selector: 'app-main-layout',
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  public loginService = inject(LoginService);
}
