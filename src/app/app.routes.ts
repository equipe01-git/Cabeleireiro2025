import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo:'entrar',
    pathMatch: 'full',
  },
  {
    path: 'entrar',
    loadComponent: () => import('./entrar/entrar.page').then( m => m.EntrarPage)
  },
  {
    path: 'criar',
    loadComponent: () => import('./criar/criar.page').then( m => m.CriarPage)
  },
];
