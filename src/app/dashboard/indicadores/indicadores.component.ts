import { Component, inject, OnInit } from '@angular/core';
import { PeliculaService } from '../../Components/core/Service/pelicula.service';
import { SalaCineService } from '../../Components/core/Service/sala-cine.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-indicadores',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './indicadores.component.html',
  styleUrl: './indicadores.component.css'
})
export class IndicadoresComponent implements OnInit{
  public servicioPelicula = inject(PeliculaService);
  public servicioSalaCine = inject(SalaCineService);

  totalPeliculas: number = 0;
  totalSalas: number = 0;
  totalSalasDisponibles: number = 0;

  ngOnInit(): void {
    this.cargarPeliculas();
    this.cargarSalas();
  }

  cargarPeliculas() {
    this.servicioPelicula.lista().subscribe(data => {
      this.totalPeliculas = data.length;
    });
  }

  cargarSalas() {
    this.servicioSalaCine.lista().subscribe(data => {
      this.totalSalas = data.length;
      this.totalSalasDisponibles = data.filter(sala => sala.estado === true).length;
    });
  }
}
