import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryPostingComponent } from './inventory-posting.component';

describe('InventoryPostingComponent', () => {
  let component: InventoryPostingComponent;
  let fixture: ComponentFixture<InventoryPostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryPostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
