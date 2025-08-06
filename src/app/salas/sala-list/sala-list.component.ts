import { AfterViewInit, Component, inject, NgModule, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router, RouterOutlet } from '@angular/router';
import { SalaCineService } from '../../Components/core/Service/sala-cine.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SalaCine } from '../../Components/core/Interfaces/sala-cine';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SalaEstadoDialogComponent } from '../../Components/Dialog/sala-estado-dialog/sala-estado-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sala-list',
  imports: [MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatIcon, RouterOutlet, MatCardModule, NgClass, FormsModule, MatSnackBarModule],
  templateUrl: './sala-list.component.html',
  styleUrl: './sala-list.component.css'
})
export class SalaListComponent implements AfterViewInit{
  public servicio = inject(SalaCineService);
  public listaSalas = new MatTableDataSource<SalaCine>();
  public snackBar = inject(MatSnackBar);
  nombreBuscado: string = '';
  mensajeEstado: string = '';
  displayedColumns: string[] = [
    'idSala',
    'nombre',
    'estado',
    'accion'
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {
    this.obtenerSalas();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.listaSalas.paginator = this.paginator;
  }

  /*filtrarSalas(nombre: string){
    this.listaSalas.filter = nombre.trim().toLowerCase();
      if (this.listaSalas.paginator) {
        this.listaSalas.paginator.firstPage();
      }
  }*/

  buscarEstadoSala() {
    const nombre = this.nombreBuscado.trim();
    if (!nombre) {
      this.abrirDialogo('Por favor ingresa un nombre de sala válido.');
      return;
    }

    this.servicio.buscarPorNombre(nombre).subscribe({
      next: (data) => {
        const cantidad = data.cantidadPeliculas;
        let mensaje = '';

        if (cantidad < 3) {
          mensaje = 'Sala disponible';
        } else if (cantidad >= 3 && cantidad <= 5) {
          mensaje = `Sala con ${cantidad} películas asignadas`;
        } else {
          mensaje = 'Sala no disponible';
        }

        this.abrirDialogo(mensaje);
      },
      error: (err) => {
        if (err.status === 404) {
          this.abrirDialogo('Sala no encontrada.');
        } else {
          this.abrirDialogo('Ocurrió un error al buscar la sala.');
        }
      }
    });
  }

  abrirDialogo(mensaje: string) {
    this.dialog.open(SalaEstadoDialogComponent, {
      data: { mensaje }
    });
  }

  obtenerSalas(){
    this.servicio.lista().subscribe({
      next: (data) => {
        this.listaSalas.data = data;
      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }

  nuevo() {
    this.router.navigate(['salas/formulario-salas']);
  }

  editar(sala: SalaCine) {
    this.router.navigate(['salas/editar', sala.idSala]);
  }

  eliminar(sala: SalaCine) {
    this.servicio.eliminar(sala.idSala).subscribe({
      next: () => {
        this.snackBar.open(
          `Sala eliminada lógicamente`,
          'Cerrar',
          { duration: 3000 }
        );
        this.obtenerSalas();
      },
      error: (err) => {
        console.log(err.message);
        this.snackBar.open(
          'Error al eliminar la sala',
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
