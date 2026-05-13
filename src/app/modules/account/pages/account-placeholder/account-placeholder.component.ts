import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface PageData {
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
}

@Component({
  selector: 'app-account-placeholder',
  templateUrl: './account-placeholder.component.html',
  styleUrl: './account-placeholder.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPlaceholderComponent {
  readonly pageData$: Observable<PageData>;

  constructor(private route: ActivatedRoute) {
    this.pageData$ = this.route.data.pipe(
      map((data: Data) => ({
        title: (data['title'] as string) ?? '',
        subtitle: (data['subtitle'] as string) ?? '',
        icon: (data['icon'] as string) ?? 'info',
        gradient: (data['gradient'] as string) ?? '#1f3a8a, #0f172a',
      }))
    );
  }
}
