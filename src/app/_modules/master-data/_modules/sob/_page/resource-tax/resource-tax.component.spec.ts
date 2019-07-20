import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTaxComponent } from './resource-tax.component';

describe('ResourceTaxComponent', () => {
  let component: ResourceTaxComponent;
  let fixture: ComponentFixture<ResourceTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
