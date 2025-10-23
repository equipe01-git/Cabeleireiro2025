import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'entrar',
    loadComponent: () => import('./entrar/entrar.page').then( m => m.EntrarPage)
  },
  {
    path: 'criar',
    loadComponent: () => import('./criar/criar.page').then( m => m.CriarPage)
  },
];
