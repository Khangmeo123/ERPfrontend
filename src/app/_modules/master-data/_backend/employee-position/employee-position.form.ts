import { FormControl, FormGroup,  } from '@angular/forms';
import { requiredField } from 'src/app/_helpers';
import { FormModel } from 'src/app/_helpers/form-model';
import { EmployeePositionEntity } from './employee-position.entity';


export class EmployeePositionForm extends FormModel {

    name = new FormControl('', [requiredField]);
    code = new FormControl('', [requiredField]);
    legalEntityId = new FormControl('', [requiredField]);

    errors = new FormGroup({
        name: new FormControl(''),
        code: new FormControl(''),
        legalEntityId: new FormControl('')
    });


    constructor(employeePositionEntity?: EmployeePositionEntity) {
        super();
        if (employeePositionEntity !== null && employeePositionEntity !== undefined) {
            Object.keys(employeePositionEntity).forEach((item) => {
                if (employeePositionEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].patchValue(employeePositionEntity[item]);
                }
            });
        }
    }
}
