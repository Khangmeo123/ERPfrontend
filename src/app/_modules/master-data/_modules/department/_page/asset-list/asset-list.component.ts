import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
})
export class AssetListComponent implements OnInit {

  modal = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleModal() {
    this.modal = !this.modal;
  }
}
