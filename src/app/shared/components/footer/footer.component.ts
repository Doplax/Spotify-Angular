import { Component } from '@angular/core';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: false,
})
export class FooterComponent {

  currentYear: number = 2025;

  footerLinks = {
    company: [
      { name: 'Acerca de', url: '/about' },
      { name: 'Empleo', url: '/jobs' },
      { name: 'For the Record', url: '/record' }
    ],
    communities: [
      { name: 'Para artistas', url: '/artists' },
      { name: 'Desarrolladores', url: '/developers' },
      { name: 'Publicidad', url: '/advertising' },
      { name: 'Inversores', url: '/investors' },
      { name: 'Proveedores', url: '/providers' }
    ],
    useful: [
      { name: 'Asistencia', url: '/support' },
      { name: 'App gratis para móvil', url: '/mobile' },
      { name: 'Popular por país', url: '/popular' }
    ],
    plans: [
      { name: 'Premium Individual', url: '/premium' },
      { name: 'Premium Duo', url: '/duo' },
      { name: 'Premium Familiar', url: '/family' },
      { name: 'Premium para Estudiantes', url: '/student' },
      { name: 'Spotify Free', url: '/free' },
      { name: 'Audiobooks Access', url: '/audiobooks' }
    ],
    bottomLinks: [
      { name: 'Legal', url: '/legal' },
      { name: 'Centro de seguridad y privacidad', url: '/privacy-center' },
      { name: 'Política de Privacidad', url: '/privacy' },
      { name: 'Cookies', url: '/cookies' },
      { name: 'Información sobre los anuncios', url: '/ads-info' },
      { name: 'Accesibilidad', url: '/accessibility' },
      { name: 'Notice at Collection', url: '/collection-notice' },
      { name: 'Your Privacy Choices', url: '/privacy-choices', hasIcon: true }
    ]
  };
}
