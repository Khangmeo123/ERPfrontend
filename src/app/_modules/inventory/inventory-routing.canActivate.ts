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
    if (!route.queryParams.legalEntityId) {
      return this.router.navigate(
        [state.url],
        {
          queryParams: {
            ...route.queryParams,
            legalEntityId: JSON.parse(localStorage.getItem('legalEntity')).id || null,
          },
        },
      );
    }
    return true;
  }
}
