import { EmployeePositionEntity } from 'src/app/_modules/master-data/_backend/employee-position/employee-position.entity';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeePositionRepository } from './employee-position.repository';
import { ToastrService } from 'ngx-toastr';
import { EmployeePositionForm } from 'src/app/_modules/master-data/_backend/employee-position/employee-position.form';
import { EmployeePositionSearchEntity } from 'src/app/_modules/master-data/_backend/employee-position/employee-position.searchentity';
import { environment } from 'src/environments/environment';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Entities } from 'src/app/_helpers/entity';

export class EmployeePositionService {
    public employeePositionList: BehaviorSubject<EmployeePositionEntity[]>;
    public employeePositionForm: BehaviorSubject<FormGroup>;
    public employeePositionCount: BehaviorSubject<number>;

    public employeeDetailList: BehaviorSubject<EmployeeEntity[]>;
    public employeeDetailCount: BehaviorSubject<number>;

    public legalListDrop: BehaviorSubject<Entities>;
    public employeeListDrop: BehaviorSubject<Entities>;

    constructor(
        private fb: FormBuilder,
        private employeePositionRepository: EmployeePositionRepository,
        private toastrService: ToastrService) {
        this.employeePositionCount = new BehaviorSubject(0);
        this.employeePositionList = new BehaviorSubject([]);
        this.employeePositionForm = new BehaviorSubject(this.fb.group(
            new EmployeePositionForm(),
        ));

        this.employeeDetailCount = new BehaviorSubject(0);
        this.employeeDetailList = new BehaviorSubject([]);
        this.legalListDrop = new BehaviorSubject(new Entities());
        this.employeeListDrop = new BehaviorSubject(new Entities());
    }
    getList(employeePositionSearchEntity: EmployeePositionSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            forkJoin(this.employeePositionRepository.getListEmployeePosition(employeePositionSearchEntity),
                this.employeePositionRepository.countEmployeePosition(employeePositionSearchEntity)).subscribe(([list, count]) => {
                    if (list) {
                        this.employeePositionList.next(list);
                    }
                    if (count) {
                        this.employeePositionCount.next(count);
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
            const employeeGroup = new EmployeePositionEntity();
            employeeGroup.legalEntityId = legalEntityId;
            const form = this.fb.group(
                new EmployeePositionForm(employeeGroup),
            )
            this.employeePositionForm.next(this.fb.group(
                new EmployeePositionForm(employeeGroup),
            ));
        }
    }

    edit(legalId: string) {
        this.employeePositionRepository.getId(legalId).subscribe(res => {
            if (res) {
                this.employeePositionForm.next(this.fb.group(
                    new EmployeePositionForm(res),
                ));
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    save(employeePositionEntity: any, employeePositionSearchEntity: EmployeePositionSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            if (employeePositionEntity.id === null || employeePositionEntity.id === undefined
                || employeePositionEntity.id === environment.emtyGuid) {
                this.employeePositionRepository.add(employeePositionEntity).subscribe(res => {
                    if (res) {
                        this.getList(employeePositionSearchEntity);
                        this.toastrService.success('Cập nhật thành công !');
                        resolve(false);
                    }
                }, err => {
                    if (err) {
                        this.employeePositionForm.next(this.fb.group(
                            new EmployeePositionForm(err),
                        ));
                        reject(true);
                    }
                });
            } else {
                this.employeePositionRepository.update(employeePositionEntity).subscribe(res => {
                    if (res) {
                        this.getList(employeePositionSearchEntity);
                        this.toastrService.success('Cập nhật thành công !');
                        resolve(false);
                    }
                }, err => {
                    if (err) {
                        this.employeePositionForm.next(this.fb.group(
                            new EmployeePositionForm(err),
                        ));
                        reject(true);
                    }
                });
            }
        });
        return defered;
    }

    getListEmployeeDetail(employeeSearchEntity: EmployeeSearchEntity) {
        forkJoin(this.employeePositionRepository.getListEmployeeDetail(employeeSearchEntity),
            this.employeePositionRepository.countEmployeeDetail(employeeSearchEntity)).subscribe(([list, count]) => {
                if (list) {
                    this.employeeDetailList.next(list);
                }
                if (count) {
                    this.employeeDetailCount.next(count);
                }
            });
    }

    saveEmployee(employeeSearchEntity: EmployeeSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.employeePositionRepository.addEmployee(employeeSearchEntity).subscribe(res => {
                if (res) {
                    this.getListEmployeeDetail(employeeSearchEntity);
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

    getListLegalEntity(legalSearchEntity: LegalSearchEntity) {
        this.employeePositionRepository.getListLegalEntity(legalSearchEntity).subscribe(res => {
            if (res) {
                this.legalListDrop.next(res);
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
                return this.employeePositionRepository.getListLegalEntity(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.legalListDrop.next(res);
                }
            });
    }

    getDropListEmployee(employeeSearchEntity: EmployeeSearchEntity) {
        this.employeePositionRepository.getDropListEmployee(employeeSearchEntity).subscribe(res => {
            if (res) {
                this.employeeListDrop.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getDropListEmployeeByTyping(employeeSearchEntity: Observable<EmployeeSearchEntity>) {
        employeeSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.employeePositionRepository.getDropListEmployee(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.employeeListDrop.next(res);
                }
            });
    }
}