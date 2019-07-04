import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleSelectComponent } from './single-select.component';
import {ListboxModule} from 'primeng/listbox';
import {TreeModule} from 'primeng/tree';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClickOutsideModule} from 'ng-click-outside';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material';
import {BsDropdownModule} from 'ngx-bootstrap';

describe('MultiSelectComponent', () => {
  let component: SingleSelectComponent;
  let fixture: ComponentFixture<SingleSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SingleSelectComponent,
      ],
      imports: [
        CommonModule,
        MatProgressSpinnerModule,
        TreeModule,
        ListboxModule,
        BrowserAnimationsModule,
        ClickOutsideModule,
        MatProgressSpinnerModule,
        BsDropdownModule.forRoot(),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
