import { Directive, ElementRef, HostListener } from '@angular/core';

const DEFAULT_IMAGE_URL =
  'https://raw.githubusercontent.com/Doplax/doplax/main/assets/img/product/defaultImage.png';

@Directive({
  selector: '[appImgBroken]',
  standalone: false,
})
export class ImgBrokenDirective {
  constructor(private elHost: ElementRef<HTMLImageElement>) {}

  @HostListener('error') handleError(): void {
    this.elHost.nativeElement.src = DEFAULT_IMAGE_URL;
  }
}
