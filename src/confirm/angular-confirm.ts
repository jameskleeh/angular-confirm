import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmService} from "./confirm.service";
import {ConfirmDirective} from "./confirm.directive";

/*
 * angular-confirm
 * https://github.com/Schlogen/angular-confirm
 * @version v2.0.0-beta.1 - 2016-09-20
 * @license Apache
 */
@NgModule({
    declarations: [ConfirmDirective],
    providers: [ConfirmService],
    imports: [NgbModule]
})
export class AngularConfirm {

}