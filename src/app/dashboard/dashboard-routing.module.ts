import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndicadoresComponent } from './indicadores/indicadores.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./indicadores/indicadores.component').then(m => m.IndicadoresComponent),
    title: 'Dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
