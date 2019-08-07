import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset',
  templateUrl: './asset-organization.component.html',
  styleUrls: ['./asset-organization.component.scss'],
})
export class AssetOrganizationComponent implements OnInit {
  editAsset = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleAssetModal() {
    this.editAsset = !this.editAsset;
  }
}
