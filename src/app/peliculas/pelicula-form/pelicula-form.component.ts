import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Pelicula } from '../../Components/core/Interfaces/pelicula';
import { PeliculaService } from '../../Components/core/Service/pelicula.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pelicula-form',
  standalone: true,
  imports: [MatCardModule, MatInput, MatFormFieldModule, MatButton, ReactiveFormsModule, MatCheckboxModule, MatSnackBarModule],
  templateUrl: './pelicula-form.component.html',
  styleUrl: './pelicula-form.component.css'
})
export class PeliculaFormComponent implements OnInit {
  @Input('id') idPelicula!: number;
  private route = inject(ActivatedRoute);
  public servicio = inject(PeliculaService);
  public formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  public formPelicula = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required]],
    duracion: [0, [Validators.required, Validators.min(1), Validators.max(500)]],
    estado: [false]
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.idPelicula = parseInt(id);

      this.servicio.obtener(this.idPelicula).subscribe({
        next: (pelicula) => {
          this.formPelicula.setValue({
            nombre: pelicula.nombre,
            duracion: pelicula.duracion,
            estado: pelicula.estado
          });
        },
        error: (err) => {
          console.error('Error al obtener la película:', err);
        }
      });
    }
  }

  registrarPelicula() {
    this.formPelicula.markAllAsTouched();
    if (!this.formPelicula.valid) return;

    const pelicula: Pelicula = {
      idPelicula: this.idPelicula || 0,
      nombre: this.formPelicula.value.nombre?.trim() ?? '',
      duracion: this.formPelicula.value.duracion ?? 0,
      estado: this.formPelicula.value.estado ?? false
    };

    const peticion$ = this.idPelicula
      ? this.servicio.editar(pelicula)
      : this.servicio.registrar(pelicula);

    peticion$.subscribe({
      next: () => {
        this.snackBar.open(
          this.idPelicula ? 'Película actualizada con éxito' : 'Película registrada con éxito',
          'Cerrar',
          { duration: 3000 }
        );
        this.router.navigate(['/peliculas'], { skipLocationChange: true });
      },
      error: (err: HttpErrorResponse) => {
        console.log('Error 400:', err.error);
        if (err.error?.errors) {
          Object.entries(err.error.errors).forEach(([campo, errores]) => {
            console.log(`Error en ${campo}:`, errores);
          });
        }
      }
    });
  }

  regresar() {
    this.router.navigate(['/peliculas']);
  }
}
