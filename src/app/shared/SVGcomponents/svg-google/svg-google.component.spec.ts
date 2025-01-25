import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgGoogleComponent } from './svg-google.component';

describe('SvgGoogleComponent', () => {
  let component: SvgGoogleComponent;
  let fixture: ComponentFixture<SvgGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvgGoogleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SvgGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
