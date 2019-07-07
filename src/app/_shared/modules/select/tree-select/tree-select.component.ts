import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {ISelect} from '../select.interface';
import {IFlatItem} from '../../../interfaces/IFlatItem';
import {toggleMenu} from '../../../animations/toggleMenu';

@Component({
  selector: 'app-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    toggleMenu,
  ],
})
export class TreeSelectComponent implements OnInit, OnChanges, ISelect {

  private opened = false;

  @Input() dataSource: any[] = [];
  protected treeData: any[] = [];
  @Input() selected: any[] = [];

  ngOnInit() {
  }

  get isOpened() {
    return this.opened;
  }

  set isOpened(data: boolean) {
    if (data !== this.opened) {
      if (data) {
        this.beforeOpenList();
      } else {
        this.beforeCloseList();
      }
      this.opened = data;
    }
  }

  buildTree(flatList: IFlatItem[]) {
    const map = {};
    flatList.forEach((flatItem: IFlatItem) => {
      if (!flatItem.parentId) {
        map[flatItem.id] = flatItem;
      }
      if (!flatItem.children) {
        flatItem.children = [];
      }
    });
    flatList.forEach((flatItem: IFlatItem) => {
      if (flatItem.parentId) {
        map[flatItem.parentId].children = [
          ...map[flatItem.parentId].children,
          flatItem,
        ];
      }
    });
    return Object.values(map);
  }

  beforeCloseList() {
  }

  beforeOpenList() {
  }

  closeList() {
    this.isOpened = false;
  }

  onChange(event) {
  }

  onSelect(event) {
  }

  onUnselect(event) {
  }

  openList() {
    this.isOpened = true;
  }

  toggleList() {
    this.isOpened = !this.isOpened;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.treeData = this.buildTree(this.dataSource);
  }

  get listState() {
    return this.isOpened ? 'opened' : 'closed';
  }
}
