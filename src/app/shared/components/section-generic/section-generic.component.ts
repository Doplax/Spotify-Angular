import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
    selector: 'app-section-generic',
    templateUrl: './section-generic.component.html',
    styleUrl: './section-generic.component.scss',
    standalone: false
})
export class SectionGenericComponent {
  @Input() title: string = ''
  @Input() mode: 'small' | 'big' = 'small' // Será small por defecto
  @Input() dataTracks: Array<TrackModel> = []
}
