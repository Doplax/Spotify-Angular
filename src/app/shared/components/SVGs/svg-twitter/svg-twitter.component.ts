import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-svg-twitter',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-480 -466.815 2160 2160"
      width="24"
      height="24"
      class="g-svg-flex"
      >
      <circle [attr.fill]="fill"  cx="600" cy="613.185" r="1080"/>
      <path fill="black"  d="M306.615 79.694H144.011L892.476 1150.3h162.604ZM0 0h357.328l309.814 450.883L1055.03 0h105.86L714.15 519.295 1200 1226.37H842.672L515.493 750.215 105.866 1226.37H0l468.485-544.568Z"/></svg>
  `,
  standalone: false,
})
export class SvgTwitterComponent {
  @Input() fill: string = 'white';
}
