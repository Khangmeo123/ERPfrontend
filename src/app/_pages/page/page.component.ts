import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../_services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageComponent implements OnInit, OnDestroy {

  public isPinned: boolean = false;

  public isToggled: boolean = false;

  public subscription: Subscription = new Subscription();

  constructor(public appService: AppService) {
    const pinnedSubscription: Subscription = this.appService.isPinned.subscribe((isPinned: boolean) => {
      this.isPinned = isPinned;
    });
    const toggledSubscription: Subscription = this.appService.isToggled.subscribe((isToggled: boolean) => {
      this.isToggled = isToggled;
    });
    this.subscription
      .add(toggledSubscription)
      .add(pinnedSubscription);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
