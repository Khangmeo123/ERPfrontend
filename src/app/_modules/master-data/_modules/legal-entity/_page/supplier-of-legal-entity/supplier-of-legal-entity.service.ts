import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { FormBuilder } from '@angular/forms';
import { SupplierOfLegalEntityRepository } from './supplier-of-legal-entity.repository';
import { ToastrService } from 'ngx-toastr';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { SupplierSearchEntity } from 'src/app/_modules/master-data/_backend/supplier/supplier.searchentity';
import { SupplierEntity } from 'src/app/_modules/master-data/_backend/supplier/supplier.entity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Entities } from 'src/app/_helpers/entity';
import { resolve } from 'path';
import { environment } from 'src/environments/environment';

export class SupplierOfLegalEntityService {
    public legalEntityList: BehaviorSubject<LegalEntity[]>;
    public legalEntityCount: BehaviorSubject<number>;

    public supplierList: BehaviorSubject<SupplierEntity[]>;
    public supplierCount: BehaviorSubject<number>;

    public supplierListOflegalEntity: BehaviorSubject<Entities>;


    constructor(
        private fb: FormBuilder,
        private supplierOflegalEntityRepository: SupplierOfLegalEntityRepository,
        private toastrService: ToastrService) {
        this.legalEntityCount = new BehaviorSubject(0);
        this.legalEntityList = new BehaviorSubject([]);

        this.supplierCount = new BehaviorSubject(0);
        this.supplierList = new BehaviorSubject([]);

        this.supplierListOflegalEntity = new BehaviorSubject(new Entities());

    }

    getListLegal(legalSearchEntity: LegalSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            forkJoin(this.supplierOflegalEntityRepository.getListLegal(legalSearchEntity),
                this.supplierOflegalEntityRepository.countlegal(legalSearchEntity)).subscribe(([list, count]) => {
                    if (list) {
                        this.legalEntityList.next(list);
                    }
                    if (count) {
                        this.legalEntityCount.next(count);
                    }
                    resolve(true);
                }, err => {
                    reject(false);
                });
        });
        return defered;
    }


    getListSupplier(supplierSearchEntity: SupplierSearchEntity) {
        forkJoin(this.supplierOflegalEntityRepository.getListSupplier(supplierSearchEntity),
            this.supplierOflegalEntityRepository.countSupplier(supplierSearchEntity)).subscribe(([list, count]) => {
                if (list) {
                    this.supplierList.next(list);
                }
                if (count) {
                    this.supplierCount.next(count);
                }
            });
    }


    getListSupplierOflegalEntity(supplierSearchEntity: SupplierSearchEntity) {
        this.supplierOflegalEntityRepository.getListSupplierDrop(supplierSearchEntity).subscribe(res => {
            if (res) {
                this.supplierListOflegalEntity.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getListSupplierOfLegalEntityByTyping(supplierSearchEntity: Observable<SupplierSearchEntity>) {
        supplierSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.supplierOflegalEntityRepository.getListSupplierDrop(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.supplierListOflegalEntity.next(res);
                }
            });
    }

    save(supplierSearchEntity: SupplierSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            if (supplierSearchEntity.id === null || supplierSearchEntity.id === undefined 
                || supplierSearchEntity.id === environment.emtyGuid) {
                this.supplierOflegalEntityRepository.addSupplier(supplierSearchEntity).subscribe(res => {
                    if (res) {
                        this.getListSupplier(supplierSearchEntity);
                        this.toastrService.success('Cập nhật thành công !');
                        resolve(false);
                    }
                }, err => {
                    if (err) {
                        reject(true);
                    }
                });
            }
        });
        return defered;
    }

    delete(supplierSearchEntity: SupplierSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
          this.supplierOflegalEntityRepository.deleteSupplier(supplierSearchEntity).subscribe(res => {
            if (res) {
              this.getListSupplier(supplierSearchEntity);
              this.toastrService.success('Cập nhật thành công !');
              resolve(false);
            }
          }, err => {
            if (err) {
              reject(true);
            }
          });
        });
        return defered;
      }
}
