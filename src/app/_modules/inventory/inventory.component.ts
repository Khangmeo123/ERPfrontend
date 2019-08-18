import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../_services';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invetory',
  templateUrl: './invetory.component.html',
  styleUrls: ['./invetory.component.scss'],
})
export class InventoryComponent implements OnInit, OnDestroy {
  queryParams: Params = null;

  legalEntityId: string = null;

  subscription: Subscription = new Subscription();

  constructor(private appService: AppService, private activatedRoute: ActivatedRoute, private router: Router) {
    const legalEntitySub: Subscription = this.appService.legalEntityId.subscribe((legalEntityId: string) => {
      this.legalEntityId = legalEntityId;
    });

    this.subscription
      .add(legalEntitySub);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
