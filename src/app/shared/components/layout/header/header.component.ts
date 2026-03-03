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
import { NavigationStart, Router } from '@angular/router';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { SearchService } from '@modules/search/services/search.service';
import { TrackModel } from '@shared/Models/Tracks';
import { MultimediaService } from '@shared/services/multimedia.service';

interface AccountDropDown {
  label: string;
  route: string;
  command: () => void;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: false,
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  // ── Auth / dropdown ──────────────────────────────────────────────────────
  searchResponse: any[] = [];
  isAuth: boolean = false;
  isOpenDropdown: boolean = false;
  acountdropDown: AccountDropDown[] = [
    { label: 'Cuenta',        route: '/account', command: () => this.router.navigate(['/numbers']) },
    { label: 'Perfil',        route: '/profile', command: () => this.router.navigate(['/profile']) },
    { label: 'Sube a Premium',route: '/premium', command: () => this.router.navigate(['/premium']) },
    { label: 'Asistencia',    route: '/support', command: () => this.router.navigate(['/support']) },
    { label: 'Descargar',     route: '/download',command: () => this.router.navigate(['/download']) },
    { label: 'Configuración', route: '/settings',command: () => this.router.navigate(['/settings']) },
    { label: 'Cerrar sesión', route: '/logout',  command: () => this.logOut() },
  ];

  // ── Search ────────────────────────────────────────────────────────────────
  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('accountButton') accountButton!: ElementRef;

  public suggestions: TrackModel[] = [];
  public isSearching: boolean = false;
  public showSuggestions: boolean = false;

  private searchTerm$ = new Subject<string>();
  private subs: Subscription[] = [];

  // ── Close suggestions on outside click or Escape ─────────────────────────
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
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
    private elRef: ElementRef,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.isAuth$.subscribe((isAuth) => (this.isAuth = isAuth));

    // Close dropdown on every navigation (home icon, sidebar links, etc.)
    const nav$ = this.router.events
      .pipe(filter((e) => e instanceof NavigationStart))
      .subscribe(() => this.closeSuggestions());

    this.subs.push(nav$);

    // Debounced live search
    const search$ = this.searchTerm$.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      filter((term) => term.trim().length >= 2),
      switchMap((term) => {
        this.isSearching = true;
        return this.searchService.search$(term, 6);
      }),
    ).subscribe({
      next: (tracks) => {
        this.suggestions = tracks;
        this.showSuggestions = true;
        this.isSearching = false;
      },
      error: () => { this.isSearching = false; },
    });

    this.subs.push(search$);
  }

  ngAfterViewInit(): void {
    if (this.accountButton) {
      const focus$ = fromEvent(this.accountButton.nativeElement, 'focus');
      const blur$  = fromEvent(this.accountButton.nativeElement, 'blur');
      focus$.subscribe(() => (this.isOpenDropdown = true));
      blur$.subscribe(()  => (this.isOpenDropdown = false));
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  // ── Search handlers ───────────────────────────────────────────────────────

  onInputChange(value: string): void {
    if (value.trim().length < 2) {
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
