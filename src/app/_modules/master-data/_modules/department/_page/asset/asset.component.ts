import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
})
export class AssetComponent implements OnInit {
  editAsset = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleAssetModal() {
    this.editAsset = !this.editAsset;
  }
}
