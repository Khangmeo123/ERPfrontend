import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LegalEntityRepository } from './legal-entity.repository';
import { ToastrService } from 'ngx-toastr';
import { LegalForm } from 'src/app/_modules/master-data/_backend/legal/legal.form';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Entities } from 'src/app/_helpers/entity';
import { SobSearchEntity } from 'src/app/_modules/master-data/_backend/sob/sob.searchentity';



export class LegalEntityService {
    public legalList: BehaviorSubject<LegalEntity[]>;
    public legalForm: BehaviorSubject<FormGroup>;
    public legalpCount: BehaviorSubject<number>;

    public sobList: BehaviorSubject<Entities>;

    constructor(private fb: FormBuilder, private legalRepository: LegalEntityRepository, private toastrService: ToastrService) {
        this.legalpCount = new BehaviorSubject(0);
        this.legalList = new BehaviorSubject([]);
        this.legalForm = new BehaviorSubject(this.fb.group(
            new LegalForm(),
        ));
        this.sobList = new BehaviorSubject(new Entities());
    }

    getList(legalSearchEntity: LegalSearchEntity) {
        forkJoin(this.legalRepository.getList(legalSearchEntity),
            this.legalRepository.count(legalSearchEntity)).subscribe(([list, count]) => {
                if (list) {
                    this.legalList.next(list);
                }
                if (count) {
                    this.legalpCount.next(count);
                }
            });
    }

    add(sobId: any) {
        if(sobId) {
            const legal = new LegalEntity();
            legal.setOfBookId = sobId;
            const form = this.fb.group(
                new LegalForm(legal),
            )
            this.legalForm.next(this.fb.group(
                new LegalForm(legal),
            ));
        }
    }

    edit(legalId: string) {
        this.legalRepository.getId(legalId).subscribe(res => {
            if (res) {
                console.log('res: ', res)
                this.legalForm.next(this.fb.group(
                    new LegalForm(res),
                ));
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    save(legalEntity: any, legalSearchEntity: LegalSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            if (legalEntity.id === null || legalEntity.id === undefined) {
                this.legalRepository.add(legalEntity).subscribe(res => {
                    if (res) {
                        this.getList(legalSearchEntity);
                        this.toastrService.success('Cập nhật thành công !');
                        resolve(false);
                    }
                }, err => {
                    if (err) {
                        const testItem = this.fb.group(
                            new LegalForm(err),
                        );
                        this.legalForm.next(this.fb.group(
                            new LegalForm(err),
                        ));
                        reject(true);
                    }
                });
            } else {
                this.legalRepository.update(legalEntity).subscribe(res => {
                    if (res) {
                        this.getList(legalSearchEntity);
                        this.toastrService.success('Cập nhật thành công !');
                        resolve(false);
                    }
                }, err => {
                    if (err) {
                        this.legalForm.next(this.fb.group(
                            new LegalForm(err),
                        ));
                        reject(true);
                    }
                });
            }
        });
        return defered;
    }

    delete(legalEntity: any, legalSearchEntity: LegalSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.legalRepository.delete(legalEntity).subscribe(res => {
                if (res) {
                    this.getList(legalSearchEntity);
                    this.toastrService.success('Cập nhật thành công !');
                    resolve(false);
                }
            }, err => {
                if (err) {
                    this.legalForm.next(this.fb.group(
                        new LegalForm(err),
                    ));
                    reject(true);
                }
            });
        });
        return defered;
    }

    getListSobOfLegal(sobSearchEntity: SobSearchEntity) {
        this.legalRepository.getListSobOfLegal(sobSearchEntity).subscribe(res => {
          if (res) {
            this.sobList.next(res);
          }
        }, err => {
          if (err) {
            console.log(err);
          }
        });
      }
    getListSobOfLegalByTyping(sobSearchEntity: Observable<SobSearchEntity>) {
        sobSearchEntity.pipe(debounceTime(400),
        distinctUntilChanged(),
        switchMap(searchEntity => {
        return this.legalRepository.getListSobOfLegal(searchEntity)
        })).subscribe(res => {
        if (res) {
            this.sobList.next(res);
        }
        });
    }
}
