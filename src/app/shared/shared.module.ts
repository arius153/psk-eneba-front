import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ModalModule
  ],
  exports: [
    CommonModule,
    TranslateModule
  ]
})
export class SharedModule {
}
