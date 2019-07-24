import { LegalSupplierDetailEntity } from 'src/app/_modules/master-data/_backend/legal-supplier-detail/legal-supplier-detail.entity';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Entities } from 'src/app/_helpers/entity';

export class SupplierDetailService {
    public supplierGeneral: BehaviorSubject<LegalSupplierDetailEntity>;
    public supplierForm: BehaviorSubject<FormGroup>;

    public paymenttermList: BehaviorSubject<Entities>;
    public staffInChangreList: BehaviorSubject<Entities>;
    public supplierGroupList: BehaviorSubject<Entities>;

    
}
