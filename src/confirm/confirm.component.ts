import {ElementRef, Component, TemplateRef, ViewChild} from '@angular/core';
import {ConfirmService} from './confirm.service';
import {Input} from '@angular/core/src/metadata/directives';

@Component({
    selector: '[confirm]',
    template: `
        <template #template>
            <div class='modal-header'>
                <button type='button' class='close' aria-label='Close' (click)='d()'>
                    <span aria-hidden='true'>&times;</span>
                </button>
                <h4 class='modal-title'>{{title}}</h4>
            </div>
            <div class='modal-body'>
                <p>{{text}}</p>
            </div>
            <div class='modal-footer'>
                <button type='button' class='btn btn-secondary' (click)='c()'>{{ok}}</button>
                <button type='button' class='btn btn-secondary' (click)='d()'>{{cancel}}</button>
            </div>
        </template>
        <ng-content></ng-content>        
    `,
})
export class ConfirmComponent {

    @Input() confirmOk: string = 'Ok';
    @Input() confirmCancel: string = 'Cancel';
    @Input() confirmTitle: string = 'Confirm';
    @Input() confirm: string;
    @Input() confirmIf: boolean = true;
    @Input() confirmSettings: Object = {};
    @Input() confirmTemplate: string | TemplateRef<any> = null;

    @ViewChild(TemplateRef) template: TemplateRef<any>;

    constructor(private el: ElementRef, private confirmService: ConfirmService) {
        let element: HTMLElement = el.nativeElement;
        let oldAddEventListener: Function = element.addEventListener;
        let events: Object[] = [];

        function success(clickEvent) {
            events.forEach((evt: any) => {
                evt.listener(clickEvent);
            });
        }

        element.addEventListener('click', (event) => {
            if (this.confirmIf) {
                confirmService.confirm(this.confirmTemplate || this.template, this.confirmSettings).then(() => {
                    success(event);
                });
            } else {
                success(event);
            }
        });

        element.addEventListener = function(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean) {
            if (type === 'click') {
                events.push({type: type, listener: listener, useCapture: useCapture});
            } else {
                oldAddEventListener(type, listener, useCapture);
            }
        };
    }
}
