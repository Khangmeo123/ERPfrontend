import { FormModel } from 'src/app/_helpers/form-model';
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { requiredField } from 'src/app/_helpers';

export class InventoryCountingForm extends FormModel {
    documentNumber = new FormControl(null);
    documentDate = new FormControl(null);
    inventoryOrganizationId = new FormControl(null, [requiredField]);
    inventoryOrganizationCode = new FormControl(null);
    inventoryOrganizationName = new FormControl(null);
    ownerId = new FormControl(null);
    ownerCode = new FormControl(null);
    ownerName = new FormControl(null);
    statusId = new FormControl(null);
    statusName = new FormControl(null);
    postingDate = new FormControl(null);
    remarks = new FormControl(null);
    inventoryCounters = new FormArray([]);
    inventoryCountingContents = new FormArray([]);

    errors = new FormGroup({
        documentDate: new FormControl(),
        ownerId: new FormControl(),
    });

    constructor(inventoryCountingEntity?: any) {
        super();
        this.mapData(inventoryCountingEntity);
    }

}
