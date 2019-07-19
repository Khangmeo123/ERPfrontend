import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingPeriod } from './accounting-period';

describe('AccountingPeriod', () => {
  let component: AccountingPeriod;
  let fixture: ComponentFixture<AccountingPeriod>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingPeriod ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingPeriod);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
