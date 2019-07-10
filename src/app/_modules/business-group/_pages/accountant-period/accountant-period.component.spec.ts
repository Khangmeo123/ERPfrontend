import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantPeriodComponent } from './accountant-period.component';

describe('AccountantPeriodComponent', () => {
  let component: AccountantPeriodComponent;
  let fixture: ComponentFixture<AccountantPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountantPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountantPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
