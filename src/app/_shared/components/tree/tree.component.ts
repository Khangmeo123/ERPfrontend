import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {TreeNode} from 'primeng/api';
import {sampleTree} from '../sample-data/tree.sample';

type SelectMode = 'single' | 'multiple' | 'checkbox';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: [
    './tree.component.scss'
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
export class TreeComponent implements OnInit {
  @Input() options: TreeNode[] = sampleTree;

  @Input() mode: SelectMode = 'single';

  @Input() selectedLabel = 'mục đã chọn';

  private isOpened = false;

  private selectedNodes: TreeNode[] = [];

  ngOnInit(): void {
  }

  get menuState() {
    return this.isOpened ? 'open' : 'closed';
  }

  clearSelection() {
    this.selectedNodes = [];
  }

  get selectInfo() {
    if (this.mode === 'single') {
      if (this.selectedNodes.length === 1) {
        return this.selectedNodes[0].label;
      }
    }
    return `${this.selectedNodes.length} ${this.selectedLabel}`;
  }

  openList() {
    this.isOpened = true;
  }

  closeList() {
    this.isOpened = false;
  }

  get nodes() {
    if (this.mode === 'single') {
      if (this.selectedNodes.length > 0) {
        return this.selectedNodes[0];
      }
      return null;
    }
    return this.selectedNodes;
  }

  set nodes(data: TreeNode[] | TreeNode) {
    const node = data[0] || data;
    if (this.mode === 'single') {
      this.selectedNodes[0] = node;
    } else {
      if (!this.selectedNodes.includes(node)) {
        this.selectedNodes = [
          ...this.selectedNodes,
          node,
        ];
      }
    }
  }

  select({node}) {
    console.log('From select');
    console.log(node);
  }

  unselect({node}) {
    console.log('From unselect');
    console.log(node);
  }
}
