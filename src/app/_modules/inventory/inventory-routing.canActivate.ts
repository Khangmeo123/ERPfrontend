import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../../_services';

@Injectable({
  providedIn: 'root',
})
export class InventoryRoutingCanActivate implements CanActivate {
  constructor(private router: Router, private appService: AppService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const legalEntityId: string = JSON.parse(localStorage.getItem('legalEntity')).id || null;
    if (!route.queryParams.legalEntityId) {
      return this.router.navigate(
        [state.url],
        {
          queryParams: {
            ...route.queryParams,
            legalEntityId,
          },
        },
      );
    }
    return true;
  }
}
