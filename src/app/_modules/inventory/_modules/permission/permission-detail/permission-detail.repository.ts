import { Repository } from '../../../../../_repositories/repository';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PositionSearchEntity } from '../../../_backend/position/position.search-entity';
import { Observable } from 'rxjs';
import { EnumEntity } from '../../../../../_helpers/entity';
import { map } from 'rxjs/operators';
import { PositionEntity } from '../../../_backend/position/position.entity';
import { environment } from '../../../../../../environments/environment';
import { PermissionEntity } from '../permission.entities';

@Injectable({
  providedIn: 'root',
})
export class PermissionDetailRepository extends Repository {
  apiUrl = `${environment.apiUrlInv}inventory/permission/permission-detail`;

  constructor(http: HttpClient) {
    super(http);
  }

  getUrl = (url: string) => `${this.apiUrl}/${url}`;

  getPositionList = (positionSearchEntity: PositionSearchEntity): Observable<PositionEntity[]> => {
    return this.http.post<PositionEntity[]>(
      this.getUrl('single-list-position'),
      positionSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<PositionEntity[]>) => response.body,
        ),
      );
  };

  getDocumentStatus = (inventoryDocumentTypeId: string): Observable<EnumEntity[]> => {
    return this.http.post<EnumEntity[]>(
      this.getUrl('single-list-document-status'),
      {
        id: inventoryDocumentTypeId,
      },
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

  get = (id: string): Observable<PermissionEntity> => {
    return this.http.post<PermissionEntity>(
      this.getUrl('get'),
      {
        id,
      },
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<PermissionEntity>) => response.body,
        ),
      );
  };

  update = (permissionEntity: PermissionEntity): Observable<PermissionEntity> => {
    return this.http.post<PermissionEntity>(
      this.getUrl('update'),
      permissionEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<PermissionEntity>) => response.body,
        ),
      );
  };

  create = (permissionEntity: PermissionEntity): Observable<PermissionEntity> => {
    return this.http.post<PermissionEntity>(
      this.getUrl('create'),
      permissionEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<PermissionEntity>) => response.body,
        ),
      );
  };

  delete = (permissionEntity: PermissionEntity): Observable<PermissionEntity> => {
    return this.http.post<PermissionEntity>(
      this.getUrl('delete'),
      permissionEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<PermissionEntity>) => response.body,
        ),
      );
  };
}
