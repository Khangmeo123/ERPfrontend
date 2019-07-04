import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeSelectComponent } from './tree-select.component';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material';
import {TreeModule} from 'primeng/tree';
import {ListboxModule} from 'primeng/listbox';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClickOutsideModule} from 'ng-click-outside';
import {BsDropdownModule} from 'ngx-bootstrap';

describe('TreeSelectComponent', () => {
  let component: TreeSelectComponent;
  let fixture: ComponentFixture<TreeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TreeSelectComponent,
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
    fixture = TestBed.createComponent(TreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
