import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerService } from '../../../_services';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isSpinning: Subject<boolean> = this.spinnerService.isLoading;
  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
  }

}
