import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NoDataImgComponent } from './no-data-img/no-data-img.component';
import { ModalComponent } from './modal/modal.component';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [NoDataImgComponent, ModalComponent, ErrorComponent],
  imports: [
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
