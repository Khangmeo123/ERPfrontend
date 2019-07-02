import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {TreeNode} from 'primeng/api';
import {sampleTree} from '../sample-data/tree.sample';

type SelectMode = 'single' | 'multiple';

@Component({
  selector: 'app-tree',
  templateUrl: './tree-select.component.html',
  styleUrls: [
    './tree-select.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('toggleMenu', [
      state('open', style({
        opacity: '1', visibility: 'visible'
      })),
      state('closed', style({
        opacity: '0', visibility: 'hidden'
      })),
      transition('open => closed', [group([
          animate('400ms ease-in-out', style({
            opacity: '0'
          })),
          animate('600ms ease-in-out', style({
            'max-height': '0px'
          })),
          animate('700ms ease-in-out', style({
            visibility: 'hidden'
          }))
        ]
      )]),
      transition('closed => open', [group([
          animate('1ms ease-in-out', style({
            visibility: 'visible'
          })),
          animate('600ms ease-in-out', style({
            'max-height': '500px'
          })),
          animate('800ms ease-in-out', style({
            opacity: '1'
          }))
        ]
      )])
    ]),
  ]
})
export class TreeSelectComponent implements OnInit {
  @Input() options: TreeNode[] = sampleTree;

  @Input() mode: SelectMode = 'single';

  @Input() selectedLabel = 'mục đã chọn';

  @Input() formControlName: string = null;

  @Output() selector = new EventEmitter<TreeNode | TreeNode[]>();

  private isOpened = false;

  private selected: TreeNode[] = [];

  ngOnInit(): void { }

  get animationState() {
    return this.isOpened ? 'open' : 'closed';
  }

  clearSelection() {
    this.selected = [];
  }

  get isSingle() {
    return this.mode === 'single';
  }

  get selectedText() {
    if (this.isSingle) {
      if (this.selected.length === 1) {
        return this.selected[0].label;
      }
    }
    return `${this.selected.length} ${this.selectedLabel}`;
  }

  openList() {
    if (!this.isOpened) {
      this.isOpened = true;
    }
  }

  closeList() {
    if (this.isOpened) {
      this.isOpened = false;
    }
  }

  get selectedNodes() {
    if (this.isSingle) {
      if (this.selected.length > 0) {
        return this.selected[0];
      }
      return null;
    }
    return this.selected;
  }

  set selectedNodes(data: TreeNode[] | TreeNode) {
    const node: TreeNode = data[0] || data;
    if (this.isSingle) {
      if (this.selected.length > 0) {
        if (this.selected[0] === node) {
          this.selected = [];
        } else {
          this.selected[0] = node;
        }
      } else {
        this.selected[0] = node;
      }
    } else if (this.mode === 'multiple')  {
      const index = this.selected.indexOf(node);
      if (index >= 0) {
        this.selected = [
          ...this.selected.slice(0, index),
          ...this.selected.slice(index + 1),
        ];
      } else {
        this.selected = [
          ...this.selected,
          node,
        ];
      }
    }
  }
}
