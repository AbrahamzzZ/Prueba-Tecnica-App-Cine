import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaCineService } from '../../Components/core/Service/sala-cine.service';
import { PeliculaService } from '../../Components/core/Service/pelicula.service';
import { SalaCine } from '../../Components/core/Interfaces/sala-cine';
import { Pelicula } from '../../Components/core/Interfaces/pelicula';
import { MatNativeDateModule } from '@angular/material/core';
import { PeliculaSalaCine } from '../../Components/core/Interfaces/pelicula-sala-cine';
import { PeliculaSalaCineService } from '../../Components/core/Service/pelicula-sala-cine.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-asignar-pelicula',
  imports: [MatCardModule, MatInput, MatFormFieldModule, MatButtonModule, MatSelectModule, MatDatepickerModule, ReactiveFormsModule, MatNativeDateModule
  ],
  templateUrl: './asignar-pelicula.component.html',
  styleUrl: './asignar-pelicula.component.css'
})
export class AsignarPeliculaComponent implements OnInit{
 @Input('id') idSalaPelicula!: number;
  private route = inject(ActivatedRoute);
  public servicio = inject(PeliculaSalaCineService);
  public servicioSala = inject(SalaCineService);
  public servicioPelicula = inject(PeliculaService);
  public salas:SalaCine [] = [];
  public peliculas: Pelicula [] = [];
  public formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  public formSalaPelicula = this.formBuilder.nonNullable.group({
    sala: [0, [Validators.required, Validators.min(1)]],
    pelicula: [0, [Validators.required, Validators.min(1)]],
    fechaPublicacion: [new Date(), [Validators.required]],
    fechaFin: [new Date(), [Validators.required]],
  },{
    validators: [
      fechaFinMayorAFechaInicio()
    ]
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.idSalaPelicula = parseInt(this.route.snapshot.params['id']);
    }

    this.servicioSala.lista().subscribe({
      next: (data) => {
        this.salas = data;
      },
      error: (err) => {
        console.error('Error al obtener las salas:', err);
      }
    });

    this.servicioPelicula.lista().subscribe({
      next: (data) => {
        this.peliculas = data;
      },
      error: (err) => {
        console.error('Error al obtener las peliculas:', err);
      }
    });
  }

  asignarPeliculaSala(){
    const peliculaId = this.formSalaPelicula.value.pelicula;
    const peliculaSeleccionada = this.peliculas.find(p => p.idPelicula === peliculaId )?? {} as Pelicula;
    const salaId = this.formSalaPelicula.value.sala;
    const salaSeleccionada = this.salas.find(p => p.idSala === salaId )?? {} as SalaCine;

    const peliculaSalaCine: PeliculaSalaCine = {
      idPeliculaCine: this.idSalaPelicula || 0,
      idSalaCine: salaSeleccionada.idSala,
      idPelicula: peliculaSeleccionada.idPelicula,
      fechaPublicacion: formatDate(this.formSalaPelicula.value.fechaPublicacion),
      fechaFin: formatDate(this.formSalaPelicula.value.fechaFin)
    };

    console.log(peliculaSalaCine);
    this.formSalaPelicula.markAllAsTouched();

    if (!this.formSalaPelicula.valid) {
      return;
    }

    this.servicio.registrar(peliculaSalaCine).subscribe({
      next: () => {
        this.snackBar.open('Película asignada correctamente a la sala.', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/dashboard'], { skipLocationChange: true });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error 400:', err.error);
        this.snackBar.open('Ocurrió un error al asignar la película.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  regresar() {
    this.router.navigate(['/dashboard']);
  }

  salaSeleccionada(event: MatSelectChange) {
    const idSala = event.value;
    this.formSalaPelicula.controls.sala.setValue(idSala);
  }

  peliculaSeleccionada(event: MatSelectChange) {
    const idPelicula = event.value;
    this.formSalaPelicula.controls.pelicula.setValue(idPelicula);
  }

  get salaSeleccionadaField(): FormControl<number> {
    return this.formSalaPelicula.controls.sala;
  }

  get preliculaSeleccionadaField(): FormControl<number> {
    return this.formSalaPelicula.controls.pelicula;
  }

  get fechaPublicacionField(): FormControl<Date>{
    return this.formSalaPelicula.controls.fechaPublicacion;
  }

  get fechaFinField(): FormControl<Date>{
    return this.formSalaPelicula.controls.fechaFin;
  }
}

function formatDate(date?: Date): string {
  if (!date) return '';
  return date.toISOString().split('T')[0];
}

function fechaFinMayorAFechaInicio(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fechaInicio = control.get('fechaPublicacion')?.value;
    const fechaFin = control.get('fechaFin')?.value;

    if (!fechaInicio || !fechaFin) return null;
    return fechaFin < fechaInicio ? { fechaFinInvalida: true } : null;
  };
}
