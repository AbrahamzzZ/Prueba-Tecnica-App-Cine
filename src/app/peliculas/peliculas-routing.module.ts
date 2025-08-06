import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pelicula-list/pelicula-list.component').then(m => m.PeliculaListComponent),
    title: 'Peliculas'
  },
  {
    path: 'formulario-peliculas',
    loadComponent: () => import('./pelicula-form/pelicula-form.component').then(m => m.PeliculaFormComponent),
    title: 'Formulario de pelicula'
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./pelicula-form/pelicula-form.component').then(m => m.PeliculaFormComponent),
    title: 'Editar Pelicula'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }
