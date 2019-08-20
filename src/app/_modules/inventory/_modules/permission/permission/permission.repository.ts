import {Repository} from '../../../../../_repositories/repository';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {LegalSearchEntity} from '../../../_backend/legal-entity/legal.search-entity';
import {Observable} from 'rxjs';
import {Entities, EnumEntity} from '../../../../../_helpers/entity';
import {map} from 'rxjs/operators';
import {LegalEntity} from '../../../_backend/legal-entity/legal.entity';
import {InventoryOrganizationSearchEntity} from '../../../_backend/inventory-organization/inventory-organization.search-entity';
import {InventoryOrganizationEntity} from '../../../_backend/inventory-organization/inventory-organization.entity';
import {PermissionEntity, PermissionSearchEntity} from '../permission.entities';
import {PositionSearchEntity} from '../../../_backend/position/position.search-entity';
import {PositionEntity} from '../../../_backend/position/position.entity';

@Injectable({
  providedIn: 'root',
})
export class PermissionRepository extends Repository {
  apiUrl = `${environment.apiUrlInv}inventory/permission/permission-list`;

  constructor(http: HttpClient) {
    super(http);
  }

  getUrl(url: string) {
    return `${this.apiUrl}/${url}`;
  }

  getList(permissionSearchEntity: PermissionSearchEntity): Observable<PermissionEntity[]> {
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
  }

  count(permissionSearchEntity: PermissionSearchEntity): Observable<number> {
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
  }

  getLegalEntityList(legalSearchEntity: LegalSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      this.getUrl('drop-list-legal-entity'),
      legalSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<Entities>) => {
            const entities: Entities = new Entities();
            entities.ids = response.body.ids.map((item) => new LegalEntity(item));
            entities.exceptIds = response.body.exceptIds.map((item) => new LegalEntity(item));
            return entities;
          },
        ),
      );
  }

  getInventoryDocumentTypes(): Observable<EnumEntity[]> {
    return this.http.post<EnumEntity[]>(
      this.getUrl('enum-list-inventory-document-type'),
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
  }

  getDocumentStatus(id: string): Observable<EnumEntity[]> {
    return this.http.post<EnumEntity[]>(
      this.getUrl('enum-list-document-status'),
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

  getInventoryOrganizationList(inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      this.getUrl('drop-list-inventory-organization'),
      inventoryOrganizationSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<Entities>) => {
            const entities: Entities = new Entities();
            entities.ids = response.body.ids.map((item) => new InventoryOrganizationEntity(item));
            entities.exceptIds = response.body.exceptIds.map((item) => new InventoryOrganizationEntity(item));
            return entities;
          },
        ),
      );
  }
}
