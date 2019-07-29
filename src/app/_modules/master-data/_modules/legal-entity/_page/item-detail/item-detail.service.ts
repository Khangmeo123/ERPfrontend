import { BehaviorSubject } from 'rxjs';
import { LegalItemDetailForm } from './../../../../_backend/legal-item-detail/legal-item-detail.form';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LegalItemDetailRepository } from './item-detail.repository';

export class LegalItemDetailService {
    public legalItemDetailForm: BehaviorSubject<FormGroup>;
    constructor(
        private fb: FormBuilder,
        private legalItemDetailRepository: LegalItemDetailRepository,
        private toastrService: ToastrService) {
        this.legalItemDetailForm = new BehaviorSubject(this.fb.group(new LegalItemDetailForm()));
    }

    getLegalItemDetail(itemDetailId?: string) {
        if (itemDetailId === null || itemDetailId === undefined) {
            this.legalItemDetailForm.next(this.fb.group(
                new LegalItemDetailForm(),
            ));
        } else {
            this.legalItemDetailRepository.getLegalItemDetail(itemDetailId).subscribe(res => {
                if (res) {
                    this.legalItemDetailForm.next(this.fb.group(
                        new LegalItemDetailForm(res),
                    ));
                }
            }, err => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }
}
