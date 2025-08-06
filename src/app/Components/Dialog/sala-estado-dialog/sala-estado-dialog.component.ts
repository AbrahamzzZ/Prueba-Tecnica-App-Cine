import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sala-estado-dialog',
  imports: [MatButtonModule, MatDialogModule, MatIcon],
  templateUrl: './sala-estado-dialog.component.html',
  styleUrl: './sala-estado-dialog.component.css'
})
export class SalaEstadoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SalaEstadoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string }
  ) {}
}
