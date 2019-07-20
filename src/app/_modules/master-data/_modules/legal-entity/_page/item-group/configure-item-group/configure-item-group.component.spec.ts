import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureItemGroupComponent } from './configure-item-group.component';

describe('ConfigureItemGroupComponent', () => {
  let component: ConfigureItemGroupComponent;
  let fixture: ComponentFixture<ConfigureItemGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigureItemGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureItemGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
