import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPlaceholderComponent } from './pages/account-placeholder/account-placeholder.component';

const routes: Routes = [
  {
    path: '',
    component: AccountPlaceholderComponent,
    data: {
      title: 'Mi cuenta',
      subtitle: 'Gestiona tu información personal y suscripción.',
      icon: 'account_circle',
      gradient: '#1f6feb, #0b3a8a',
    },
  },
  {
    path: 'profile',
    component: AccountPlaceholderComponent,
    data: {
      title: 'Perfil',
      subtitle: 'Tu perfil público y tus seguidores.',
      icon: 'person',
      gradient: '#7c3aed, #2e1065',
    },
  },
  {
    path: 'premium',
    component: AccountPlaceholderComponent,
    data: {
      title: 'Sube a Premium',
      subtitle: 'Música sin anuncios, descargas y modo sin conexión.',
      icon: 'workspace_premium',
      gradient: '#facc15, #b45309',
    },
  },
  {
    path: 'support',
    component: AccountPlaceholderComponent,
    data: {
      title: 'Asistencia',
      subtitle: 'Centro de ayuda y contacto.',
      icon: 'help_outline',
      gradient: '#06b6d4, #0e7490',
    },
  },
  {
    path: 'download',
    component: AccountPlaceholderComponent,
    data: {
      title: 'Descargar',
      subtitle: 'Aplicación de escritorio para Mac, Windows y Linux.',
      icon: 'download',
      gradient: '#22c55e, #14532d',
    },
  },
  {
    path: 'settings',
    component: AccountPlaceholderComponent,
    data: {
      title: 'Configuración',
      subtitle: 'Preferencias de reproducción, idioma y privacidad.',
      icon: 'settings',
      gradient: '#475569, #0f172a',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
