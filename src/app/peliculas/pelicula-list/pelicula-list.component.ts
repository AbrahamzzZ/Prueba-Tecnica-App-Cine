import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { PeliculaService } from '../../Components/core/Service/pelicula.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Pelicula } from '../../Components/core/Interfaces/pelicula';
import { NgClass } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pelicula-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatIcon, RouterOutlet, NgClass, MatSnackBarModule],
  templateUrl: './pelicula-list.component.html',
  styleUrl: './pelicula-list.component.css'
})
export class PeliculaListComponent implements AfterViewInit{
  public servicio = inject(PeliculaService);
  public listaPeliculas = new MatTableDataSource<Pelicula>();
  public snackBar = inject(MatSnackBar);
  displayedColumns: string[] = [
    'idPelicula',
    'nombre',
    'duracion',
    'estado',
    'accion'
  ];

  constructor(
    private router: Router
  ) {
    this.obtenerPeliculas();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.listaPeliculas.paginator = this.paginator;
  }

  filtrarPeliculas(nombre: string){
    this.listaPeliculas.filter = nombre.trim().toLowerCase();
    if (this.listaPeliculas.paginator) {
      this.listaPeliculas.paginator.firstPage();
    }
  }

  obtenerPeliculas(){
    this.servicio.lista().subscribe({
      next: (data) => {
        this.listaPeliculas.data = data;
      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }

  nuevo() {
    this.router.navigate(['peliculas/formulario-peliculas']);
  }

  editar(pelicula: Pelicula) {
    this.router.navigate(['peliculas/editar', pelicula.idPelicula]);
  }

  eliminar(pelicula: Pelicula){
    this.servicio.eliminar(pelicula.idPelicula).subscribe({
      next: (data) => {
        this.snackBar.open(
          `Pelicula eliminada lógicamente`,
          'Cerrar',
          { duration: 3000 }
        );
        this.obtenerPeliculas();
      },
      error: (err) => {
        console.log(err.message);
          this.snackBar.open(
          'Error al eliminar la pelicula',
          'Cerrar',
          { duration: 3000 }
        );
      }
    });
  }

  getEstado(estado: boolean): string {
    return estado ? 'Activo' : 'No Activo';
  }
}
