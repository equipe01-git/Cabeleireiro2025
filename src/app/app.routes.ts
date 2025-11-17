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
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'agendamento',
    loadComponent: () => import('./agendamento/agendamento.page').then( m => m.CalendarioComponent)
  },
  {
    path: 'historico',
    loadComponent: () => import('./historico/historico.page').then( m => m.HistoricoPage)
  },
  {
    path: 'provedor',
    loadComponent: () => import('./provedor/provedor.page').then( m => m.ProvedorPage)
  },
];
