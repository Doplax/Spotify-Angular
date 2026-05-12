import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TrackModel } from '@shared/Models/Tracks';

type SortDirection = 'asc' | 'desc';

interface SortOption {
  property: keyof TrackModel | null;
  order: SortDirection;
}

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrl: './play-list-body.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayListBodyComponent {
  @Input() tracks: TrackModel[] = [];

  public optionSort: SortOption = {
    property: null,
    order: 'asc',
  };

  changeSort(property: keyof TrackModel): void {
    this.optionSort = {
      property,
      order: this.optionSort.order === 'asc' ? 'desc' : 'asc',
    };
  }
}
