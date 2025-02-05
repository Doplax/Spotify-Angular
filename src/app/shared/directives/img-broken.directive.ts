import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appImgBroken]',
    standalone: false
})

export class ImgBrokenDirective {

  // Cuando una directiva detecte que su host (en este caso una imagen) dispara el evento de error,
  // cambiaremos su src, por una imagen por defecto
  @HostListener('error') handleError(): void{
    const elNative = this.elHost.nativeElement
    elNative.src = 'https://raw.githubusercontent.com/Doplax/doplax/main/assets/img/product/defaultImage.png'
  }

  constructor(private elHost: ElementRef) { }

}
