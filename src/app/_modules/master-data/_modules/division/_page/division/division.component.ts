import { Component, OnInit } from '@angular/core';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {

  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  
  display = false;
  constructor(protected router: Router) { }
  filters = {
    id: new TextFilter(),
    name: new TextFilter(),
    address: new TextFilter(),
    tax_code: new TextFilter(),
    phone: new TextFilter(),
    status: new TextFilter()
  }

  ngOnInit() {
  }
  

  showChange(){
    this.display = !this.display;
  }
}
