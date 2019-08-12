import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {FormModel} from 'src/app/_helpers/form-model';
import {requiredField} from 'src/app/_helpers';
import {CustomerDetailOfLegalEntity} from './legal-customer-detail.entity';

export class CustomerDetailOfLegalForm extends FormModel {
  code = new FormControl({value: null, disabled: true}, [requiredField]);
  name = new FormControl({value: null, disabled: true}, [requiredField]);
  taxCode = new FormControl({value: null, disabled: true});
  note = new FormControl({value: null, disabled: true});
  status = new FormControl({value: null, disabled: true}, [requiredField]);
  dueInDays = new FormControl();
  debtLoad = new FormControl();
  paymentTermId = new FormControl(null);
  paymentTermName = new FormControl(null);
  staffInChargeId = new FormControl(null);
  staffInChargeName = new FormControl(null);
  businessGroupId = new FormControl(null);

  customerContacts = new FormArray([]);
  customerBankAccounts = new FormArray([]);
  customerGroups = new FormArray([]);

  errors = new FormGroup({
    name: new FormControl(null),
    code: new FormControl(null),
    status: new FormControl(null),
  });


  constructor(customerDetailEntity?: CustomerDetailOfLegalEntity) {
    super();
    if (customerDetailEntity !== null && customerDetailEntity !== undefined) {
      Object.keys(customerDetailEntity).forEach((item) => {
        if (customerDetailEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          if (customerDetailEntity[item] && typeof customerDetailEntity[item] === 'object'
            && customerDetailEntity[item].constructor === Array) {
            customerDetailEntity[item].forEach(r => {
              const formGroup = new FormGroup({});
              Object.keys(r).forEach((result) => {
                formGroup.addControl(result, new FormControl(r[result]));
              });
              this[item].push(formGroup);
            });
          } else {
            this[item].setValue(customerDetailEntity[item]);
          }
        }
      });
    }
  }
}
