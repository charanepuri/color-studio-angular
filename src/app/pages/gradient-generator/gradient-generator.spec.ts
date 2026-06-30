import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientGenerator } from './gradient-generator';

describe('GradientGenerator', () => {
  let component: GradientGenerator;
  let fixture: ComponentFixture<GradientGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradientGenerator],
    }).compileComponents();

    fixture = TestBed.createComponent(GradientGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
