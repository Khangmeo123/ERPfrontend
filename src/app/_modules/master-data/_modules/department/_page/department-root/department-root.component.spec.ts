import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentRootComponent } from './department-root.component';

describe('DepartmentRootComponent', () => {
  let component: DepartmentRootComponent;
  let fixture: ComponentFixture<DepartmentRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
