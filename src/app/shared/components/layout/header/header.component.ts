import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { Event as RouterEvent, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { SearchService } from '@modules/search/services/search.service';
import { TrackModel } from '@shared/Models/Tracks';
import { MultimediaService } from '@shared/services/multimedia.service';

interface AccountDropDown {
  label: string;
  icon: string;
  route: string;
  command: () => void;
}

const SEARCH_DEBOUNCE_MS = 350;
const MIN_SEARCH_LENGTH = 2;
const SEARCH_RESULTS_LIMIT = 6;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: false,
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  // ── Auth / dropdown ──────────────────────────────────────────────────────
  searchResponse: TrackModel[] = [];
  isAuth: boolean = false;
  isOpenDropdown: boolean = false;
  acountdropDown: AccountDropDown[] = [
    { label: 'Cuenta',         icon: 'account_circle',     route: '/account',          command: () => this.router.navigate(['/account']) },
    { label: 'Perfil',         icon: 'person',             route: '/account/profile',  command: () => this.router.navigate(['/account/profile']) },
    { label: 'Sube a Premium', icon: 'workspace_premium',  route: '/account/premium',  command: () => this.router.navigate(['/account/premium']) },
    { label: 'Asistencia',     icon: 'help_outline',       route: '/account/support',  command: () => this.router.navigate(['/account/support']) },
    { label: 'Descargar',      icon: 'download',           route: '/account/download', command: () => this.router.navigate(['/account/download']) },
    { label: 'Configuración',  icon: 'settings',           route: '/account/settings', command: () => this.router.navigate(['/account/settings']) },
    { label: 'Cerrar sesión',  icon: 'logout',             route: '/logout',           command: () => this.logOut() },
  ];

  // ── Search ────────────────────────────────────────────────────────────────
  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('accountButton') accountButton!: ElementRef<HTMLElement>;

  public suggestions: TrackModel[] = [];
  public isSearching: boolean = false;
  public showSuggestions: boolean = false;

  // ── Active nav state ──────────────────────────────────────────────────────
  public isHomeActive: boolean = false;
  public isExploreActive: boolean = false;

  private searchTerm$ = new Subject<string>();
  private subs: Subscription[] = [];

  // ── Close suggestions on outside click or Escape ─────────────────────────
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node | null;
    if (target && !this.elRef.nativeElement.contains(target)) {
      this.closeSuggestions();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeSuggestions();
    this.searchInputRef?.nativeElement.blur();
  }

  constructor(
    private authService: AuthService,
    private searchService: SearchService,
    private multimediaService: MultimediaService,
    private elRef: ElementRef<HTMLElement>,
    public router: Router,
  ) {}

  ngOnInit(): void {
    const auth$ = this.authService.isAuth$.subscribe((isAuth: boolean) => (this.isAuth = isAuth));
    this.subs.push(auth$);

    // Set initial active state on load
    this.updateActiveState(this.router.url);

    // Track active nav icons on every navigation end
    const navEnd$ = this.router.events
      .pipe(filter((e: RouterEvent): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.updateActiveState(e.urlAfterRedirects));
    this.subs.push(navEnd$);

    // Close suggestions dropdown on navigation start
    const navStart$ = this.router.events
      .pipe(filter((e: RouterEvent): e is NavigationStart => e instanceof NavigationStart))
      .subscribe(() => this.closeSuggestions());
    this.subs.push(navStart$);

    // Debounced live search
    const search$ = this.searchTerm$
      .pipe(
        debounceTime(SEARCH_DEBOUNCE_MS),
        distinctUntilChanged(),
        filter((term: string) => term.trim().length >= MIN_SEARCH_LENGTH),
        switchMap((term: string): Observable<TrackModel[]> => {
          this.isSearching = true;
          return this.searchService.search$(term, SEARCH_RESULTS_LIMIT);
        })
      )
      .subscribe({
        next: (tracks: TrackModel[]) => {
          this.suggestions = tracks;
          this.showSuggestions = true;
          this.isSearching = false;
        },
        error: () => {
          this.isSearching = false;
        },
      });

    this.subs.push(search$);
  }

  ngAfterViewInit(): void {
    if (this.accountButton) {
      const button = this.accountButton.nativeElement;
      const focusSub = fromEvent<FocusEvent>(button, 'focus')
        .subscribe(() => (this.isOpenDropdown = true));
      const blurSub = fromEvent<FocusEvent>(button, 'blur')
        .subscribe(() => (this.isOpenDropdown = false));
      this.subs.push(focusSub, blurSub);
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s: Subscription) => s.unsubscribe());
  }

  // ── Search handlers ───────────────────────────────────────────────────────

  onInputChange(value: string): void {
    if (value.trim().length < MIN_SEARCH_LENGTH) {
      this.suggestions = [];
      this.showSuggestions = false;
    }
    this.searchTerm$.next(value);
  }

  goToSearchPage(term: string): void {
    if (!term.trim()) return;
    this.closeSuggestions();
    this.router.navigate(['/search'], { queryParams: { term: term.trim() } });
  }

  playSuggestion(track: TrackModel): void {
    this.multimediaService.trackInfo$.next(track);
    this.closeSuggestions();
  }

  closeSuggestions(): void {
    this.showSuggestions = false;
  }

  private updateActiveState(url: string): void {
    this.isHomeActive  = url.startsWith('/tracks') || url === '/';
    this.isExploreActive = url.startsWith('/explore');
  }

  // ── Auth helpers ──────────────────────────────────────────────────────────

  checkIsAuth(): boolean {
    return this.authService.checkIsAuth();
  }

  toggleDropdown(): void {
    this.isOpenDropdown = !this.isOpenDropdown;
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
