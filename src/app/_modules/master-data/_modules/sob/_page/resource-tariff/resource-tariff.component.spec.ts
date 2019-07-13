import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTariffComponent } from './resource-tariff.component';

describe('ResourceTariffComponent', () => {
  let component: ResourceTariffComponent;
  let fixture: ComponentFixture<ResourceTariffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceTariffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
