import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { CardPlayerMode } from '@shared/enums';

@Component({
    selector: 'app-section-generic',
    templateUrl: './section-generic.component.html',
    styleUrl: './section-generic.component.scss',
    standalone: false
})
export class SectionGenericComponent {
  @Input() title: string = '';
  @Input() isLoading: boolean = false;
  @Input({required:true}) mode!: CardPlayerMode;
  @Input() dataTracks: Array<TrackModel> = []
  public CardPlayerMode = CardPlayerMode;
}
