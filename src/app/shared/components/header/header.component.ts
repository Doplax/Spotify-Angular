import { Component } from '@angular/core';
import { SvgLogoComponent } from "../../SVGcomnents/svg-logo/svg-logo.component";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [SvgLogoComponent]
})
export class HeaderComponent {

}
