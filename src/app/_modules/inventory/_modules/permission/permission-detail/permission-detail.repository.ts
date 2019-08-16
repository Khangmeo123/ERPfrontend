import {Repository} from '../../../../../_helpers/repository';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PositionSearchEntity} from '../../../_backend/position/position.search-entity';
import {Observable} from 'rxjs';
import {Entities, EnumEntity} from '../../../../../_helpers/entity';
import {map} from 'rxjs/operators';
import {PositionEntity} from '../../../_backend/position/position.entity';
import {environment} from '../../../../../../environments/environment';
import {PermissionEntity} from '../permission.entities';

@Injectable({
  providedIn: 'root',
})
export class PermissionDetailRepository extends Repository {
  apiUrl = `${environment.apiUrlInv}inventory/permission/permission-detail`;

  constructor(http: HttpClient) {
    super(http);
  }

  getUrl(url: string) {
    return `${this.apiUrl}/${url}`;
  }

  getPositionList(positionSearchEntity: PositionSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      this.getUrl('drop-list-position'),
      positionSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<Entities>) => {
            const entities: Entities = new Entities();
            entities.ids = response.body.ids.map((item) => new PositionEntity(item));
            entities.exceptIds = response.body.exceptIds.map((item) => new PositionEntity(item));
            return entities;
          },
        ),
      );
  }

  getDocumentStatus(inventoryDocumentTypeId: string): Observable<EnumEntity[]> {
    return this.http.post<EnumEntity[]>(
      this.getUrl('enum-list-document-status'),
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
  }

  get(id: string): Observable<PermissionEntity> {
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
  }

  update(permissionEntity: PermissionEntity): Observable<PermissionEntity> {
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
  }

  create(permissionEntity: PermissionEntity): Observable<PermissionEntity> {
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
  }
}
