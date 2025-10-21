import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'entrar',
    loadComponent: () => import('./entrar/entrar.page').then( m => m.EntrarPage)
  },
];
