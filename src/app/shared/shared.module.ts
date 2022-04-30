import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FormGroupComponent} from './components/from-group/form-group.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ImageUploaderComponent} from './components/image-uploader/image-uploader.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    FormGroupComponent,
    ImageUploaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ModalModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    FormGroupComponent,
    MatDialogModule,
    ImageUploaderComponent,
    MatIconModule
  ]
})
export class SharedModule {
}
