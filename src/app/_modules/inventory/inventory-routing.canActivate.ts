import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryRoutingCanActivate implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const legalEntityId: string = localStorage.getItem('legalEntityId');
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
