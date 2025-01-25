import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgAppleComponent } from './svg-apple.component';

describe('SvgAppleComponent', () => {
  let component: SvgAppleComponent;
  let fixture: ComponentFixture<SvgAppleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgAppleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SvgAppleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
