import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {TreeNode} from 'primeng/api';
import {sampleTree} from '../sample-data/tree.sample';

type SelectMode = 'single' | 'multiple' | 'checkbox';

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

  @Output() selector = new EventEmitter<TreeNode | TreeNode[]>();

  private isOpened = false;

  private nodes: TreeNode[] = [];

  ngOnInit(): void {
  }

  get animationState() {
    return this.isOpened ? 'open' : 'closed';
  }

  clearSelection() {
    if (this.nodes.length > 0) {
      this.nodes = [];
    }
  }

  get isSingle() {
    return this.mode === 'single';
  }

  get selectedNodes() {
    if (this.isSingle) {
      if (this.nodes.length > 0) {
        return this.nodes[0];
      }
      return null;
    }
    return this.nodes;
  }

  set selectedNodes(data: TreeNode[] | TreeNode) {
    if (this.mode === 'checkbox') {
      this.nodes = Object.values(data).map(node => node);
      return;
    }
    const node = data[0] || data;
    if (this.isSingle) {
      if (this.nodes.length === 1) {
        if (this.nodes[0] === node) {
          this.nodes = [];
          return;
        }
      }
      this.nodes[0] = node;
      return;
    }
    const index = this.nodes.indexOf(node);
    if (index >= 0) {
      this.nodes = [
        ...this.nodes.slice(0, index),
        ...this.nodes.slice(index + 1),
      ];
      return;
    }
    this.nodes = [
      ...this.nodes,
      node,
    ];
  }

  get selectedText() {
    if (this.isSingle) {
      if (this.nodes.length === 1) {
        return this.nodes[0].label;
      }
    }
    return `${this.nodes.length} ${this.selectedLabel}`;
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

  onChange(data) {
    this.selector.emit(data);
  }
}
