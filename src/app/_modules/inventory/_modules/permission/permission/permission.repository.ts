import {Repository} from '../../../../../_helpers/repository';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {LegalSearchEntity} from '../../../_backend/legal-entity/legal.search-entity';
import {Observable} from 'rxjs';
import {Entities} from '../../../../../_helpers/entity';
import {map} from 'rxjs/operators';
import {LegalEntity} from '../../../_backend/legal-entity/legal.entity';
import {DocumentSearchEntity} from '../../../_backend/document/document.search-entity';
import {DocumentEntity} from '../../../_backend/document/document.entity';
import {InventoryOrganizationSearchEntity} from '../../../_backend/inventory-organization/inventory-organization.search-entity';
import {InventoryOrganizationEntity} from '../../../_backend/inventory-organization/inventory-organization.entity';
import {PermissionEntity, PermissionSearchEntity} from '../permission.entities';

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

  getDocumentList(documentSearchEntity: DocumentSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      this.getUrl('drop-list-legal-entity'),
      documentSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<Entities>) => {
            const entities: Entities = new Entities();
            entities.ids = response.body.ids.map((item) => new DocumentEntity(item));
            entities.exceptIds = response.body.exceptIds.map((item) => new DocumentEntity(item));
            return entities;
          },
        ),
      );
  }

  getInventoryOrganizationList(inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      this.getUrl('drop-list-legal-entity'),
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
