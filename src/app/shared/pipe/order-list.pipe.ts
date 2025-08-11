import { Pipe, PipeTransform } from '@angular/core';
import { TrackModel } from '@shared/Models/Tracks';

// Definimos el Pipe con el nombre 'orderList'
@Pipe({
    name: 'orderList',
    standalone: false
})
export class OrderListPipe implements PipeTransform {

  // El método transform se utiliza para transformar los datos de entrada
  transform(value: Array<any>, args: string | null = null, sort: string = 'asc'): TrackModel[] { // FIJATE: Estamos devolviendo un TrackModel
    // Si no se pasa un argumento para ordenar (args), devolvemos la lista original
    if (args === null) {
      return value;
    } else {
      // Creamos una copia de la lista original y la ordenamos
      const tmpList = value.sort((a, b) => {
        // Comparamos los valores de los objetos según el argumento de ordenación (args)
        if (a[args] < b[args]) {
          return -1;
        } else if (a[args] === b[args]) {
          return 0;
        } else if (a[args] > b[args]) {
          return 1;
        }
        // Este return es redundante, ya que todos los casos están cubiertos
        return 1;
      });

      // Devolvemos la lista ordenada ascendentemente o la invertimos para un orden descendente
      return (sort === 'asc') ? tmpList : tmpList.reverse();
    }
  }
}
