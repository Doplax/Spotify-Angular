import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPlayerComponentComponent } from './media-player-component.component';

describe('MediaPlayerComponentComponent', () => {
  let component: MediaPlayerComponentComponent;
  let fixture: ComponentFixture<MediaPlayerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaPlayerComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaPlayerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
