import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTaxComponent } from './import-tax.component';

describe('ImportTaxComponent', () => {
  let component: ImportTaxComponent;
  let fixture: ComponentFixture<ImportTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
