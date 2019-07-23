import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { CurrencySearchEntity } from '../../../../_backend/currency/currency.searchentity';
import { CurrencyEntity } from '../../../../_backend/currency/currency.entity';
import { Entities } from '../../../../../../_helpers/entity';
import { CoaEntity } from '../../../../_backend/coa/coa.entity';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { ImportTaxEntity } from '../../../../_backend/import-tax/import-tax.entity';
import { ImportTaxSearchEntity } from '../../../../_backend/import-tax/import-tax.searchEntity';
import { ExportTaxSearchEntity } from '../../../../_backend/export-tax/export-tax.searchEntity';
import { ExportTaxEntity } from '../../../../_backend/export-tax/export-tax.entity';
import { ValueAddedTaxEntity } from '../../../../_backend/value-added-tax/value-added-tax.entity';
import { ValueAddedTaxSearchEntity } from '../../../../_backend/value-added-tax/value-added-tax.search-entity';
import { EnvironmentTaxSearchEntity } from '../../../../_backend/environment-tax/environment-tax.searchEntity';
import { EnvironmentTaxEntity } from '../../../../_backend/environment-tax/environment-tax.entity';
import { NaturalResourceTaxSearchentity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.searchentity';
import { NaturalResourceTaxEntity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.entity';
import { SpecialConsumptionTaxSearchentity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.searchentity';
import { SpecialConsumptionTaxEntity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.entity';

@Injectable({
  providedIn: 'root',
})
export class SobRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/set-of-book';
  }

  getList(sobSearchEntity: SobSearchEntity): Observable<SobEntity[]> {
    return this.http.post<SobEntity[]>(this.apiUrl + '/list', JSON.stringify(sobSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new SobEntity(item);
        });
      }),
    );
  }

  getCurrencyList(currencySearchEntity: CurrencySearchEntity): Observable<Entities> {
    return this.http.post<Entities>(this.apiUrl + '/list-currency', JSON.stringify(currencySearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(({body: {ids, exceptIds}}) => {
        return {
          ids: ids.map((item) => new CurrencyEntity(item)),
          exceptIds: exceptIds.map((item) => new CurrencyEntity(item)),
        };
      }),
    );
  }

  getCoaList(coaSearchEntity: CoaSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(this.apiUrl + '/list-coa-template', JSON.stringify(coaSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(({body: {ids, exceptIds}}) => {
        return {
          ids: ids.map((item) => new CoaEntity(item)),
          exceptIds: exceptIds.map((item) => new CoaEntity(item)),
        };
      }),
    );
  }

  getImportTaxTemplates(importTaxSearchEntity: ImportTaxSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(this.apiUrl + '/list-import-tax-template', JSON.stringify(importTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(({body: {ids, exceptIds}}) => {
        return {
          ids: ids.map((item) => new ImportTaxEntity(item)),
          exceptIds: exceptIds.map((item) => new ImportTaxEntity(item)),
        };
      }),
    );
  }

  getExportTaxTemplates(exportTaxSearchEntity: ExportTaxSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(this.apiUrl + '/list-export-tax-template', JSON.stringify(exportTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(({body: {ids, exceptIds}}) => {
        return {
          ids: ids.map((item) => new ExportTaxEntity(item)),
          exceptIds: exceptIds.map((item) => new ExportTaxEntity(item)),
        };
      }),
    );
  }

  getValueAddedTaxTemplates(valueAddedTaxSearchEntity: ValueAddedTaxSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(this.apiUrl + '/list-value-added-tax-template', JSON.stringify(valueAddedTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(({body: {ids, exceptIds}}) => {
        return {
          ids: ids.map((item) => new ValueAddedTaxEntity(item)),
          exceptIds: exceptIds.map((item) => new ValueAddedTaxEntity(item)),
        };
      }),
    );
  }

  count(sobSearchEntity: SobSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(sobSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(sobId: string): Observable<SobEntity> {
    return this.http.post<SobEntity>(this.apiUrl + '/get', JSON.stringify({Id: sobId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new SobEntity(r.body);
      }),
    );
  }

  getEnvironmentTaxTemplates(environmentTaxSearchEntity: EnvironmentTaxSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(this.apiUrl + '/list-environment-tax-template', JSON.stringify(environmentTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(({body: {ids, exceptIds}}) => {
        return {
          ids: ids.map((item) => new EnvironmentTaxEntity(item)),
          exceptIds: exceptIds.map((item) => new EnvironmentTaxEntity(item)),
        };
      }),
    );
  }

  getNaturalResourceTaxTemplates(naturalResourceTaxSearchEntity: NaturalResourceTaxSearchentity): Observable<Entities> {
    return this.http.post<Entities>(this.apiUrl + '/list-natural-resource-tax-template', JSON.stringify(naturalResourceTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(({body: {ids, exceptIds}}) => {
        return {
          ids: ids.map((item) => new NaturalResourceTaxEntity(item)),
          exceptIds: exceptIds.map((item) => new NaturalResourceTaxEntity(item)),
        };
      }),
    );
  }

  getSpecialConsumptionTaxTemplates(specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchentity): Observable<Entities> {
    return this.http.post<Entities>(
      this.apiUrl + '/list-special-consumption-tax-template',
      JSON.stringify(specialConsumptionTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(({body: {ids, exceptIds}}) => {
        return {
          ids: ids.map((item) => new SpecialConsumptionTaxEntity(item)),
          exceptIds: exceptIds.map((item) => new SpecialConsumptionTaxEntity(item)),
        };
      }),
    );
  }

  add(sobEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(sobEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(sobEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(sobEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  delete(sobEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(sobEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}
