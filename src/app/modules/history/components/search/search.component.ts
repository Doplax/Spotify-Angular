import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  src: string= '';
  @Output() callBackData: EventEmitter<any> = new EventEmitter();

  callSearch(term: string): void {
    if (term.length >= 3){
      this.callBackData.emit(term) // Para disparar el evento hacia el padre a la funcion recveData()
      console.log('term', term)
    }
  }
}
