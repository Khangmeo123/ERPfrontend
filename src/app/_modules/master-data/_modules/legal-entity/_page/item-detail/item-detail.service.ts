import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LegalItemDetailRepository } from './item-detail.repository';

export class LegalItemDetailService {
    constructor(
        private fb: FormBuilder,
        private legalItemDetailRepository: LegalItemDetailRepository,
        private toastrService: ToastrService) {
    }

}
