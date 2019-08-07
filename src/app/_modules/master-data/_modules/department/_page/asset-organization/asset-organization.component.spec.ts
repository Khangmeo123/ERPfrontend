import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetOrganizationComponent } from './asset-organization.component';

describe('AssetComponent', () => {
  let component: AssetOrganizationComponent;
  let fixture: ComponentFixture<AssetOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
