import {Injectable, TemplateRef} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ConfirmService {

    constructor(private modalService: NgbModal) {}

    confirm(template: string | TemplateRef<any>, options ?: NgbModalOptions): Promise<any> {
        return this.modalService.open(template, options).result;
    }
}
