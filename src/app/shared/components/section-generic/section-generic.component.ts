import { Component, Input } from '@angular/core';
import { TrackModel } from '@shared/Models/Tracks';
import { CardPlayerMode } from '@shared/enums';

@Component({
    selector: 'shared-section-generic',
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
