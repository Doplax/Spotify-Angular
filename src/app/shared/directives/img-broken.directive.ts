import { Directive, ElementRef, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[appImgBroken]',
  standalone: false,
})
export class ImgBrokenDirective {
  constructor(private elHost: ElementRef<HTMLImageElement>) {}

  @HostListener('error') handleError(): void {
    this.elHost.nativeElement.src = environment.defaultImageUrl;
  }
}
