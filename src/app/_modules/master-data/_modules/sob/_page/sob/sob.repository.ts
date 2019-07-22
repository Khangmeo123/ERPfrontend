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
import { ImportTaxSearchEntity } from '../../../../_backend/import-tax/import-tax.searchEntity';
import { ImportTaxEntity } from '../../../../_backend/import-tax/import-tax.entity';
import { ExportTaxEntity } from '../../../../_backend/export-tax/export-tax.entity';
import { ExportTaxSearchEntity } from '../../../../_backend/export-tax/export-tax.searchEntity';
import { EnvironmentTaxSearchEntity } from '../../../../_backend/environment-tax/environment-tax.searchEntity';
import { EnvironmentTaxEntity } from '../../../../_backend/environment-tax/environment-tax.entity';
import { SpecialConsumptionTaxSearchentity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.searchentity';
import { SpecialConsumptionTaxEntity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.entity';
import { ValueAddedTaxSearchEntity } from '../../../../_backend/value-added-tax/value-added-tax.search-entity';
import { ValueAddedTaxEntity } from '../../../../_backend/value-added-tax/value-added-tax.entity';
import { NaturalResourceTaxEntity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.entity';
import { NaturalResourceTaxSearchentity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.searchentity';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { CoaEntity } from '../../../../_backend/coa/coa.entity';

@Injectable({
  providedIn: 'root',
})
export class SobRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/sob';
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

  getCurrencyList(currencySearchEntity: CurrencySearchEntity): Observable<CurrencyEntity[]> {
    return this.http.post<CurrencyEntity[]>(this.apiUrl + '/listCurrency', JSON.stringify(currencySearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new CurrencyEntity(item);
        });
      }),
    );
  }

  getImportTaxTemplates(importTaxSearchEntity: ImportTaxSearchEntity): Observable<ImportTaxEntity[]> {
    return this.http.post<ImportTaxEntity[]>(this.apiUrl + '/listImportTaxTemplate', JSON.stringify(importTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new ImportTaxEntity(item);
        });
      }),
    );
  }

  getExportTaxTemplates(exportTaxSearchEntity: ExportTaxSearchEntity): Observable<ExportTaxEntity[]> {
    return this.http.post<ExportTaxEntity[]>(this.apiUrl + '/listExportTaxTemplate', JSON.stringify(exportTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new ExportTaxEntity(item);
        });
      }),
    );
  }

  getEnvironmentTaxTemplates(environmentTaxSearchEntity: EnvironmentTaxSearchEntity): Observable<EnvironmentTaxEntity[]> {
    return this.http.post<EnvironmentTaxEntity[]>(this.apiUrl + '/listEnvironmentTaxTemplate', JSON.stringify(environmentTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new EnvironmentTaxEntity(item);
        });
      }),
    );
  }

  getSpecialConsumptionTaxTemplates(
    specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchentity,
  ): Observable<SpecialConsumptionTaxEntity[]> {
    return this.http.post<SpecialConsumptionTaxEntity[]>(
      this.apiUrl + '/listSpecialConsumptionTaxTemplate',
      JSON.stringify(specialConsumptionTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new SpecialConsumptionTaxEntity(item);
        });
      }),
    );
  }

  getValueAddedTaxTemplates(valueAddedTaxSearchEntity: ValueAddedTaxSearchEntity): Observable<ValueAddedTaxEntity[]> {
    return this.http.post<ValueAddedTaxEntity[]>(this.apiUrl + '/listValueAddedTaxTemplate', JSON.stringify(valueAddedTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new ValueAddedTaxEntity(item);
        });
      }),
    );
  }

  getNaturalResourceTaxTemplates(naturalResourceTaxSearchEntity: NaturalResourceTaxSearchentity): Observable<NaturalResourceTaxEntity[]> {
    return this.http.post<NaturalResourceTaxEntity[]>(this.apiUrl + '/listNaturalResourceTaxTemplate', JSON.stringify(naturalResourceTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new NaturalResourceTaxEntity(item);
        });
      }),
    );
  }

  count(sobSearchEntity: SobSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(sobSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getCoaList(coaSearchEntity: CoaSearchEntity): Observable<CoaEntity[]> {
    return this.http.post<CoaEntity[]>(this.apiUrl + '/listCOA', JSON.stringify(coaSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new CoaEntity(item);
        });
      }),
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
