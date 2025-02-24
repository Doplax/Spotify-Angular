import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'shared-svg-next',
  styles: [`
    :host(.revert) {
      transform: rotate(180deg);
    }
  `],
  template: `
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      class="Svg-sc-ytk21e-0 dYnaPI e-9541-icon"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path
        d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"
      ></path>
    </svg>
  `,
  standalone: false,
})
export class SvgNextComponent {
  @Input() revert: boolean = false;
  @HostBinding('class.revert') get isRevert() {
    return this.revert;
  }

}
