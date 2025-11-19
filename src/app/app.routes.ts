import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo:'inicial',
    pathMatch: 'full',
  },
  {
    path: 'inicial',
    loadComponent: () => import('./inicial/inicial.page').then( m => m.InicialPage)
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
    path: 'entrarbarbeiro',
    loadComponent: () => import('./entrarbarbeiro/entrarbarbeiro.page').then( m => m.EntrarbarbeiroPage)
  },
    {
    path: 'criarbarbeiro',
    loadComponent: () => import('./criarbarbeiro/criarbarbeiro.page').then( m => m.CriarbarbeiroPage)
  },
  {
    path: 'homebarbeiro',
    loadComponent: () => import('./homebarbeiro/homebarbeiro.page').then( m => m.HomebarbeiroPage)
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
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage)
  },
];
