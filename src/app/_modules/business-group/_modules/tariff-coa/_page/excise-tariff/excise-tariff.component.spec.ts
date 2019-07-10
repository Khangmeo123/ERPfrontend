import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExciseTariffComponent } from './excise-tariff.component';

describe('ExciseTariffComponent', () => {
  let component: ExciseTariffComponent;
  let fixture: ComponentFixture<ExciseTariffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExciseTariffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExciseTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
