import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { SupplierGroupEntity } from 'src/app/_modules/master-data/_backend/supplier-group/supplier-group.entity';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Entities } from 'src/app/_helpers/entity';
import { ToastrService } from 'ngx-toastr';
import { ListSupplierRepository } from './supplier-group.repository';
import { SupplierGroupForm } from '../../../../_backend/supplier-group/supplier-group.form';
import { SupplierGroupSearchEntity } from 'src/app/_modules/master-data/_backend/supplier-group/supplier-group.searchentity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SupplierSearchEntity } from 'src/app/_modules/master-data/_backend/supplier/supplier.searchentity';
import { SupplierEntity } from 'src/app/_modules/master-data/_backend/supplier/supplier.entity';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { environment } from 'src/environments/environment';

export class SupplierGroupService {
    public supplierGroupList: BehaviorSubject<SupplierGroupEntity[]>;
    public supplierGroupForm: BehaviorSubject<FormGroup>;
    public supplierGroupCount: BehaviorSubject<number>;

    public legalList: BehaviorSubject<Entities>;
    public supplierList: BehaviorSubject<Entities>;
    public supplierDetailList: BehaviorSubject<SupplierEntity[]>;
    public supplierDetailCount: BehaviorSubject<number>;

    constructor(
        private fb: FormBuilder,
        private supplierGroupRepository: ListSupplierRepository,
        private toastrService: ToastrService) {
        this.supplierGroupCount = new BehaviorSubject(0);
        this.supplierGroupList = new BehaviorSubject([]);
        this.supplierGroupForm = new BehaviorSubject(this.fb.group(
            new SupplierGroupForm(),
        ));
        this.legalList = new BehaviorSubject(new Entities());
        this.supplierList = new BehaviorSubject(new Entities());
        this.supplierDetailList = new BehaviorSubject([]);
        this.supplierDetailCount = new BehaviorSubject(0);
    }

    getList(supplierGroupSearchEntity: SupplierGroupSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            forkJoin(this.supplierGroupRepository.getListSupplierGroup(supplierGroupSearchEntity),
            this.supplierGroupRepository.countSupplierGroup(supplierGroupSearchEntity)).subscribe(([list, count]) => {
                if (list) {
                    this.supplierGroupList.next(list);
                }
                if (count) {
                    this.supplierGroupCount.next(count);
                }
                resolve(true);
            }, err => {
                    reject(false);
            });
        });
        return defered;
    }

    add(legalEntityId: any) {
        if (legalEntityId) {
            const supplierGroup = new SupplierGroupEntity();
            supplierGroup.legalEntityId = legalEntityId;
            const form = this.fb.group(
                new SupplierGroupForm(supplierGroup),
            )
            this.supplierGroupForm.next(this.fb.group(
                new SupplierGroupForm(supplierGroup),
            ));
        }
    }


    edit(legalId: string) {
        this.supplierGroupRepository.getId(legalId).subscribe(res => {
            if (res) {
                this.supplierGroupForm.next(this.fb.group(
                    new SupplierGroupForm(res),
                ));
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    save(supllierGroupEntity: any, supplierGroupSearchEntity: SupplierGroupSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
          if (supllierGroupEntity.id === null || supllierGroupEntity.id === undefined || supllierGroupEntity.id === environment.emtyGuid) {
            this.supplierGroupRepository.add(supllierGroupEntity).subscribe(res => {
              if (res) {
                this.getList(supplierGroupSearchEntity);
                this.toastrService.success('Cập nhật thành công !');
                resolve(false);
              }
            }, err => {
              if (err) {
                this.supplierGroupForm.next(this.fb.group(
                  new SupplierGroupForm(err),
                ));
                reject(true);
              }
            });
          } else {
            this.supplierGroupRepository.update(supllierGroupEntity).subscribe(res => {
              if (res) {
                this.getList(supplierGroupSearchEntity);
                this.toastrService.success('Cập nhật thành công !');
                resolve(false);
              }
            }, err => {
              if (err) {
                this.supplierGroupForm.next(this.fb.group(
                  new SupplierGroupForm(err),
                ));
                reject(true);
              }
            });
          }
        });
        return defered;
      }


    saveSupplier(supplierGroupSearchEntity: SupplierSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.supplierGroupRepository.addSupplier(supplierGroupSearchEntity).subscribe(res => {
                if (res) {
                    this.getListSupplierDetail(supplierGroupSearchEntity);
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

    delete(supplierGroupEntity: any, supplierGroupSearchEntity: SupplierGroupSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.supplierGroupRepository.delete(supplierGroupEntity).subscribe(res => {
                if (res) {
                    this.getList(supplierGroupSearchEntity);
                    this.toastrService.success('Cập nhật thành công !');
                    resolve(false);
                }
            }, err => {
                if (err) {
                    this.supplierGroupForm.next(this.fb.group(
                        new SupplierGroupForm(err),
                    ));
                    reject(true);
                }
            });
        });
        return defered;
    }

    deleteSupplier(supplierId: string, supplierGroupId: string): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.supplierGroupRepository.deleteSupplier(supplierId, supplierGroupId).subscribe(res => {
                if (res) {
                    this.toastrService.success('Hệ thống cập nhật thành công!');
                    resolve(res);
                }
            }, err => {
                if (err) {
                    reject(err);
                }
            });
        });
        return defered;
    }


    getListLegalEntity(legalSearchEntity: LegalSearchEntity) {
        this.supplierGroupRepository.getListLegalEntity(legalSearchEntity).subscribe(res => {
            if (res) {
                this.legalList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getLisLegalEntityByTyping(legalSearchEntity: Observable<LegalSearchEntity>) {
        legalSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.supplierGroupRepository.getListLegalEntity(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.legalList.next(res);
                }
            });
    }


    getListSupplierOfSupplierGroup(supplierSearchEntity: SupplierSearchEntity) {
        this.supplierGroupRepository.getListSupplier(supplierSearchEntity).subscribe(res => {
            if (res) {
                this.supplierList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getListSupplierOfSupplierGroupByTyping(supplierSearchEntity: Observable<SupplierSearchEntity>) {
        supplierSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.supplierGroupRepository.getListSupplier(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.supplierList.next(res);
                }
            });
    }

    getListSupplierDetail(supplierSearchEntity: SupplierSearchEntity) {
        forkJoin(this.supplierGroupRepository.getListSupplierDetail(supplierSearchEntity),
            this.supplierGroupRepository.countSupplierDetail(supplierSearchEntity)).subscribe(([list, count]) => {
                if (list) {
                    this.supplierDetailList.next(list);
                }
                if (count) {
                    this.supplierDetailCount.next(count);
                }
            });
    }

}
