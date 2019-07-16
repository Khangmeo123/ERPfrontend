import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportTaxComponent } from './export-tax.component';

describe('ExportTaxComponent', () => {
  let component: ExportTaxComponent;
  let fixture: ComponentFixture<ExportTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
