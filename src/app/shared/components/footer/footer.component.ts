import { Component } from '@angular/core';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: false,
})
export class FooterComponent {

  currentYear: number = new Date().getFullYear();

  footerLinks = {
    company: [
      { name: 'Acerca de', url: '#' },
      { name: 'Empleo', url: '#' },
      { name: 'For the Record', url: '#' }
    ],
    communities: [
      { name: 'Para artistas', url: '#' },
      { name: 'Desarrolladores', url: '#' },
      { name: 'Publicidad', url: '#' },
      { name: 'Inversores', url: '#' },
      { name: 'Proveedores', url: '#' }
    ],
    useful: [
      { name: 'Asistencia', url: '#' },
      { name: 'App gratis para móvil', url: '#' },
      { name: 'Popular por país', url: '#' }
    ],
    plans: [
      { name: 'Premium Individual', url: '#' },
      { name: 'Premium Duo', url: '#' },
      { name: 'Premium Familiar', url: '#' },
      { name: 'Premium para Estudiantes', url: '#' },
      { name: 'Spotify Free', url: '#' },
      { name: 'Audiobooks Access', url: '#' }
    ],
    bottomLinks: [
      { name: 'Legal', url: '#' },
      { name: 'Centro de seguridad y privacidad', url: '#' },
      { name: 'Política de Privacidad', url: '#' },
      { name: 'Cookies', url: '#' },
      { name: 'Información sobre los anuncios', url: '#' },
      { name: 'Accesibilidad', url: '#' },
      { name: 'Notice at Collection', url: '#' },
      { name: 'Your Privacy Choices', url: '#', hasIcon: true }
    ]
  };
}