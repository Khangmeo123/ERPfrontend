import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SobComponent } from './sob.component';

describe('SobComponent', () => {
  let component: SobComponent;
  let fixture: ComponentFixture<SobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SobComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
