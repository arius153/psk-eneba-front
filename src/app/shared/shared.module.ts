import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FormGroupComponent} from './components/from-group/form-group.component';

@NgModule({
  declarations: [
    FormGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ModalModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    FormGroupComponent
  ]
})
export class SharedModule {
}
