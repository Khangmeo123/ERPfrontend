import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureCompanyPositionComponent } from './configure-company-position.component';

describe('ConfigureCompanyPositionComponent', () => {
  let component: ConfigureCompanyPositionComponent;
  let fixture: ComponentFixture<ConfigureCompanyPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureCompanyPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureCompanyPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
