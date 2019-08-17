import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../_services';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LegalEntity } from '../master-data/_backend/legal/legal.entity';

@Component({
  selector: 'app-invetory',
  templateUrl: './invetory.component.html',
  styleUrls: ['./invetory.component.scss'],
})
export class InventoryComponent implements OnInit, OnDestroy {
  queryParams: Params = null;

  url;

  legalEntity: LegalEntity = null;

  subscription: Subscription = new Subscription();

  constructor(private appService: AppService, private activatedRoute: ActivatedRoute, private router: Router) {
    const routeSub: Subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      // if (!params.legalEntityId) {
      //   this.router.navigateByUrl('', {
      //     queryParams: {
      //       legalEntity: this.legalEntity.id || null,
      //     },
      //   });
      // }
    });

    const legalEntitySub: Subscription = this.appService.legalEntity.subscribe((legalEntity: LegalEntity) => {
      this.legalEntity = legalEntity;
    });

    this.subscription
      .add(routeSub)
      .add(legalEntitySub);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
