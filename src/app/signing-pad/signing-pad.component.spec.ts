import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SigningPadComponent} from './signing-pad.component';

describe('SigningPadComponent', () => {
  let component: SigningPadComponent;
  let fixture: ComponentFixture<SigningPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigningPadComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SigningPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
