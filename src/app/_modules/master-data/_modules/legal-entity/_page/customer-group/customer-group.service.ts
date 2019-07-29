import { BehaviorSubject, forkJoin } from 'rxjs';
import { CustomerGroupEntity } from 'src/app/_modules/master-data/_backend/customer-group/customer-group.entity';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomerGroupRepository } from './customer-group.repository';
import { ToastrService } from 'ngx-toastr';
import { CustomerGroupForm } from 'src/app/_modules/master-data/_backend/customer-group/customer-group.form';
import { CustomerGroupSearchEntity } from 'src/app/_modules/master-data/_backend/customer-group/customer-group.searchentity';

export class CustomerGroupService {
    public customerGroupList: BehaviorSubject<CustomerGroupEntity[]>;
    public customerGroupForm: BehaviorSubject<FormGroup>;
    public customerGroupCount: BehaviorSubject<number>;


    constructor(
        private fb: FormBuilder,
        private customerGroupRepository: CustomerGroupRepository,
        private toastrService: ToastrService) {
        this.customerGroupCount = new BehaviorSubject(0);
        this.customerGroupList = new BehaviorSubject([]);
        this.customerGroupForm = new BehaviorSubject(this.fb.group(
            new CustomerGroupForm(),
        ));
    }

    getList(customerGroupSearchEntity: CustomerGroupSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            forkJoin(this.customerGroupRepository.getListCustomerGroup(customerGroupSearchEntity),
            this.customerGroupRepository.countCustomerGroup(customerGroupSearchEntity)).subscribe(([list, count]) => {
                if (list) {
                    this.customerGroupList.next(list);
                }
                if (count) {
                    this.customerGroupCount.next(count);
                }
                resolve(true);
            }, err => {
                    reject(false);
            });
        });
        return defered;
    }


}