import { Repository } from '../../../../../_repositories/repository';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { EnumEntity } from '../../../../../_helpers/entity';
import { map } from 'rxjs/operators';
import { InventoryOrganizationSearchEntity } from '../../../_backend/inventory-organization/inventory-organization.search-entity';
import { InventoryOrganizationEntity } from '../../../_backend/inventory-organization/inventory-organization.entity';
import { PermissionEntity, PermissionSearchEntity } from '../permission.entities';

@Injectable({
  providedIn: 'root',
})
export class PermissionListRepository extends Repository {

  apiUrl = `${environment.apiUrlInv}inventory/permission/permission-list`;

  constructor(http: HttpClient) {
    super(http);
  }

  getUrl = (url: string) => `${this.apiUrl}/${url}`;

  getList = (permissionSearchEntity: PermissionSearchEntity): Observable<PermissionEntity[]> => {
    return this.http.post<PermissionEntity[]>(
      this.getUrl('list'),
      permissionSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<PermissionEntity[]>) => response.body.map((item) => new PermissionEntity(item)),
        ),
      );
  };

  count = (permissionSearchEntity: PermissionSearchEntity): Observable<number> => {
    return this.http.post<number>(
      this.getUrl('count'),
      permissionSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<number>) => response.body,
        ),
      );
  };

  getInventoryDocumentTypes = (): Observable<EnumEntity[]> => {
    return this.http.post<EnumEntity[]>(
      this.getUrl('single-list-inventory-document-type'),
      {},
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<EnumEntity[]>) => response.body,
        ),
      );
  };

  getDocumentStatus = (id: string): Observable<EnumEntity[]> => {
    return this.http.post<EnumEntity[]>(
      this.getUrl('single-list-document-status'),
      {id},
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<EnumEntity[]>) => response.body,
        ),
      );
  };

  getInventoryOrganizationList = (
    inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity,
  ): Observable<InventoryOrganizationEntity[]> => {
    return this.http.post<InventoryOrganizationEntity[]>(
      this.getUrl('single-list-inventory-organization'),
      inventoryOrganizationSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<InventoryOrganizationEntity[]>) => response.body,
        ),
      );
  };

  getInventoryOrganization = (id: string): Observable<InventoryOrganizationEntity> => {
    return this.http.post<InventoryOrganizationEntity>(
      this.getUrl('get-inventory-organization'),
      {id},
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<InventoryOrganizationEntity>) => response.body,
        ),
      );
  };

  getInventoryDocumentType = (id: string): Observable<EnumEntity> => {
    return this.http.post<EnumEntity>(
      this.getUrl('get-inventory-document-type'),
      {id},
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<EnumEntity>) => response.body,
        ),
      );
  };
}
