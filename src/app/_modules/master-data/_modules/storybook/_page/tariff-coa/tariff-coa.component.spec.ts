import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffCoaComponent } from './tariff-coa.component';

describe('TariffCoaComponent', () => {
  let component: TariffCoaComponent;
  let fixture: ComponentFixture<TariffCoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TariffCoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TariffCoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
