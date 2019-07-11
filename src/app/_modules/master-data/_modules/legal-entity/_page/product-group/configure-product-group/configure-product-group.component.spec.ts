import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureProductGroupComponent } from './configure-product-group.component';

describe('ConfigureProductGroupComponent', () => {
  let component: ConfigureProductGroupComponent;
  let fixture: ComponentFixture<ConfigureProductGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureProductGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureProductGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
