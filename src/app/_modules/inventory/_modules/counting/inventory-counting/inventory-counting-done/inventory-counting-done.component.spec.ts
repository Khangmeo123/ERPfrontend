import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryCountingDoneComponent } from './inventory-counting-done.component';

describe('InventoryCountingDoneComponent', () => {
  let component: InventoryCountingDoneComponent;
  let fixture: ComponentFixture<InventoryCountingDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryCountingDoneComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCountingDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
