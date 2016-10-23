angular-confirm
===============
[![Build Status](https://travis-ci.org/jameskleeh/angular-confirm.svg?branch=master)](https://travis-ci.org/jameskleeh/angular-confirm)

Confirm modal dialog for Angular 2!

The AngularJS version is maintained in the [1.2.x branch](https://github.com/jameskleeh/angular-confirm/tree/1.2.x)

See [demo](http://jameskleeh.github.io/angular-confirm/angular2)

## Install
This module requires the Ng-Bootstrap [NgbModal](https://ng-bootstrap.github.io/#/components/modal). The default template uses styles from [Bootstrap](http://v4-alpha.getbootstrap.com/) 4.x.

To install with [npm](https://www.npmjs.com/package/angular-confirm):
```
npm install --save angular-confirm
```

Then simply add a dependency to the `angular-confirm` module:

```javascript
import {ConfirmModule} from 'angular-confirm';

@NgModule({
  ...
  imports: [ConfirmModule, ...],
  ...
})
export class AppModule {
}
```
