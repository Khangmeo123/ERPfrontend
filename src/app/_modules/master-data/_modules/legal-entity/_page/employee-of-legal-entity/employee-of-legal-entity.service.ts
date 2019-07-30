import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import { Entities } from 'src/app/_helpers/entity';
import { FormBuilder } from '@angular/forms';
import { EmployeeOfLegalEntityRepository } from './employee-of-legal-entity.repository';
import { ToastrService } from 'ngx-toastr';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class EmployeeOfLegalEntityService {
    public legalEntityList: BehaviorSubject<LegalEntity[]>;
    public legalEntityCount: BehaviorSubject<number>;

    public employeeList: BehaviorSubject<EmployeeEntity[]>;
    public employeeCount: BehaviorSubject<number>;
    public employeeListOflegalEntity: BehaviorSubject<Entities>;

    constructor(
        private fb: FormBuilder,
        private employeeOflegalEntityRepository: EmployeeOfLegalEntityRepository,
        private toastrService: ToastrService) {
        this.legalEntityCount = new BehaviorSubject(0);
        this.legalEntityList = new BehaviorSubject([]);

        this.employeeList = new BehaviorSubject([]);
        this.employeeCount = new BehaviorSubject(0);
        this.employeeListOflegalEntity = new BehaviorSubject(new Entities());

    }

    getListLegal(legalSearchEntity: LegalSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            forkJoin(this.employeeOflegalEntityRepository.getListLegal(legalSearchEntity),
                this.employeeOflegalEntityRepository.countlegal(legalSearchEntity)).subscribe(([list, count]) => {
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

    getListEmployeeDetail(employeeSearchEntity: EmployeeSearchEntity) {
        forkJoin(this.employeeOflegalEntityRepository.getListEmployee(employeeSearchEntity),
            this.employeeOflegalEntityRepository.countEmployee(employeeSearchEntity)).subscribe(([list, count]) => {
                if (list) {
                    this.employeeList.next(list);
                }
                if (count) {
                    this.employeeCount.next(count);
                }
            });
    }

    getListDropEmployee(employeeSearchEntity: EmployeeSearchEntity) {
        this.employeeOflegalEntityRepository.getListEmployeeDrop(employeeSearchEntity).subscribe(res => {
            if (res) {
                this.employeeListOflegalEntity.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    getListDropEmployeeByTyping(employeeSearchEntity: Observable<EmployeeSearchEntity>) {
        employeeSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.employeeOflegalEntityRepository.getListEmployeeDrop(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.employeeListOflegalEntity.next(res);
                }
            });
    }

    saveEmployee(employeeSearchEntity: EmployeeSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            if (employeeSearchEntity.id === null || employeeSearchEntity.id === undefined 
                || employeeSearchEntity.id === environment.emtyGuid) {
                this.employeeOflegalEntityRepository.addEmployee(employeeSearchEntity).subscribe(res => {
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
            }
        });
        return defered;
    }

}