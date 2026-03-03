import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardPlayerMode } from '@shared/enums';
import { HomeSectionsService } from '@modules/tracks/services/home-sections.service';
import { HomeSection, HOME_SECTIONS } from '@modules/tracks/models/home-sections.model';

@Component({
    selector: 'app-tracks-page',
    templateUrl: './tracks-page.component.html',
    styleUrl: './tracks-page.component.scss',
    standalone: false
})
export class TracksPageComponent implements OnInit, OnDestroy {
  public sections: HomeSection[] = HOME_SECTIONS.map((cfg) => ({
    ...cfg,
    tracks: [],
    isLoading: true,
  }));

  public CardPlayerMode = CardPlayerMode;

  private sub?: Subscription;

  constructor(private homeSectionsService: HomeSectionsService) {}

  ngOnInit(): void {
    this.sub = this.homeSectionsService.loadAllSections$().subscribe({
      next: (sections) => {
        this.sections = sections;
      },
      error: (err) => {
        console.error('Error loading home sections', err);
        this.sections = this.sections.map((s) => ({ ...s, isLoading: false }));
      },
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

