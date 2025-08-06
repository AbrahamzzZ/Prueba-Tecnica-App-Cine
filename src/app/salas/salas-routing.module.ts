import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./sala-list/sala-list.component').then(m => m.SalaListComponent),
    title: 'Peliculas'
  },
  {
    path: 'formulario-salas',
    loadComponent: () => import('./sala-form/sala-form.component').then(m => m.SalaFormComponent),
    title: 'Formulario de sala'
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./sala-form/sala-form.component').then(m => m.SalaFormComponent),
    title: 'Editar Sala'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalasRoutingModule { }
