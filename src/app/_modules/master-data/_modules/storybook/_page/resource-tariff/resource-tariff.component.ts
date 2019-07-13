import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-tariff',
  templateUrl: './resource-tariff.component.html',
  styleUrls: ['./resource-tariff.component.scss']
})
export class ResourceTariffComponent implements OnInit {
  visible = false;
  constructor() { }

  ngOnInit() {
  }

  toggleModal() {
    this.visible = !this.visible;
  }
}
