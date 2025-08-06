import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaCineService } from '../../Components/core/Service/sala-cine.service';
import { SalaCine } from '../../Components/core/Interfaces/sala-cine';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sala-form',
  imports: [MatCardModule, MatInput, MatFormFieldModule, MatButton, ReactiveFormsModule, MatCheckboxModule ],
  templateUrl: './sala-form.component.html',
  styleUrl: './sala-form.component.css'
})
export class SalaFormComponent implements OnInit{
 @Input('id') idSala!: number;
  private route = inject(ActivatedRoute);
  public servicio = inject(SalaCineService);
  public formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  public formSala = this.formBuilder.nonNullable.group({
    nombre:['', [Validators.required]],
    estado:[false]
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.idSala = parseInt(id);

      this.servicio.obtener(this.idSala).subscribe({
        next: (sala) => {
          this.formSala.setValue({
            nombre: sala.nombre,
            estado: sala.estado
          });
        },
        error: (err) => {
          console.error('Error al obtener la sala:', err);
        }
      });
    }
  }

  registrarSala() {
    this.formSala.markAllAsTouched();
    if (!this.formSala.valid) return;

    const sala: SalaCine = {
      idSala: this.idSala || 0,
      nombre: this.formSala.value.nombre?.trim() ?? '',
      estado: this.formSala.value.estado ?? false
    };

    const peticion$ = this.idSala
      ? this.servicio.editar(sala)
      : this.servicio.registrar(sala);

    peticion$.subscribe({
      next: () => {
        this.snackBar.open(
          this.idSala ? 'Sala actualizada con éxito' : 'Sala registrada con éxito',
          'Cerrar',
          { duration: 3000 }
        );
        this.router.navigate(['/salas'], { skipLocationChange: true });
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
    this.router.navigate(['/salas']);
  }
}
