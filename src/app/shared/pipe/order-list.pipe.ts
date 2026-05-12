import { Pipe, PipeTransform } from '@angular/core';
import { TrackModel } from '@shared/Models/Tracks';

type SortDirection = 'asc' | 'desc';

@Pipe({
  name: 'orderList',
  standalone: false,
})
export class OrderListPipe implements PipeTransform {
  transform(
    value: TrackModel[],
    args: keyof TrackModel | null = null,
    sort: SortDirection = 'asc'
  ): TrackModel[] {
    if (args === null || !value?.length) {
      return value ?? [];
    }

    const tmpList = [...value].sort((a, b) => {
      const valA = a[args];
      const valB = b[args];
      if (valA == null && valB == null) return 0;
      if (valA == null) return -1;
      if (valB == null) return 1;
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });

    return sort === 'asc' ? tmpList : tmpList.reverse();
  }
}
