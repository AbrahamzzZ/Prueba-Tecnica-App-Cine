import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalasRoutingModule } from './salas-routing.module';
import { SalaEstadoDialogComponent } from '../Components/Dialog/sala-estado-dialog/sala-estado-dialog.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SalasRoutingModule,
    SalaEstadoDialogComponent
  ]
})
export class SalasModule { }
