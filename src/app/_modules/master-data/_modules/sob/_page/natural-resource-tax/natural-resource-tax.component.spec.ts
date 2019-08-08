import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturalResourceTaxComponent } from './natural-resource-tax.component';

describe('ResourceTaxComponent', () => {
  let component: NaturalResourceTaxComponent;
  let fixture: ComponentFixture<NaturalResourceTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NaturalResourceTaxComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaturalResourceTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
