import { Routes } from '@angular/router';
import { PeliculaListComponent } from './peliculas/pelicula-list/pelicula-list.component';
import { SalaListComponent } from './salas/sala-list/sala-list.component';
import { AsignarPeliculaComponent } from './asignacion/asignar-pelicula/asignar-pelicula.component';
import { AuthLayoutComponent } from './Components/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './Components/layouts/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent, 
        children: [
        {
            path: '',
            loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
        },
        ]
    },
    {
        path: '',
        component: MainLayoutComponent, 
        children: [
        {
            path: 'dashboard',
            loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
        },
        {
            path: 'peliculas',
            loadChildren: () => import('./peliculas/peliculas.module').then(m => m.PeliculasModule)
        },
        {
            path: 'salas',
            loadChildren: () => import('./salas/salas.module').then(m => m.SalasModule)
        },
        { path: 'asignar', 
            loadChildren: () => import('./asignacion/asignacion.module').then(m => m.AsignacionModule)
        },
        { path: '', redirectTo: 'peliculas', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'login' }
];
